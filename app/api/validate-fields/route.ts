import { type NextRequest, NextResponse } from "next/server"

// Airtable configuration
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Leads"

// Expected field mapping from our form
const EXPECTED_FIELDS = [
  // Contact Information
  "Name",
  "JobTitle",
  "Email",
  "Phone Number",
  "Company",
  "Website",

  // Business Profile
  "Industry",
  "Annual Revenue",
  "Employees",
  "Country",
  "State/Province",
  "City",
  "Zip Code",

  // Current Setup
  "Number of Current VAs",
  "Current Cost of Staff/Answering Service",
  "Monthly Call Volume",
  "Current Call Answer Rate",
  "Revenue Lost from Missed Calls",

  // Pain Points
  "Current Challenge",
  "What's Driving This Need Right Now",
  "If You Don't Solve This in Next 3 Months",
  "Current Priority Level",

  // AI Services Interest
  "Services Interested",
  "Primary Use Case",
  "Pricing_Tier_Interest",
  "Multi-language Support Interest",
  "If yes, please specify language(s)",

  // Budget & Timeline
  "Current Budget",
  "Budget Flexibility",
  "Timeline",
  "Decision_Role",

  // Technical Setup
  "Current CRM/Database",
  "Integration Requirements",
  "Technology Implementation Handler",

  // Decision Process
  "Stakeholders",
  "Budget Authority",
  "Implementation Approver",
  "Decision Timeline",
  "Approval Process",

  // Competitive Landscape
  "Other AI Solutions You've Evaluated",
  "Current Provider",
  "AI Experience",
  "Concerns",
  "Differentiators",

  // Next Steps
  "Preferred Next Step",
  "Demo Scheduling Urgency",
  "Best Time for Demo/Call",
  "Who Will Attend the Demo",
  "Preferred Demo Format",
  "Interest in Client Reference",
  "Additional Information",

  // System Fields
  "Status",
  "Lead_Status",
  "Lead Score",
  "Lead Source Page",
  "Created At",
  "Follow-up Date",

  // Calculated Fields
  "Monthly_Savings",
  "Annual_Savings",
  "ROI_Percentage",
  "Qualification_Level",
  "Follow_up_Priority",
  "Next_Action",

  // Additional Fields
  "Notes",
  "Assignee",
  "Attachments",
  "Attachment Summary",
  "Demo Requested",
  "Demo Scheduled Date",
  "Demo Link",
  "How Did You Hear About Us",
  "Form_Version",
  "Processing_Time",
  "Duplicate_Flag",
]

export async function GET(request: NextRequest) {
  try {
    // Check if environment variables are configured
    if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "Airtable environment variables not configured",
          details: {
            hasBaseId: !!AIRTABLE_BASE_ID,
            hasApiKey: !!AIRTABLE_API_KEY,
          },
        },
        { status: 500 },
      )
    }

    // Get table schema from Airtable
    const response = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch Airtable schema",
          details: {
            status: response.status,
            statusText: response.statusText,
            response: errorText,
          },
        },
        { status: response.status },
      )
    }

    const schemaData = await response.json()
    const table = schemaData.tables?.find((t: any) => t.name === AIRTABLE_TABLE_NAME)

    if (!table) {
      return NextResponse.json(
        {
          success: false,
          error: `Table '${AIRTABLE_TABLE_NAME}' not found`,
          details: {
            availableTables: schemaData.tables?.map((t: any) => t.name) || [],
          },
        },
        { status: 404 },
      )
    }

    // Get actual field names from Airtable
    const actualFields = table.fields?.map((f: any) => f.name) || []

    // Compare expected vs actual fields
    const missingFields = EXPECTED_FIELDS.filter((field) => !actualFields.includes(field))
    const extraFields = actualFields.filter((field: string) => !EXPECTED_FIELDS.includes(field))
    const matchingFields = EXPECTED_FIELDS.filter((field) => actualFields.includes(field))

    // Field type mapping
    const fieldTypes =
      table.fields?.reduce((acc: any, field: any) => {
        acc[field.name] = field.type
        return acc
      }, {}) || {}

    // Validation results
    const validationResults = {
      success: missingFields.length === 0,
      summary: {
        totalExpected: EXPECTED_FIELDS.length,
        totalActual: actualFields.length,
        matching: matchingFields.length,
        missing: missingFields.length,
        extra: extraFields.length,
      },
      fields: {
        matching: matchingFields,
        missing: missingFields,
        extra: extraFields,
      },
      fieldTypes,
      recommendations: [],
    }

    // Generate recommendations
    if (missingFields.length > 0) {
      validationResults.recommendations.push({
        type: "missing_fields",
        message: `Add ${missingFields.length} missing fields to your Airtable base`,
        fields: missingFields,
      })
    }

    if (extraFields.length > 0) {
      validationResults.recommendations.push({
        type: "extra_fields",
        message: `${extraFields.length} fields exist in Airtable but are not used by the form`,
        fields: extraFields,
      })
    }

    // Check for potential field name mismatches
    const potentialMatches = missingFields
      .map((missing) => {
        const similar = actualFields.find(
          (actual: string) =>
            actual.toLowerCase().includes(missing.toLowerCase()) ||
            missing.toLowerCase().includes(actual.toLowerCase()),
        )
        return similar ? { expected: missing, actual: similar } : null
      })
      .filter(Boolean)

    if (potentialMatches.length > 0) {
      validationResults.recommendations.push({
        type: "potential_matches",
        message: "Potential field name mismatches detected",
        matches: potentialMatches,
      })
    }

    return NextResponse.json(validationResults)
  } catch (error) {
    console.error("Field validation error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Field validation failed",
        details: {
          message: error instanceof Error ? error.message : String(error),
        },
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { testData } = await request.json()

    if (!testData) {
      return NextResponse.json({ success: false, error: "Test data is required" }, { status: 400 })
    }

    // Validate the test data against Airtable schema
    const validationResponse = await GET(request)
    const validation = await validationResponse.json()

    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: "Schema validation failed",
        validation,
      })
    }

    // Test data submission (dry run)
    const testSubmission = {
      fields: testData,
    }

    console.log("Test submission prepared:", {
      fieldCount: Object.keys(testData).length,
      fields: Object.keys(testData),
    })

    return NextResponse.json({
      success: true,
      message: "Test data validation successful",
      testSubmission,
      validation,
    })
  } catch (error) {
    console.error("Test validation error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Test validation failed",
        details: {
          message: error instanceof Error ? error.message : String(error),
        },
      },
      { status: 500 },
    )
  }
}
