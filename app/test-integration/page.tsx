"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  RefreshCw,
  Database,
  Zap,
  Shield,
  MessageSquare,
  Calculator,
  FileCheck,
  Clock,
  Users,
} from "lucide-react"
import AirtableStatus from "@/components/airtable-status"

interface TestResult {
  name: string
  status: "passed" | "failed" | "warning"
  message: string
  details: any
}

interface TestSummary {
  total: number
  passed: number
  failed: number
  warnings: number
}

export default function TestIntegrationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [summary, setSummary] = useState<TestSummary | null>(null)
  const [progress, setProgress] = useState(0)

  const runTests = async () => {
    setIsRunning(true)
    setProgress(0)
    setTestResults([])
    setSummary(null)

    try {
      const response = await fetch("/api/test-integration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (data.results) {
        setTestResults(data.results.tests || [])
        setSummary(data.results.summary || null)
        setProgress(100)
      }
    } catch (error) {
      console.error("Test execution failed:", error)
      setTestResults([
        {
          name: "Test Execution",
          status: "failed",
          message: `Failed to execute tests: ${error}`,
          details: {},
        },
      ])
    } finally {
      setIsRunning(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800 border-green-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTestIcon = (testName: string) => {
    switch (testName) {
      case "Environment Variables":
        return <Shield className="h-4 w-4" />
      case "Airtable Connectivity":
        return <Database className="h-4 w-4" />
      case "Field Validation":
        return <FileCheck className="h-4 w-4" />
      case "Lead Scoring Algorithm":
        return <Calculator className="h-4 w-4" />
      case "ROI Calculations":
        return <Zap className="h-4 w-4" />
      case "Data Validation":
        return <Shield className="h-4 w-4" />
      case "Rate Limiting":
        return <Clock className="h-4 w-4" />
      case "Slack Integration":
        return <MessageSquare className="h-4 w-4" />
      case "Full Form Submission":
        return <Users className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Integration Testing Dashboard</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive testing suite to validate all components of the Nobrainer Group lead qualification system.
        </p>
      </div>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Test Controls</span>
          </CardTitle>
          <CardDescription>
            Run comprehensive integration tests to verify all systems are working correctly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Button onClick={runTests} disabled={isRunning} size="lg" className="flex items-center space-x-2">
              <RefreshCw className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`} />
              <span>{isRunning ? "Running Tests..." : "Run All Tests"}</span>
            </Button>

            {summary && (
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{summary.passed}</div>
                  <div className="text-xs text-gray-600">Passed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{summary.failed}</div>
                  <div className="text-xs text-gray-600">Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{summary.warnings}</div>
                  <div className="text-xs text-gray-600">Warnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{summary.total}</div>
                  <div className="text-xs text-gray-600">Total</div>
                </div>
              </div>
            )}
          </div>

          {isRunning && (
            <div className="mt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600 mt-2">Running integration tests...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Test Results</h2>

          {/* Summary Alert */}
          {summary && (
            <Alert className={summary.failed === 0 ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>
                  {summary.failed === 0 ? "✅ All tests passed successfully!" : `❌ ${summary.failed} test(s) failed`}
                </strong>
                <br />
                {summary.passed}/{summary.total} tests passed
                {summary.warnings > 0 && `, ${summary.warnings} warnings`}
              </AlertDescription>
            </Alert>
          )}

          {/* Individual Test Results */}
          <div className="grid gap-4">
            {testResults.map((test, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  test.status === "passed"
                    ? "border-l-green-500"
                    : test.status === "failed"
                      ? "border-l-red-500"
                      : "border-l-yellow-500"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      {getTestIcon(test.name)}
                      <span>{test.name}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(test.status)}
                      <Badge className={getStatusColor(test.status)}>{test.status.toUpperCase()}</Badge>
                    </div>
                  </div>
                  <CardDescription>{test.message}</CardDescription>
                </CardHeader>

                {test.details && Object.keys(test.details).length > 0 && (
                  <CardContent className="pt-0">
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                        View Details
                      </summary>
                      <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                        <pre className="text-xs text-gray-600 whitespace-pre-wrap overflow-x-auto">
                          {JSON.stringify(test.details, null, 2)}
                        </pre>
                      </div>
                    </details>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Airtable Status Component */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Live System Status</h2>
        <AirtableStatus />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common testing and debugging actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => window.open("/api/airtable-health", "_blank")}
              className="flex items-center space-x-2"
            >
              <Database className="h-4 w-4" />
              <span>Check Airtable Health</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => window.open("/api/validate-fields", "_blank")}
              className="flex items-center space-x-2"
            >
              <FileCheck className="h-4 w-4" />
              <span>Validate Fields</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => window.open("/assessment", "_blank")}
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Test Assessment Form</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>Test Documentation</CardTitle>
          <CardDescription>Understanding what each test validates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Environment Variables</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Validates that all required environment variables (Airtable credentials, Slack webhook) are properly
                  configured.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>Airtable Connectivity</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Tests connection to Airtable API, response times, and basic table access permissions.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <FileCheck className="h-4 w-4" />
                  <span>Field Validation</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Ensures all form fields map correctly to Airtable columns and identifies any missing or extra fields.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <Calculator className="h-4 w-4" />
                  <span>Lead Scoring Algorithm</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Tests the lead scoring algorithm with various scenarios to ensure accurate scoring (0-100 points).
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>ROI Calculations</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Validates ROI calculations for different VA counts, ensuring accurate savings and percentage
                  calculations.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Slack Integration</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Verifies Slack webhook configuration and tests notification delivery for high-priority leads.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
