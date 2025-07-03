import { type NextRequest, NextResponse } from "next/server"

// Airtable configuration with environment variable validation
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Leads"

// Validation
if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
  console.error("Missing required Airtable environment variables")
}

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Data validation schemas
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
const urlRegex = /^https?:\/\/.+/

interface ValidationError {
  field: string
  message: string
}

interface ROICalculation {
  monthlyVACost: number
  aiCost: number
  monthlySavings: number
  annualSavings: number
  roiPercentage: number
  numVAs: number
}

interface LeadData {
  // Contact Information
  fullName: string
  jobTitle: string
  email: string
  phone: string
  companyName: string
  website?: string

  // Business Profile
  industry: string
  annualRevenue: string
  numberOfEmployees: string
  country: string

  // Current Setup
  numberOfCurrentVAs: string
  monthlyCostOfCurrentStaff: string
  monthlyCallVolume: string
  currentCallAnswerRate: string
  revenueLostFromMissedCalls: string

  // Pain Points
  currentChallenge: string
  whatsDriveringThisNeed: string
  ifYouDontSolveThis: string
  currentPriorityLevel: string

  // AI Services Interest
  aiServicesInterest: string[]
  primaryUseCase: string
  pricingTierInterest: string
  multiLanguageInterest: string
  languagesNeeded: string[]

  // Budget & Timeline
  currentBudget: string
  budgetFlexibility: string
  timeline: string
  decisionRole: string

  // Technical Setup
  currentCRMDatabase: string
  integrationRequirements: string
  technologyImplementationHandler: string

  // Decision Process
  stakeholdersInvolved: string[]
  budgetAuthority: string
  implementationApprover: string
  decisionTimeline: string
  approvalProcess: string

  // Competitive Landscape
  solutionsEvaluated: string[]
  currentProvider: string
  previousAIExperience: string
  competitorConcerns: string
  differentiators: string[]

  // Next Steps
  preferredDemo: string
  demoTimeline: string
  referenceInterest: string
  followUpPreference: string
  additionalQuestions: string
  readyToStart: string

  // System fields
  leadSourcePage?: string
  submittedAt?: string
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  let leadData: LeadData | null = null
  const clientIP = request.headers.get("x-forwarded-for") || "unknown"

  try {
    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Please try again later." },
        { status: 429 },
      )
    }

    // Parse and validate request data
    leadData = await request.json()

    // Comprehensive data validation
    const validationErrors = validateLeadData(leadData)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          validationErrors,
        },
        { status: 400 },
      )
    }

    // Check for duplicate by email
    const isDuplicate = await checkDuplicateEmail(leadData.email)
    if (isDuplicate) {
      console.log(`Duplicate submission detected for email: ${leadData.email}`)
      // Still process but flag as duplicate
    }

    // Calculate lead score and ROI
    const leadScore = calculateAdvancedLeadScore(leadData)
    const roiCalculation = calculateROI(leadData)

    // Prepare Airtable data with proper field mapping
    const airtableData = mapToAirtableFields(leadData, leadScore, roiCalculation, isDuplicate)

    // Submit to Airtable with retry logic
    const result = await submitToAirtableWithRetry(airtableData, 3)

    // Trigger automation based on lead score
    await triggerAutomations(leadData, leadScore, result.id)

    // Log successful submission
    console.log(`Lead successfully submitted: ${result.id} - Score: ${leadScore} - Time: ${Date.now() - startTime}ms`)

    return NextResponse.json({
      success: true,
      leadScore,
      recordId: result.id,
      roiCalculation,
      qualificationLevel: getQualificationLevel(leadScore),
      message: "Assessment submitted successfully",
      processingTime: Date.now() - startTime,
    })
  } catch (error) {
    console.error("Error submitting assessment:", error)

    // Log error details for monitoring
    await logError(error, leadData, clientIP)

    const errorMessage = error instanceof Error ? error.message : "Failed to submit assessment"

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
        processingTime: Date.now() - startTime,
      },
      { status: 500 },
    )
  }
}

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 10 // Max 10 requests per 15 minutes

  const clientData = rateLimitStore.get(clientIP)

  if (!clientData || now > clientData.resetTime) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (clientData.count >= maxRequests) {
    return false
  }

  clientData.count++
  return true
}

function validateLeadData(data: LeadData): ValidationError[] {
  const errors: ValidationError[] = []

  // Required field validation
  if (!data.fullName?.trim()) {
    errors.push({ field: "fullName", message: "Full name is required" })
  }

  if (!data.email?.trim()) {
    errors.push({ field: "email", message: "Email is required" })
  } else if (!emailRegex.test(data.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" })
  }

  if (!data.phone?.trim()) {
    errors.push({ field: "phone", message: "Phone number is required" })
  } else if (!phoneRegex.test(data.phone.replace(/[\s\-$$$$]/g, ""))) {
    errors.push({ field: "phone", message: "Please enter a valid phone number" })
  }

  if (!data.companyName?.trim()) {
    errors.push({ field: "companyName", message: "Company name is required" })
  }

  if (!data.industry) {
    errors.push({ field: "industry", message: "Industry is required" })
  }

  if (!data.decisionRole) {
    errors.push({ field: "decisionRole", message: "Decision role is required" })
  }

  if (!data.timeline) {
    errors.push({ field: "timeline", message: "Timeline is required" })
  }

  // URL validation
  if (data.website && !urlRegex.test(data.website)) {
    errors.push({ field: "website", message: "Please enter a valid website URL" })
  }

  // Array field validation
  if (!Array.isArray(data.aiServicesInterest)) {
    errors.push({ field: "aiServicesInterest", message: "AI services interest must be an array" })
  }

  return errors
}

async function checkDuplicateEmail(email: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula={Email}='${email}'`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      },
    )

    if (response.ok) {
      const data = await response.json()
      return data.records && data.records.length > 0
    }
  } catch (error) {
    console.error("Error checking duplicate email:", error)
  }

  return false
}

function calculateAdvancedLeadScore(data: LeadData): number {
  let score = 0

  // Authority Score (30 points)
  switch (data.decisionRole) {
    case "Final decision maker":
      score += 30
      break
    case "Strong influencer":
      score += 25
      break
    case "Some input":
      score += 15
      break
    case "IT/Technical role":
      score += 12
      break
    case "Just researching":
      score += 8
      break
    default:
      score += 5
  }

  // Company Size Score (20 points)
  const numVAs = Number.parseInt(data.numberOfCurrentVAs) || 0
  if (numVAs >= 6) score += 20
  else if (numVAs >= 4) score += 18
  else if (numVAs >= 3) score += 15
  else if (numVAs >= 2) score += 12
  else if (numVAs >= 1) score += 8
  else score += 3

  // Pain Level Score (25 points)
  switch (data.currentCallAnswerRate) {
    case "Under 30%":
      score += 25
      break
    case "30-50%":
      score += 20
      break
    case "50-70%":
      score += 15
      break
    case "70-90%":
      score += 8
      break
    case "90%+":
      score += 3
      break
  }

  // Urgency Score (15 points)
  switch (data.timeline) {
    case "ASAP - within 30 days":
      score += 15
      break
    case "1-3 months":
      score += 12
      break
    case "3-6 months":
      score += 8
      break
    case "6-12 months":
      score += 4
      break
    default:
      score += 2
  }

  // Budget Score (10 points)
  switch (data.currentBudget) {
    case "$5,000+/month":
      score += 10
      break
    case "$2,000-5,000/month":
      score += 8
      break
    case "$1,000-2,000/month":
      score += 6
      break
    case "$500-1,000/month":
      score += 4
      break
    default:
      score += 2
  }

  // Bonus Points
  // High revenue company
  if (data.annualRevenue === "Over $2M" || data.annualRevenue === "$1M-2M") {
    score += 5
  }

  // Large company
  if (data.numberOfEmployees === "100+" || data.numberOfEmployees === "51-100") {
    score += 3
  }

  // High call volume
  if (data.monthlyCallVolume === "1000+" || data.monthlyCallVolume === "500-1000") {
    score += 3
  }

  // Critical priority
  if (data.currentPriorityLevel === "Top 3 business priority") {
    score += 5
  }

  // Multiple AI services interest
  if (data.aiServicesInterest && data.aiServicesInterest.length >= 3) {
    score += 3
  }

  return Math.min(100, Math.max(0, score))
}

function calculateROI(data: LeadData): ROICalculation {
  const numVAs = Number.parseInt(data.numberOfCurrentVAs) || 0
  const monthlyVACost = numVAs * 1800 // $1,800 per VA
  const aiCost = 597 // $597 for AI solution
  const monthlySavings = Math.max(0, monthlyVACost - aiCost)
  const annualSavings = monthlySavings * 12
  const roiPercentage = aiCost > 0 ? Math.round((monthlySavings / aiCost) * 100) : 0

  return {
    monthlyVACost,
    aiCost,
    monthlySavings,
    annualSavings,
    roiPercentage,
    numVAs,
  }
}

function getQualificationLevel(score: number): string {
  if (score >= 80) return "Hot"
  if (score >= 60) return "Warm"
  return "Cold"
}

function getFollowUpPriority(score: number, timeline: string): string {
  if (score >= 80) return "Immediate"
  if (score >= 60 && timeline === "ASAP - within 30 days") return "High"
  if (score >= 60) return "Medium"
  return "Low"
}

function getNextAction(data: LeadData, score: number): string {
  if (score >= 80) return "Schedule Demo Call"
  if (score >= 60) return "Send Proposal"
  if (data.preferredDemo && data.preferredDemo !== "Not ready for demo") return "Follow Up Demo"
  return "Nurture Email Sequence"
}

function mapToAirtableFields(data: LeadData, leadScore: number, roi: ROICalculation, isDuplicate: boolean) {
  const now = new Date().toISOString()

  return {
    fields: {
      // Contact Information
      Name: data.fullName || "",
      JobTitle: data.jobTitle || "",
      Email: data.email || "",
      "Phone Number": data.phone || "",
      Company: data.companyName || "",
      Website: data.website || "",

      // Business Profile
      Industry: data.industry || "",
      "Annual Revenue": data.annualRevenue || "",
      Employees: data.numberOfEmployees || "",
      Country: data.country || "",

      // Current Setup
      "Number of Current VAs": data.numberOfCurrentVAs || "",
      "Current Cost of Staff/Answering Service": data.monthlyCostOfCurrentStaff || "",
      "Monthly Call Volume": data.monthlyCallVolume || "",
      "Current Call Answer Rate": data.currentCallAnswerRate || "",
      "Revenue Lost from Missed Calls": data.revenueLostFromMissedCalls || "",

      // Pain Points
      "Current Challenge": data.currentChallenge || "",
      "What's Driving This Need Right Now": data.whatsDriveringThisNeed || "",
      "If You Don't Solve This in Next 3 Months": data.ifYouDontSolveThis || "",
      "Current Priority Level": data.currentPriorityLevel || "",

      // AI Services Interest
      "Services Interested": Array.isArray(data.aiServicesInterest) ? data.aiServicesInterest.join(", ") : "",
      "Primary Use Case": data.primaryUseCase || "",
      Pricing_Tier_Interest: data.pricingTierInterest || "",
      "Multi-language Support Interest": data.multiLanguageInterest || "",
      "If yes, please specify language(s)": Array.isArray(data.languagesNeeded) ? data.languagesNeeded.join(", ") : "",

      // Budget & Timeline
      "Current Budget": data.currentBudget || "",
      "Budget Flexibility": data.budgetFlexibility || "",
      Timeline: data.timeline || "",
      Decision_Role: data.decisionRole || "",

      // Technical Setup
      "Current CRM/Database": data.currentCRMDatabase || "",
      "Integration Requirements": data.integrationRequirements || "",
      "Technology Implementation Handler": data.technologyImplementationHandler || "",

      // Decision Process
      Stakeholders: Array.isArray(data.stakeholdersInvolved) ? data.stakeholdersInvolved.join(", ") : "",
      "Budget Authority": data.budgetAuthority || "",
      "Implementation Approver": data.implementationApprover || "",
      "Decision Timeline": data.decisionTimeline || "",
      "Approval Process": data.approvalProcess || "",

      // Competitive Landscape
      "Other AI Solutions You've Evaluated": Array.isArray(data.solutionsEvaluated)
        ? data.solutionsEvaluated.join(", ")
        : "",
      "Current Provider": data.currentProvider || "",
      "AI Experience": data.previousAIExperience || "",
      Concerns: data.competitorConcerns || "",
      Differentiators: Array.isArray(data.differentiators) ? data.differentiators.join(", ") : "",

      // Next Steps
      "Preferred Next Step": data.preferredDemo || "",
      "Demo Scheduling Urgency": data.demoTimeline || "",
      "Interest in Client Reference": data.referenceInterest || "",
      "Follow Up": data.followUpPreference || "",
      "Additional Information": data.additionalQuestions || "",
      "Ready To Start": data.readyToStart || "",

      // Calculated Fields
      "Lead Score": leadScore,
      Monthly_Savings: roi.monthlySavings,
      Annual_Savings: roi.annualSavings,
      ROI_Percentage: roi.roiPercentage / 100, // Convert to decimal for percentage field
      Qualification_Level: getQualificationLevel(leadScore),
      Follow_up_Priority: getFollowUpPriority(leadScore, data.timeline),
      Next_Action: getNextAction(data, leadScore),

      // System Fields
      Status: isDuplicate ? "Duplicate" : "New Lead",
      Lead_Status: leadScore >= 60 ? "Qualified" : "Unqualified",
      "Lead Source Page": data.leadSourcePage || "Assessment Form",
      "Created At": now,
      "Follow-up Date": new Date(
        Date.now() + (leadScore >= 80 ? 2 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000),
      ).toISOString(),

      // Additional tracking
      Submission_IP: "masked", // For privacy
      Form_Version: "2.0",
      Processing_Time: Date.now(),
      Duplicate_Flag: isDuplicate ? "Yes" : "No",

      // Notes field for additional context
      Notes: `Lead Score: ${leadScore}/100 | Qualification: ${getQualificationLevel(leadScore)} | ROI: ${roi.roiPercentage}% | Submitted: ${now}`,
    },
  }
}

async function submitToAirtableWithRetry(data: any, maxRetries: number): Promise<any> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const responseText = await response.text()

      if (!response.ok) {
        const error = new Error(`Airtable API Error: ${response.status} ${response.statusText} - ${responseText}`)

        // Log detailed error information
        console.error(`Attempt ${attempt} failed:`, {
          status: response.status,
          statusText: response.statusText,
          response: responseText,
          fieldCount: Object.keys(data.fields).length,
        })

        // Don't retry on client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          throw error
        }

        lastError = error

        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
        continue
      }

      return JSON.parse(responseText)
    } catch (error) {
      console.error(`Attempt ${attempt} error:`, error)
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }
  }

  throw lastError || new Error("Failed to submit to Airtable after retries")
}

async function triggerAutomations(data: LeadData, leadScore: number, recordId: string) {
  try {
    // High-value lead alerts (score 80+)
    if (leadScore >= 80) {
      await sendSlackAlert(data, leadScore, recordId)
      await sendHighPriorityEmail(data, leadScore, recordId)
    }
    // Qualified leads (score 60-79)
    else if (leadScore >= 60) {
      await sendQualifiedLeadEmail(data, leadScore, recordId)
    }
    // All new submissions
    await addToFollowUpSequence(data, leadScore, recordId)
  } catch (error) {
    console.error("Error triggering automations:", error)
    // Don't fail the main request if automations fail
  }
}

async function sendSlackAlert(data: LeadData, leadScore: number, recordId: string) {
  const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

  if (!SLACK_WEBHOOK_URL) {
    console.log("Slack webhook URL not configured, skipping alert")
    return
  }

  try {
    const slackPayload = {
      text: "🚨 HIGH PRIORITY LEAD ALERT",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*🚨 HIGH PRIORITY LEAD*\n*Company:* ${data.companyName}\n*Contact:* ${data.fullName}\n*Email:* ${data.email}\n*Phone:* ${data.phone}`,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Lead Score:*\n${leadScore}/100`,
            },
            {
              type: "mrkdwn",
              text: `*Timeline:*\n${data.timeline}`,
            },
            {
              type: "mrkdwn",
              text: `*Industry:*\n${data.industry}`,
            },
            {
              type: "mrkdwn",
              text: `*Decision Role:*\n${data.decisionRole}`,
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Pain Points:*\n• ${data.currentChallenge}\n• ${data.whatsDriveringThisNeed}\n• Priority: ${data.currentPriorityLevel}`,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "View in Airtable",
              },
              url: `https://airtable.com/app${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`,
              style: "primary",
            },
          ],
        },
      ],
    }

    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackPayload),
    })

    if (!response.ok) {
      throw new Error(`Slack webhook failed: ${response.status}`)
    }

    console.log(`✅ Slack alert sent for high priority lead: ${data.companyName}`)
  } catch (error) {
    console.error("Failed to send Slack alert:", error)
  }
}

async function sendHighPriorityEmail(data: LeadData, leadScore: number, recordId: string) {
  console.log(`📧 Sending high priority email for: ${data.email} - Score: ${leadScore}`)
  // Implement email service integration (SendGrid, AWS SES, etc.)
}

async function sendQualifiedLeadEmail(data: LeadData, leadScore: number, recordId: string) {
  console.log(`📧 Sending qualified lead email for: ${data.email} - Score: ${leadScore}`)
  // Implement email service integration
}

async function addToFollowUpSequence(data: LeadData, leadScore: number, recordId: string) {
  console.log(`📋 Adding to follow-up sequence: ${data.email} - Score: ${leadScore}`)
  // Implement follow-up automation
}

async function logError(error: any, leadData: LeadData | null, clientIP: string) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    leadData: leadData
      ? {
          email: leadData.email,
          company: leadData.companyName,
          source: leadData.leadSourcePage,
        }
      : null,
    clientIP: clientIP,
    userAgent: "masked", // For privacy
  }

  console.error("Assessment submission error:", errorLog)

  // In production, send to monitoring service (Sentry, LogRocket, etc.)
  // await sendToMonitoringService(errorLog)
}
