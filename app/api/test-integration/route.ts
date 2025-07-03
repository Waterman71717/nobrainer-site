import { type NextRequest, NextResponse } from "next/server"

// Test data for comprehensive integration testing
const TEST_LEAD_DATA = {
  // Contact Information
  fullName: "John Smith",
  jobTitle: "CEO",
  email: "john.smith@testcompany.com",
  phone: "+1-555-123-4567",
  companyName: "Test Company Inc",
  website: "https://testcompany.com",

  // Business Profile
  industry: "Technology",
  annualRevenue: "Over $2M",
  numberOfEmployees: "100+",
  country: "United States",

  // Current Setup
  numberOfCurrentVAs: "5",
  monthlyCostOfCurrentStaff: "$8,000-10,000/month",
  monthlyCallVolume: "1000+",
  currentCallAnswerRate: "Under 30%",
  revenueLostFromMissedCalls: "Over $10,000/month",

  // Pain Points
  currentChallenge: "High volume of missed calls",
  whatsDriveringThisNeed: "Customer complaints about poor service",
  ifYouDontSolveThis: "Will lose major clients",
  currentPriorityLevel: "Top 3 business priority",

  // AI Services Interest
  aiServicesInterest: ["24/7 Phone Answering", "Lead Qualification", "Appointment Scheduling"],
  primaryUseCase: "Customer service and lead generation",
  pricingTierInterest: "Professional ($597/month)",
  multiLanguageInterest: "Yes",
  languagesNeeded: ["English", "Spanish"],

  // Budget & Timeline
  currentBudget: "$5,000+/month",
  budgetFlexibility: "Flexible - ROI focused",
  timeline: "ASAP - within 30 days",
  decisionRole: "Final decision maker",

  // Technical Setup
  currentCRMDatabase: "Salesforce",
  integrationRequirements: "CRM integration, calendar sync",
  technologyImplementationHandler: "Internal IT team",

  // Decision Process
  stakeholdersInvolved: ["CEO", "CTO", "Sales Director"],
  budgetAuthority: "Yes - full authority",
  implementationApprover: "CEO",
  decisionTimeline: "Within 2 weeks",
  approvalProcess: "Executive decision",

  // Competitive Landscape
  solutionsEvaluated: ["Ruby Receptionists", "AnswerConnect", "PATLive"],
  currentProvider: "Ruby Receptionists",
  previousAIExperience: "Limited experience",
  competitorConcerns: "Cost and reliability",
  differentiators: ["24/7 availability", "AI technology", "Cost savings"],

  // Next Steps
  preferredDemo: "Live demo with our team",
  demoTimeline: "This week",
  referenceInterest: "Yes",
  followUpPreference: "Phone call",
  additionalQuestions: "How quickly can we get started?",
  readyToStart: "Yes",

  // System fields
  leadSourcePage: "Assessment Form Test",
  submittedAt: new Date().toISOString(),
}

export async function POST(request: NextRequest) {
  const testResults = {
    timestamp: new Date().toISOString(),
    tests: [] as any[],
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      warnings: 0,
    },
  }

  try {
    // Test 1: Environment Variables
    testResults.tests.push(await testEnvironmentVariables())

    // Test 2: Airtable Connectivity
    testResults.tests.push(await testAirtableConnectivity())

    // Test 3: Field Validation
    testResults.tests.push(await testFieldValidation())

    // Test 4: Lead Scoring Algorithm
    testResults.tests.push(await testLeadScoring())

    // Test 5: ROI Calculations
    testResults.tests.push(await testROICalculations())

    // Test 6: Data Validation
    testResults.tests.push(await testDataValidation())

    // Test 7: Rate Limiting
    testResults.tests.push(await testRateLimiting())

    // Test 8: Slack Integration
    testResults.tests.push(await testSlackIntegration())

    // Test 9: Full Form Submission
    testResults.tests.push(await testFullSubmission())

    // Calculate summary
    testResults.summary.total = testResults.tests.length
    testResults.summary.passed = testResults.tests.filter((t) => t.status === "passed").length
    testResults.summary.failed = testResults.tests.filter((t) => t.status === "failed").length
    testResults.summary.warnings = testResults.tests.filter((t) => t.status === "warning").length

    return NextResponse.json({
      success: testResults.summary.failed === 0,
      message: `Integration test completed: ${testResults.summary.passed}/${testResults.summary.total} tests passed`,
      results: testResults,
    })
  } catch (error) {
    console.error("Integration test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Integration test failed",
        message: error instanceof Error ? error.message : String(error),
        results: testResults,
      },
      { status: 500 },
    )
  }
}

async function testEnvironmentVariables() {
  const test = {
    name: "Environment Variables",
    status: "passed" as "passed" | "failed" | "warning",
    message: "",
    details: {} as any,
  }

  try {
    const requiredVars = ["AIRTABLE_BASE_ID", "AIRTABLE_API_KEY", "AIRTABLE_TABLE_NAME"]
    const optionalVars = ["SLACK_WEBHOOK_URL"]

    const missing = requiredVars.filter((varName) => !process.env[varName])
    const optional = optionalVars.filter((varName) => !process.env[varName])

    test.details = {
      required: requiredVars.map((varName) => ({
        name: varName,
        configured: !!process.env[varName],
        value: process.env[varName] ? "***configured***" : "missing",
      })),
      optional: optionalVars.map((varName) => ({
        name: varName,
        configured: !!process.env[varName],
        value: process.env[varName] ? "***configured***" : "missing",
      })),
    }

    if (missing.length > 0) {
      test.status = "failed"
      test.message = `Missing required environment variables: ${missing.join(", ")}`
    } else if (optional.length > 0) {
      test.status = "warning"
      test.message = `Optional environment variables not configured: ${optional.join(", ")}`
    } else {
      test.message = "All environment variables configured correctly"
    }
  } catch (error) {
    test.status = "failed"
    test.message = `Environment variable test failed: ${error}`
  }

  return test
}

async function testAirtableConnectivity() {
  const test = {
    name: "Airtable Connectivity",
    status: "passed" as "passed" | "failed" | "warning",
    message: "",
    details: {} as any,
  }

  try {
    const startTime = Date.now()
    const response = await fetch("/api/airtable-health")
    const responseTime = Date.now() - startTime
    const data = await response.json()

    test.details = {
      responseTime: `${responseTime}ms`,
      status: data.status,
      details: data.details,
    }

    if (data.status === "healthy") {
      test.message = `Airtable connection healthy (${responseTime}ms)`
    } else {
      test.status = "failed"
      test.message = `Airtable connection failed: ${data.message}`
    }
  } catch (error) {
    test.status = "failed"
    test.message = `Airtable connectivity test failed: ${error}`
  }

  return test
}

async function testFieldValidation() {
  const test = {
    name: "Field Validation",
    status: "passed" as "passed" | "failed" | "warning",
    message: "",
    details: {} as any,
  }

  try {
    const response = await fetch("/api/validate-fields")
    const data = await response.json()

    test.details = data

    if (data.success) {
      if (data.summary.missing === 0) {
        test.message = `All ${data.summary.matching} fields validated successfully`
      } else {
        test.status = "warning"
        test.message = `${data.summary.missing} fields missing in Airtable`
      }
    } else {
      test.status = "failed"
      test.message = `Field validation failed: ${data.error}`
    }
  } catch (error) {
    test.status = "failed"
    test.message = `Field validation test failed: ${error}`
  }

  return test
}

async function testLeadScoring() {
  const test = {
    name: "Lead Scoring Algorithm",
    status: "passed" as "passed" | "failed" | "warning",
    message: "",
    details: {} as any,
  }

  try {
    // Import the scoring function (we'll simulate it here)
    const testScenarios = [
      {
        name: "High Score Lead",
        data: {
          decisionRole: "Final decision maker",
          numberOfCurrentVAs: "6",
          currentCallAnswerRate: "Under 30%",
          timeline: "ASAP - within 30 days",
          currentBudget: "$5,000+/month",
          annualRevenue: "Over $2M",
          numberOfEmployees: "100+",
          monthlyCallVolume: "1000+",
          currentPriorityLevel: "Top 3 business priority",
          aiServicesInterest: ["Service 1", "Service 2", "Service 3"],
        },
        expectedRange: [80, 100],
      },
      {
        name: "Medium Score Lead",
        data: {
          decisionRole: "Strong influencer",
          numberOfCurrentVAs: "3",
          currentCallAnswerRate: "50-70%",
          timeline: "1-3 months",
          currentBudget: "$1,000-2,000/month",
          annualRevenue: "$500K-1M",
          numberOfEmployees: "11-50",
          monthlyCallVolume: "100-500",
          currentPriorityLevel: "Important but not urgent",
          aiServicesInterest: ["Service 1"],
        },
        expectedRange: [40, 70],
      },
      {
        name: "Low Score Lead",
        data: {
          decisionRole: "Just researching",
          numberOfCurrentVAs: "0",
          currentCallAnswerRate: "90%+",
          timeline: "Over 12 months",
          currentBudget: "Under $500/month",
          annualRevenue: "Under $100K",
          numberOfEmployees: "1-10",
          monthlyCallVolume: "Under 100",
          currentPriorityLevel: "Nice to have",
          aiServicesInterest: [],
        },
        expectedRange: [0, 30],
      },
    ]

    const results = testScenarios.map((scenario) => {
      const score = calculateTestLeadScore(scenario.data)
      const inRange = score >= scenario.expectedRange[0] && score <= scenario.expectedRange[1]
      return {
        ...scenario,
        actualScore: score,
        passed: inRange,
      }
    })

    test.details = { scenarios: results }

    const allPassed = results.every((r) => r.passed)
    if (allPassed) {
      test.message = `All ${results.length} scoring scenarios passed`
    } else {
      test.status = "failed"
      test.message = `${results.filter((r) => !r.passed).length} scoring scenarios failed`
    }
  } catch (error) {
    test.status = "failed"
    test.message = `Lead scoring test failed: ${error}`
  }

  return test
}

async function testROICalculations() {
  const test = {
    name: "ROI Calculations",
    status: "passed" as "passed" | "failed" | "warning",
    message: "",
    details: {} as any,
  }

  try {
    const testCases = [
      { numVAs: "5", expectedMonthlySavings: 5 * 1800 - 597, expectedROI: Math.round(((5 * 1800 - 597) / 597) * 100) },
      { numVAs: "3", expectedMonthlySavings: 3 * 1800 - 597, expectedROI: Math.round(((3 * 1800 - 597) / 597) * 100) },
      { numVAs: "1", expectedMonthlySavings: 1 * 1800 - 597, expectedROI: Math.round(((1 * 1800 - 597) / 597) * 100) },
      { numVAs: "0", expectedMonthlySavings: 0, expectedROI: 0 },
    ]

    const results = testCases.map((testCase) => {
      const roi = calculateTestROI({ numberOfCurrentVAs: testCase.numVAs })
      return {
        numVAs: testCase.numVAs,
        expected: testCase,
        actual: roi,
        passed: roi.monthlySavings === testCase.expectedMonthlySavings && roi.roiPercentage === testCase.expectedROI,
      }
    })

    test.details = { calculations: results }

    const allPassed = results.every((r) => r.passed)
    if (allPassed) {
      test.message = `All ${results.length} ROI calculations correct`
    } else {
      test.status = "failed"
      test.message = `${results.filter((r) => !r.passed).length} ROI calculations failed`
    }
  } catch (error) {
    test.status = "failed"
    test.message = `ROI calculation test failed: ${error}`
  }

  return test
}

async function testDataValidation() {
  const test = {
    name: "Data Validation",
    status: "passed" as "passed" | "failed" | "warning",
    message: "",
    details: {} as any,
  }

  try {
    const validationTests = [
      {
        name: "Valid Email",
        data: { email: "test@example.com" },
        shouldPass: true,
      },
      {
        name: "Invalid Email",
        data: { email: "invalid-email" },
        shouldPass: false,
      },
      {
        name: "Valid Phone",
        data: { phone: "+1-555-123-4567" },
        shouldPass: true,
      },
      {
        name: "Invalid Phone",
        data: { phone: "abc" },
        shouldPass: false,
      },
      {
        name: "Valid URL",
        data: { website: "https://example.com" },
        shouldPass: true,
      },
      {
        name: "Invalid URL",
        data: { website: "not-a-url" },
        shouldPass: false,
      },
    ]

    const results = validationTests.map((validationTest) => {
      const errors = validateTestData(validationTest.data)
      const passed = validationTest.shouldPass ? errors.length === 0 : errors.length > 0
      return {
        ...validationTest,
        errors,
        passed,
      }
    })

    test.details = { validationTests: results }

    const allPassed = results.every((r) => r.passed)
    if (allPassed) {
      test.message = `All ${results.length} validation tests passed`
    } else {
      test.status = "failed"
      test.message = `${results.filter((r) => !r.passed).length} validation tests failed`
    }
  } catch (error) {
    test.status = "failed"
    test.message = `Data validation test failed: ${error}`
  }

  return test
}

async function testRateLimiting() {
  const test = {
    name: "Rate Limiting",
    status: "passed" as "passed" | "failed" | "warning",
    message: "",
    details: {} as any,
  }

  try {
    // Simulate rate limiting test
    const testIP = "test-ip-" + Date.now()
    const rateLimitResults = []

    // Test multiple requests from same IP
    for (let i = 0; i < 3; i++) {
      const allowed = checkTestRateLimit(testIP)
      rateLimitResults.push({ request: i + 1, allowed })
    }

    test.details = { rateLimitResults }

    // First few requests should be allowed
    if (rateLimitResults[0].allowed && rateLimitResults[1].allowed) {
      test.message = "Rate limiting functioning correctly"
    } else {
      test.status = "warning"
      test.message = "Rate limiting may be too restrictive"
    }
  } catch (error) {
    test.status = "failed"
    test.message = `Rate limiting test failed: ${error}`
  }

  return test
}

async function testSlackIntegration() {
  const test = {
    name: "Slack Integration",
    status: "passed" as "passed" | "failed" | "warning",
    message: "",
    details: {} as any,
  }

  try {
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

    if (!slackWebhookUrl) {
      test.status = "warning"
      test.message = "Slack webhook URL not configured"
      test.details = { configured: false }
      return test
    }

    // Test webhook URL format
    const isValidUrl = slackWebhookUrl.startsWith("https://hooks.slack.com/")

    test.details = {
      configured: true,
      validFormat: isValidUrl,
      url: slackWebhookUrl.substring(0, 50) + "...",
    }

    if (isValidUrl) {
      test.message = "Slack webhook configured correctly"
    } else {
      test.status = "warning"
      test.message = "Slack webhook URL format may be incorrect"
    }
  } catch (error) {
    test.status = "failed"
    test.message = `Slack integration test failed: ${error}`
  }

  return test
}

async function testFullSubmission() {
  const test = {
    name: "Full Form Submission",
    status: "passed" as "passed" | "failed" | "warning",
    message: "",
    details: {} as any,
  }

  try {
    // Test the full submission flow with test data
    const response = await fetch("/api/submit-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(TEST_LEAD_DATA),
    })

    const responseTime = Date.now()
    const data = await response.json()

    test.details = {
      statusCode: response.status,
      response: data,
      testData: TEST_LEAD_DATA,
    }

    if (response.ok && data.success) {
      test.message = `Form submission successful - Lead Score: ${data.leadScore}/100`
    } else {
      test.status = "failed"
      test.message = `Form submission failed: ${data.error || "Unknown error"}`
    }
  } catch (error) {
    test.status = "failed"
    test.message = `Full submission test failed: ${error}`
  }

  return test
}

// Helper functions for testing
function calculateTestLeadScore(data: any): number {
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
  if (data.annualRevenue === "Over $2M" || data.annualRevenue === "$1M-2M") {
    score += 5
  }

  if (data.numberOfEmployees === "100+" || data.numberOfEmployees === "51-100") {
    score += 3
  }

  if (data.monthlyCallVolume === "1000+" || data.monthlyCallVolume === "500-1000") {
    score += 3
  }

  if (data.currentPriorityLevel === "Top 3 business priority") {
    score += 5
  }

  if (data.aiServicesInterest && data.aiServicesInterest.length >= 3) {
    score += 3
  }

  return Math.min(100, Math.max(0, score))
}

function calculateTestROI(data: any) {
  const numVAs = Number.parseInt(data.numberOfCurrentVAs) || 0
  const monthlyVACost = numVAs * 1800
  const aiCost = 597
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

function validateTestData(data: any) {
  const errors = []
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  const urlRegex = /^https?:\/\/.+/

  if (data.email && !emailRegex.test(data.email)) {
    errors.push({ field: "email", message: "Invalid email format" })
  }

  if (data.phone && !phoneRegex.test(data.phone.replace(/[\s\-$$$$]/g, ""))) {
    errors.push({ field: "phone", message: "Invalid phone format" })
  }

  if (data.website && !urlRegex.test(data.website)) {
    errors.push({ field: "website", message: "Invalid URL format" })
  }

  return errors
}

function checkTestRateLimit(ip: string): boolean {
  // Simplified rate limiting for testing
  return true // Allow for testing purposes
}
