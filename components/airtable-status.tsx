"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Database, Clock, Zap } from "lucide-react"

interface HealthStatus {
  status: "healthy" | "error" | "loading"
  message: string
  details?: {
    baseId?: string
    tableName?: string
    recordCount?: number
    responseTime?: string
    tableInfo?: {
      id: string
      name: string
      fieldCount: number
      fields: Array<{ name: string; type: string }>
    }
  }
  timestamp?: string
}

interface ValidationStatus {
  success: boolean
  summary?: {
    totalExpected: number
    totalActual: number
    matching: number
    missing: number
    extra: number
  }
  fields?: {
    matching: string[]
    missing: string[]
    extra: string[]
  }
  recommendations?: Array<{
    type: string
    message: string
    fields?: string[]
    matches?: Array<{ expected: string; actual: string }>
  }>
}

export default function AirtableStatus() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>({ status: "loading", message: "Checking..." })
  const [validationStatus, setValidationStatus] = useState<ValidationStatus | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const checkHealth = async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch("/api/airtable-health")
      const data = await response.json()
      setHealthStatus(data)
    } catch (error) {
      setHealthStatus({
        status: "error",
        message: "Failed to check Airtable health",
        details: { responseTime: "timeout" },
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const validateFields = async () => {
    try {
      const response = await fetch("/api/validate-fields")
      const data = await response.json()
      setValidationStatus(data)
    } catch (error) {
      console.error("Field validation failed:", error)
    }
  }

  useEffect(() => {
    checkHealth()
    validateFields()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Health Status Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <CardTitle className="text-lg">Airtable Integration Status</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={checkHealth}
            disabled={isRefreshing}
            className="flex items-center space-x-1 bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {getStatusIcon(healthStatus.status)}
              <span className="font-medium">{healthStatus.message}</span>
            </div>
            <Badge className={getStatusColor(healthStatus.status)}>{healthStatus.status.toUpperCase()}</Badge>
          </div>

          {healthStatus.details && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {healthStatus.details.tableName && (
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Table</p>
                    <p className="text-xs text-gray-600">{healthStatus.details.tableName}</p>
                  </div>
                </div>
              )}

              {healthStatus.details.responseTime && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Response Time</p>
                    <p className="text-xs text-gray-600">{healthStatus.details.responseTime}</p>
                  </div>
                </div>
              )}

              {healthStatus.details.recordCount !== undefined && (
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Records</p>
                    <p className="text-xs text-gray-600">{healthStatus.details.recordCount}</p>
                  </div>
                </div>
              )}

              {healthStatus.details.tableInfo && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Fields</p>
                    <p className="text-xs text-gray-600">{healthStatus.details.tableInfo.fieldCount}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {healthStatus.timestamp && (
            <p className="text-xs text-gray-500 mt-4">
              Last checked: {new Date(healthStatus.timestamp).toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Field Validation Card */}
      {validationStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Field Validation</span>
            </CardTitle>
            <CardDescription>Validation of form fields against Airtable schema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Badge className={validationStatus.success ? getStatusColor("healthy") : getStatusColor("error")}>
                {validationStatus.success ? "VALID" : "ISSUES FOUND"}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Hide Details" : "Show Details"}
              </Button>
            </div>

            {validationStatus.summary && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{validationStatus.summary.matching}</p>
                  <p className="text-xs text-gray-600">Matching</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{validationStatus.summary.missing}</p>
                  <p className="text-xs text-gray-600">Missing</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{validationStatus.summary.extra}</p>
                  <p className="text-xs text-gray-600">Extra</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">{validationStatus.summary.totalExpected}</p>
                  <p className="text-xs text-gray-600">Expected</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">{validationStatus.summary.totalActual}</p>
                  <p className="text-xs text-gray-600">Actual</p>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {validationStatus.recommendations && validationStatus.recommendations.length > 0 && (
              <div className="space-y-2">
                {validationStatus.recommendations.map((rec, index) => (
                  <Alert key={index} className={rec.type === "missing_fields" ? "border-red-200" : "border-yellow-200"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>{rec.message}</strong>
                      {rec.fields && rec.fields.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Fields:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {rec.fields.slice(0, 5).map((field) => (
                              <Badge key={field} variant="outline" className="text-xs">
                                {field}
                              </Badge>
                            ))}
                            {rec.fields.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{rec.fields.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                      {rec.matches && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Potential matches:</p>
                          {rec.matches.map((match, i) => (
                            <p key={i} className="text-xs">
                              {match.expected} → {match.actual}
                            </p>
                          ))}
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {/* Detailed Field Lists */}
            {showDetails && validationStatus.fields && (
              <div className="mt-6 space-y-4">
                {validationStatus.fields.missing.length > 0 && (
                  <div>
                    <h4 className="font-medium text-red-600 mb-2">
                      Missing Fields ({validationStatus.fields.missing.length})
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {validationStatus.fields.missing.map((field) => (
                        <Badge key={field} variant="outline" className="text-xs border-red-200 text-red-700">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {validationStatus.fields.extra.length > 0 && (
                  <div>
                    <h4 className="font-medium text-yellow-600 mb-2">
                      Extra Fields ({validationStatus.fields.extra.length})
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {validationStatus.fields.extra.map((field) => (
                        <Badge key={field} variant="outline" className="text-xs border-yellow-200 text-yellow-700">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {validationStatus.fields.matching.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">
                      Matching Fields ({validationStatus.fields.matching.length})
                    </h4>
                    <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                      {validationStatus.fields.matching.map((field) => (
                        <Badge key={field} variant="outline" className="text-xs border-green-200 text-green-700">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
