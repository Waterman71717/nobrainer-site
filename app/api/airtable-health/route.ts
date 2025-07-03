import { type NextRequest, NextResponse } from "next/server"

// Airtable configuration
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Leads"

export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Check if environment variables are configured
    if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
      return NextResponse.json(
        {
          status: "error",
          message: "Airtable environment variables not configured",
          details: {
            hasBaseId: !!AIRTABLE_BASE_ID,
            hasApiKey: !!AIRTABLE_API_KEY,
            tableName: AIRTABLE_TABLE_NAME,
          },
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }

    // Test Airtable API connectivity
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?maxRecords=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    const responseTime = Date.now() - startTime

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        {
          status: "error",
          message: "Airtable API connection failed",
          details: {
            statusCode: response.status,
            statusText: response.statusText,
            error: errorText,
            responseTime: `${responseTime}ms`,
          },
          timestamp: new Date().toISOString(),
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Get table schema information
    const schemaResponse = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    })

    let tableInfo = null
    if (schemaResponse.ok) {
      const schemaData = await schemaResponse.json()
      const table = schemaData.tables?.find((t: any) => t.name === AIRTABLE_TABLE_NAME)
      if (table) {
        tableInfo = {
          id: table.id,
          name: table.name,
          fieldCount: table.fields?.length || 0,
          fields: table.fields?.map((f: any) => ({ name: f.name, type: f.type })) || [],
        }
      }
    }

    return NextResponse.json({
      status: "healthy",
      message: "Airtable integration is working correctly",
      details: {
        baseId: AIRTABLE_BASE_ID,
        tableName: AIRTABLE_TABLE_NAME,
        recordCount: data.records?.length || 0,
        responseTime: `${responseTime}ms`,
        apiVersion: "v0",
        tableInfo,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    const responseTime = Date.now() - startTime

    console.error("Airtable health check failed:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Airtable health check failed",
        details: {
          error: error instanceof Error ? error.message : String(error),
          responseTime: `${responseTime}ms`,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
