"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Calculator,
  Save,
  Star,
  Zap,
  Mail,
  Clock,
  Trophy,
  Target,
  Settings,
  DollarSign,
  Users,
} from "lucide-react"

interface FormData {
  // Step 1: Business Information
  fullName: string
  jobTitle: string
  email: string
  phone: string
  companyName: string
  industry: string
  annualRevenue: string
  numberOfEmployees: string
  country: string
  website: string

  // Step 2: Current Setup Analysis
  numberOfCurrentVAs: string
  monthlyCostOfCurrentStaff: string
  monthlyCallVolume: string
  currentCallAnswerRate: string
  revenueLostFromMissedCalls: string

  // Step 3: Pain Point Identification
  currentChallenge: string
  whatsDriveringThisNeed: string
  ifYouDontSolveThis: string
  currentPriorityLevel: string

  // Step 4: AI Services Interest
  aiServicesInterest: string[]
  primaryUseCase: string
  pricingTierInterest: string
  multiLanguageInterest: string
  languagesNeeded: string[]

  // Step 5: Budget & Timeline
  currentBudget: string
  budgetFlexibility: string
  timeline: string
  decisionRole: string

  // Step 6: Technical Setup
  currentCRMDatabase: string
  integrationRequirements: string
  technologyImplementationHandler: string

  // Step 7: Decision Process
  stakeholdersInvolved: string[]
  budgetAuthority: string
  implementationApprover: string
  decisionTimeline: string
  approvalProcess: string

  // Step 8: Competitive Landscape
  solutionsEvaluated: string[]
  currentProvider: string
  previousAIExperience: string
  competitorConcerns: string
  differentiators: string[]

  // Step 9: Next Steps & Preferences
  preferredDemo: string
  demoTimeline: string
  referenceInterest: string
  followUpPreference: string
  additionalQuestions: string
  readyToStart: string
}

interface ROIData {
  monthlyVACost: number
  aiCost: number
  monthlySavings: number
  annualSavings: number
  roi: number
  numVAs: number
}

interface LeadScoreDisplay {
  color: string
  bg: string
  message: string
}

const initialFormData: FormData = {
  // Step 1: Business Information
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  companyName: "",
  industry: "",
  annualRevenue: "",
  numberOfEmployees: "",
  country: "",
  website: "",

  // Step 2: Current Setup Analysis
  numberOfCurrentVAs: "",
  monthlyCostOfCurrentStaff: "",
  monthlyCallVolume: "",
  currentCallAnswerRate: "",
  revenueLostFromMissedCalls: "",

  // Step 3: Pain Point Identification
  currentChallenge: "",
  whatsDriveringThisNeed: "",
  ifYouDontSolveThis: "",
  currentPriorityLevel: "",

  // Step 4: AI Services Interest
  aiServicesInterest: [],
  primaryUseCase: "",
  pricingTierInterest: "",
  multiLanguageInterest: "",
  languagesNeeded: [],

  // Step 5: Budget & Timeline
  currentBudget: "",
  budgetFlexibility: "",
  timeline: "",
  decisionRole: "",

  // Step 6: Technical Setup
  currentCRMDatabase: "",
  integrationRequirements: "",
  technologyImplementationHandler: "",

  // Step 7: Decision Process
  stakeholdersInvolved: [],
  budgetAuthority: "",
  implementationApprover: "",
  decisionTimeline: "",
  approvalProcess: "",

  // Step 8: Competitive Landscape
  solutionsEvaluated: [],
  currentProvider: "",
  previousAIExperience: "",
  competitorConcerns: "",
  differentiators: [],

  // Step 9: Next Steps & Preferences
  preferredDemo: "",
  demoTimeline: "",
  referenceInterest: "",
  followUpPreference: "",
  additionalQuestions: "",
  readyToStart: "",
}

// Encouragement messages for each step
const encouragementMessages = [
  "Great start! Let's learn about your business", // Step 1
  "Excellent! Now let's analyze your current setup", // Step 2
  "You're doing great! Tell us about your challenges", // Step 3
  "Perfect! What AI services interest you most?", // Step 4
  "Almost halfway there! Let's discuss budget & timeline", // Step 5
  "Fantastic progress! Quick technical questions", // Step 6
  "You're nearly done! Decision process details", // Step 7
  "Amazing! Just a few more questions", // Step 8
  "Final step! Let's plan your next steps", // Step 9
]

// Time estimates for each step (in seconds)
const stepTimeEstimates = [120, 90, 75, 60, 45, 30, 30, 20, 40] // Total: ~8.5 minutes

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [leadScore, setLeadScore] = useState(0)
  const [roiData, setRoiData] = useState<ROIData | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [stepStartTime, setStepStartTime] = useState<Date>(new Date())
  const [showConfetti, setShowConfetti] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const formRef = useRef<HTMLDivElement>(null)

  const totalSteps = 9
  const progress = (currentStep / totalSteps) * 100
  const completedSteps = currentStep - 1

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Auto-save functionality - every 30 seconds
  useEffect(() => {
    const savedData = localStorage.getItem("assessment-form-data")
    const savedStep = localStorage.getItem("assessment-current-step")
    const savedTime = localStorage.getItem("assessment-start-time")

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Ensure all fields have proper default values
        const safeFormData = { ...initialFormData, ...parsedData }
        // Ensure array fields are always arrays
        Object.keys(initialFormData).forEach((key) => {
          const initialValue = initialFormData[key as keyof FormData]
          if (Array.isArray(initialValue) && !Array.isArray(safeFormData[key as keyof FormData])) {
            safeFormData[key as keyof FormData] = [] as any
          }
          // Ensure string fields are never undefined
          if (
            typeof initialValue === "string" &&
            (safeFormData[key as keyof FormData] === undefined || safeFormData[key as keyof FormData] === null)
          ) {
            safeFormData[key as keyof FormData] = "" as any
          }
        })
        setFormData(safeFormData)
      } catch (error) {
        console.error("Error parsing saved form data:", error)
        localStorage.removeItem("assessment-form-data")
      }
    }
    if (savedStep) {
      const stepNumber = Number.parseInt(savedStep, 10)
      if (stepNumber >= 1 && stepNumber <= totalSteps) {
        setCurrentStep(stepNumber)
      }
    }
    if (savedTime) {
      setStartTime(new Date(savedTime))
    } else {
      localStorage.setItem("assessment-start-time", new Date().toISOString())
    }
  }, [totalSteps])

  // Auto-save with animation
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem("assessment-form-data", JSON.stringify(formData))
        localStorage.setItem("assessment-current-step", currentStep.toString())
        setLastSaved(new Date())

        // Show save indicator briefly
        setTimeout(() => setLastSaved(null), 2000)
      } catch (error) {
        console.error("Error saving form data:", error)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [formData, currentStep])

  // Exit intent detection - Fixed event listener cleanup
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && currentStep > 1 && currentStep < totalSteps && !isComplete) {
        setShowExitIntent(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [currentStep, totalSteps, isComplete])

  // Touch gesture handlers for mobile
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile) return
      const touch = e.touches[0]
      if (touch) {
        setTouchStart({ x: touch.clientX, y: touch.clientY })
      }
    },
    [isMobile],
  )

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile || !touchStart) return

      const touch = e.changedTouches[0]
      if (!touch) return

      const deltaX = touch.clientX - touchStart.x
      const deltaY = Math.abs(touch.clientY - touchStart.y)

      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > 50 && deltaY < 100) {
        if (deltaX > 0 && currentStep > 1) {
          prevStep()
        } else if (deltaX < 0 && currentStep < totalSteps && validateCurrentStep()) {
          nextStep()
        }
      }
      setTouchStart(null)
    },
    [isMobile, touchStart, currentStep, totalSteps],
  )

  // Calculate time remaining
  const getTimeRemaining = useCallback(() => {
    const elapsed = (new Date().getTime() - startTime.getTime()) / 1000
    const remainingSteps = totalSteps - currentStep
    const avgTimePerStep = stepTimeEstimates.slice(currentStep - 1).reduce((a, b) => a + b, 0)
    const estimatedSeconds = Math.max(30, avgTimePerStep - elapsed)
    const minutes = Math.floor(estimatedSeconds / 60)
    const seconds = Math.round(estimatedSeconds % 60)

    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} remaining`
    }
    return `${seconds} seconds remaining`
  }, [startTime, currentStep, totalSteps])

  const updateFormData = useCallback(
    (field: string, value: any) => {
      // Ensure value is never undefined - use empty string for strings, empty array for arrays
      let safeValue = value
      if (value === undefined || value === null) {
        // Check if this field should be an array based on initial form data
        const initialValue = initialFormData[field as keyof FormData]
        safeValue = Array.isArray(initialValue) ? [] : ""
      }

      setFormData((prev) => ({ ...prev, [field]: safeValue }))

      // Clear validation errors when user updates a field
      setValidationErrors((prev) => prev.filter((error) => !error.toLowerCase().includes(field.toLowerCase())))

      // Immediate save for critical fields
      if (field === "email" || field === "fullName" || field === "companyName") {
        setTimeout(() => {
          try {
            localStorage.setItem("assessment-form-data", JSON.stringify({ ...formData, [field]: safeValue }))
            setLastSaved(new Date())
          } catch (error) {
            console.error("Error saving critical field:", error)
          }
        }, 1000)
      }
    },
    [formData],
  )

  const calculateROI = useCallback((): ROIData => {
    const numVAs = Number.parseInt(formData.numberOfCurrentVAs) || 0
    const monthlyVACost = numVAs * 1800 // $1,800 per VA
    const aiCost = 597 // $597 for AI solution
    const monthlySavings = Math.max(0, monthlyVACost - aiCost)
    const annualSavings = monthlySavings * 12
    const roi = monthlyVACost > 0 ? (monthlySavings / aiCost) * 100 : 0

    return {
      monthlyVACost,
      aiCost,
      monthlySavings,
      annualSavings,
      roi: Math.round(roi),
      numVAs,
    }
  }, [formData.numberOfCurrentVAs])

  const calculateLeadScore = useCallback(() => {
    let score = 0

    // Authority Score (30 points)
    if (formData.decisionRole === "Final decision maker") score += 30
    else if (formData.decisionRole === "Strong influencer") score += 25
    else if (formData.decisionRole === "Some input") score += 15
    else if (formData.decisionRole === "IT/Technical role") score += 12
    else if (formData.decisionRole === "Just researching") score += 8
    else if (formData.decisionRole === "Other") score += 5

    // VA Count Score (25 points)
    if (formData.numberOfCurrentVAs === "6") score += 25
    else if (formData.numberOfCurrentVAs === "4") score += 23
    else if (formData.numberOfCurrentVAs === "3") score += 20
    else if (formData.numberOfCurrentVAs === "2") score += 15
    else if (formData.numberOfCurrentVAs === "1") score += 10
    else if (formData.numberOfCurrentVAs === "0") score += 3

    // Pain Level Score (25 points) - Based on call answer rate
    if (formData.currentCallAnswerRate === "Under 30%") score += 25
    else if (formData.currentCallAnswerRate === "30-50%") score += 20
    else if (formData.currentCallAnswerRate === "50-70%") score += 15
    else if (formData.currentCallAnswerRate === "70-90%") score += 8
    else if (formData.currentCallAnswerRate === "90%+") score += 3

    // Urgency Score (20 points)
    if (formData.timeline === "ASAP - within 30 days") score += 20
    else if (formData.timeline === "1-3 months") score += 15
    else if (formData.timeline === "3-6 months") score += 10
    else if (formData.timeline === "6-12 months" || formData.timeline === "Over 12 months") score += 5

    return Math.min(100, score)
  }, [formData.decisionRole, formData.numberOfCurrentVAs, formData.currentCallAnswerRate, formData.timeline])

  // Get lead score color and message - Fixed to remove unused emoji property
  const getLeadScoreDisplay = useCallback((score: number): LeadScoreDisplay => {
    if (score >= 90) return { color: "text-green-600", bg: "bg-green-100", message: "Sales Ready!" }
    if (score >= 70) return { color: "text-orange-600", bg: "bg-orange-100", message: "High Interest" }
    if (score >= 41) return { color: "text-yellow-600", bg: "bg-yellow-100", message: "Good Potential" }
    return { color: "text-red-600", bg: "bg-red-100", message: "Needs Qualification" }
  }, [])

  // Validation functions - Enhanced with better error messages
  const validateCurrentStep = useCallback(() => {
    const errors: string[] = []

    switch (currentStep) {
      case 1:
        if (!formData.fullName.trim()) errors.push("Full name is required")
        if (!formData.jobTitle.trim()) errors.push("Job title is required")
        if (!formData.email.trim()) errors.push("Email is required")
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push("Please enter a valid email address")
        if (!formData.phone.trim()) errors.push("Phone is required")
        if (!formData.companyName.trim()) errors.push("Company name is required")
        if (!formData.industry) errors.push("Industry is required")
        break
      case 2:
        if (!formData.numberOfCurrentVAs) errors.push("Number of current VAs is required")
        break
      case 3:
        if (!formData.currentChallenge) errors.push("Current challenge is required")
        if (!formData.whatsDriveringThisNeed) errors.push("What's driving this need is required")
        if (!formData.currentPriorityLevel) errors.push("Priority level is required")
        break
      case 4:
        if (formData.aiServicesInterest.length === 0) errors.push("Please select at least one AI service of interest")
        break
      case 5:
        if (!formData.decisionRole) errors.push("Decision role is required")
        if (!formData.timeline) errors.push("Timeline is required")
        break
      case 6:
        if (!formData.currentCRMDatabase) errors.push("Current CRM/Database is required")
        break
      default:
        break
    }

    setValidationErrors(errors)
    return errors.length === 0
  }, [currentStep, formData])

  const nextStep = useCallback(() => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setStepStartTime(new Date())

      // Focus management for accessibility
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        formRef.current.focus()
      }
    }
  }, [validateCurrentStep, currentStep, totalSteps])

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setStepStartTime(new Date())
      setValidationErrors([]) // Clear errors when going back

      // Focus management for accessibility
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        formRef.current.focus()
      }
    }
  }, [currentStep])

  const handleSubmit = useCallback(async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)

    const calculatedROI = calculateROI()
    const calculatedScore = calculateLeadScore()

    setRoiData(calculatedROI)
    setLeadScore(calculatedScore)

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          roiCalculation: calculatedROI,
          leadScore: calculatedScore,
          leadSourcePage: "Assessment Form",
          submittedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setIsComplete(true)
        setShowConfetti(true)

        // Clear saved data
        localStorage.removeItem("assessment-form-data")
        localStorage.removeItem("assessment-current-step")
        localStorage.removeItem("assessment-start-time")

        // Hide confetti after 3 seconds
        setTimeout(() => setShowConfetti(false), 3000)
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error("Failed to submit assessment:", errorData)
        setValidationErrors([errorData.error || "Failed to submit assessment. Please try again."])
      }
    } catch (error) {
      console.error("Error submitting assessment:", error)
      setValidationErrors(["Network error. Please check your connection and try again."])
    } finally {
      setIsSubmitting(false)
    }
  }, [validateCurrentStep, calculateROI, calculateLeadScore, formData])

  // Send recovery email
  const sendRecoveryEmail = useCallback(async () => {
    if (!formData.email) return

    const recoveryData = {
      email: formData.email,
      formData,
      currentStep,
      timestamp: new Date().toISOString(),
    }

    try {
      // Store recovery data temporarily
      localStorage.setItem("recovery-data", JSON.stringify(recoveryData))
      setShowExitIntent(false)

      // In real implementation, this would send an email
      alert(`Recovery link would be sent to ${formData.email}`)
    } catch (error) {
      console.error("Error saving recovery data:", error)
    }
  }, [formData, currentStep])

  // Multiple choice selection handler - Fixed type safety
  const handleMultipleChoice = useCallback(
    (field: keyof FormData, value: string, isChecked: boolean) => {
      const currentValues = formData[field] as string[]

      // Ensure we always have an array
      const safeCurrentValues = Array.isArray(currentValues) ? currentValues : []

      if (isChecked) {
        updateFormData(field, [...safeCurrentValues, value])
      } else {
        updateFormData(
          field,
          safeCurrentValues.filter((v) => v !== value),
        )
      }
    },
    [formData, updateFormData],
  )

  // Completion celebration
  if (isComplete) {
    return (
      <section className="py-20 bg-gray-50 relative">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4">
          <Card className="shadow-xl border-0">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Trophy className="h-10 w-10 text-green-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">Assessment Complete!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for completing our comprehensive AI readiness assessment. Here's your personalized analysis:
              </p>

              {/* Lead Score Display */}
              <div
                className={`rounded-lg p-6 mb-6 ${
                  leadScore >= 90
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
                    : leadScore >= 70
                      ? "bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200"
                      : leadScore >= 41
                        ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200"
                        : "bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200"
                }`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your AI Readiness Score</h3>
                <div className="relative mb-4">
                  <div
                    className={`text-6xl font-bold mb-2 ${
                      leadScore >= 90
                        ? "text-green-600"
                        : leadScore >= 70
                          ? "text-orange-600"
                          : leadScore >= 41
                            ? "text-yellow-600"
                            : "text-red-600"
                    }`}
                  >
                    {leadScore}/100
                  </div>
                  <div className="text-gray-600 font-medium">{getLeadScoreDisplay(leadScore).message}</div>
                </div>
              </div>

              {/* ROI Summary */}
              {roiData && roiData.numVAs > 0 && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                    <Calculator className="h-5 w-5 mr-2" /> Your Complete ROI Analysis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-red-600">
                        ${(roiData.numVAs * 1800 * 12).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Current Annual VA Costs</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-blue-600">$7,164</div>
                      <div className="text-sm text-gray-600">AI Solution Annual Cost</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-green-600">${roiData.annualSavings.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Annual Savings</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-green-600">{roiData.roi}%</div>
                      <div className="text-sm text-gray-600">ROI Percentage</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What Happens Next?</h3>
                <div className="text-left space-y-2 text-gray-600">
                  <p>• Our AI specialists will review your assessment within 2 hours</p>
                  <p>• You'll receive a detailed email summary at {formData.email}</p>
                  <p>• We'll prepare a custom implementation strategy</p>
                  <p>• Schedule a consultation call to discuss your needs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen" role="main" aria-label="AI Assessment Form">
      {/* Exit Intent Modal */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full shadow-xl animate-scale-in">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Don't lose your progress!</h3>
              <p className="text-gray-600 mb-6">
                You're {Math.round(progress)}% complete. Save your progress and complete in just {getTimeRemaining()}.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={sendRecoveryEmail}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!formData.email}
                >
                  Save & Continue Later
                </Button>
                <Button onClick={() => setShowExitIntent(false)} variant="outline" className="w-full">
                  Continue Assessment
                </Button>
              </div>
              {!formData.email && (
                <p className="text-sm text-gray-500 mt-2">Enter your email in Step 1 to save progress</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4" ref={formRef} tabIndex={-1}>
        {/* Enhanced Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Step {currentStep} of {totalSteps}
              </h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-sm font-semibold">
                {Math.round(progress)}% Complete
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                {getTimeRemaining()}
              </div>

              {lastSaved && (
                <div className="flex items-center text-green-600 animate-fade-in-up">
                  <Save className="h-4 w-4 mr-1" />
                  Saved
                </div>
              )}
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-4">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step < currentStep
                      ? "bg-green-600 text-white"
                      : step === currentStep
                        ? "bg-blue-600 text-white ring-4 ring-blue-200"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                {step < totalSteps && (
                  <div
                    className={`w-8 h-1 mx-1 transition-all duration-300 ${
                      step < currentStep ? "bg-green-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <Progress value={progress} className="h-4 bg-gray-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-white mix-blend-difference">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Encouragement Message */}
          <div className="mt-4 text-center">
            <p className="text-lg font-medium text-blue-600 animate-fade-in-up">
              {encouragementMessages[currentStep - 1]}
            </p>
          </div>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Card className="mb-6 border-red-200 bg-red-50 animate-fade-in-up">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-red-600 text-sm">!</span>
                </div>
                <div>
                  <h4 className="text-red-800 font-medium mb-2">Please fix the following:</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card
          className="shadow-xl border-0 transition-all duration-300 hover:shadow-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              {currentStep === 1 && (
                <>
                  <Users className="h-5 w-5 text-blue-600" /> Business Information
                </>
              )}
              {currentStep === 2 && (
                <>
                  <Calculator className="h-5 w-5 text-green-600" /> Current Setup Analysis
                </>
              )}
              {currentStep === 3 && (
                <>
                  <Target className="h-5 w-5 text-red-600" /> Pain Point Identification
                </>
              )}
              {currentStep === 4 && (
                <>
                  <Zap className="h-5 w-5 text-purple-600" /> AI Services Interest
                </>
              )}
              {currentStep === 5 && (
                <>
                  <DollarSign className="h-5 w-5 text-green-600" /> Budget & Timeline
                </>
              )}
              {currentStep === 6 && (
                <>
                  <Settings className="h-5 w-5 text-blue-600" /> Technical Setup
                </>
              )}
              {currentStep === 7 && (
                <>
                  <Users className="h-5 w-5 text-orange-600" /> Decision Process
                </>
              )}
              {currentStep === 8 && (
                <>
                  <Star className="h-5 w-5 text-yellow-600" /> Competitive Landscape
                </>
              )}
              {currentStep === 9 && (
                <>
                  <Trophy className="h-5 w-5 text-green-600" /> Next Steps & Preferences
                </>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName || ""}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      required
                      className="mt-1 touch-target form-input"
                      autoComplete="name"
                      aria-describedby="fullName-error"
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                      Job Title *
                    </Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle || ""}
                      onChange={(e) => updateFormData("jobTitle", e.target.value)}
                      required
                      className="mt-1 touch-target form-input"
                      autoComplete="organization-title"
                      aria-describedby="jobTitle-error"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      required
                      className="mt-1 touch-target form-input"
                      autoComplete="email"
                      aria-describedby="email-error"
                    />
                    <div className="text-xs text-gray-500 mt-1">We'll send your assessment results here</div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      required
                      placeholder="+1 (555) 123-4567"
                      className="mt-1 touch-target form-input"
                      autoComplete="tel"
                      aria-describedby="phone-error"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName || ""}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                    required
                    className="mt-1 touch-target form-input"
                    autoComplete="organization"
                    aria-describedby="companyName-error"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                      Industry *
                    </Label>
                    <select
                      id="industry"
                      className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.industry || ""}
                      onChange={(e) => updateFormData("industry", e.target.value)}
                      required
                      aria-describedby="industry-error"
                    >
                      <option value="">Select Industry</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Legal">Legal</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Technology">Technology</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="annualRevenue" className="text-sm font-medium text-gray-700">
                      Annual Revenue
                    </Label>
                    <select
                      id="annualRevenue"
                      className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.annualRevenue || ""}
                      onChange={(e) => updateFormData("annualRevenue", e.target.value)}
                    >
                      <option value="">Select Range</option>
                      <option value="<$100K">Under $100K</option>
                      <option value="$100K-250K">$100K-250K</option>
                      <option value="$250K-500K">$250K-500K</option>
                      <option value="$500K-1M">$500K-1M</option>
                      <option value="$1M-2M">$1M-2M</option>
                      <option value="Over $2M">Over $2M</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numberOfEmployees" className="text-sm font-medium text-gray-700">
                      Number of Employees
                    </Label>
                    <select
                      id="numberOfEmployees"
                      className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.numberOfEmployees || ""}
                      onChange={(e) => updateFormData("numberOfEmployees", e.target.value)}
                    >
                      <option value="">Select Size</option>
                      <option value="1-5">1-5</option>
                      <option value="6-20">6-20</option>
                      <option value="21-50">21-50</option>
                      <option value="51-100">51-100</option>
                      <option value="100+">100+</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                      Country
                    </Label>
                    <select
                      id="country"
                      className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.country || ""}
                      onChange={(e) => updateFormData("country", e.target.value)}
                    >
                      <option value="">Select Country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                    Website (Optional)
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website || ""}
                    onChange={(e) => updateFormData("website", e.target.value)}
                    placeholder="https://www.yourcompany.com"
                    className="mt-1 touch-target form-input"
                    autoComplete="url"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Current Setup Analysis */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numberOfCurrentVAs" className="text-sm font-medium text-gray-700">
                      Number of Current Virtual Assistants *
                    </Label>
                    <select
                      id="numberOfCurrentVAs"
                      className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.numberOfCurrentVAs || ""}
                      onChange={(e) => updateFormData("numberOfCurrentVAs", e.target.value)}
                      required
                      aria-describedby="numberOfCurrentVAs-error"
                    >
                      <option value="">Select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4-5</option>
                      <option value="6">6+</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="monthlyCostOfCurrentStaff" className="text-sm font-medium text-gray-700">
                      Monthly Cost of Current Staff
                    </Label>
                    <select
                      id="monthlyCostOfCurrentStaff"
                      className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.monthlyCostOfCurrentStaff || ""}
                      onChange={(e) => updateFormData("monthlyCostOfCurrentStaff", e.target.value)}
                    >
                      <option value="">Select Range</option>
                      <option value="Under $500">Under $500</option>
                      <option value="$500-1,500">$500-1,500</option>
                      <option value="$1,500-3,000">$1,500-3,000</option>
                      <option value="$3,000-5,000">$3,000-5,000</option>
                      <option value="$5,000+">$5,000+</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyCallVolume" className="text-sm font-medium text-gray-700">
                      Monthly Call Volume
                    </Label>
                    <select
                      id="monthlyCallVolume"
                      className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.monthlyCallVolume || ""}
                      onChange={(e) => updateFormData("monthlyCallVolume", e.target.value)}
                    >
                      <option value="">Select Volume</option>
                      <option value="<50">Under 50</option>
                      <option value="50-200">50-200</option>
                      <option value="200-500">200-500</option>
                      <option value="500-1000">500-1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="currentCallAnswerRate" className="text-sm font-medium text-gray-700">
                      Current Call Answer Rate
                    </Label>
                    <select
                      id="currentCallAnswerRate"
                      className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.currentCallAnswerRate || ""}
                      onChange={(e) => updateFormData("currentCallAnswerRate", e.target.value)}
                    >
                      <option value="">Select Rate</option>
                      <option value="90%+">90%+</option>
                      <option value="70-90%">70-90%</option>
                      <option value="50-70%">50-70%</option>
                      <option value="30-50%">30-50%</option>
                      <option value="Under 30%">Under 30%</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="revenueLostFromMissedCalls" className="text-sm font-medium text-gray-700">
                    Revenue Lost from Missed Calls (Monthly)
                  </Label>
                  <select
                    id="revenueLostFromMissedCalls"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.revenueLostFromMissedCalls || ""}
                    onChange={(e) => updateFormData("revenueLostFromMissedCalls", e.target.value)}
                  >
                    <option value="">Select Range</option>
                    <option value="$0-1,000">$0-1,000</option>
                    <option value="$1,000-5,000">$1,000-5,000</option>
                    <option value="$5,000-10,000">$5,000-10,000</option>
                    <option value="$10,000+">$10,000+</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>

                {/* Real-time ROI calculation */}
                {formData.numberOfCurrentVAs && Number.parseInt(formData.numberOfCurrentVAs) > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6 animate-scale-in">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Calculator className="h-5 w-5 mr-2 text-green-600" /> Your Real-Time Savings Calculation
                    </h3>
                    {(() => {
                      const roi = calculateROI()
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-green-600 animate-pulse">
                              ${roi.monthlySavings.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Monthly Savings</div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-green-600 animate-pulse">
                              ${roi.annualSavings.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Annual Savings</div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-green-600 animate-pulse">{roi.roi}%</div>
                            <div className="text-sm text-gray-600">ROI</div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Pain Point Identification */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentChallenge" className="text-sm font-medium text-gray-700">
                    Current Challenge *
                  </Label>
                  <select
                    id="currentChallenge"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.currentChallenge || ""}
                    onChange={(e) => updateFormData("currentChallenge", e.target.value)}
                    required
                    aria-describedby="currentChallenge-error"
                  >
                    <option value="">Select Challenge</option>
                    <option value="Too many missed calls">Too many missed calls</option>
                    <option value="High staffing costs">High staffing costs</option>
                    <option value="Inconsistent service quality">Inconsistent service quality</option>
                    <option value="Can't scale with growth">Can't scale with growth</option>
                    <option value="After-hours coverage">After-hours coverage</option>
                    <option value="Staff turnover">Staff turnover</option>
                    <option value="Poor customer experience">Poor customer experience</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="whatsDriveringThisNeed" className="text-sm font-medium text-gray-700">
                    What's Driving This Need Right Now *
                  </Label>
                  <select
                    id="whatsDriveringThisNeed"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.whatsDriveringThisNeed || ""}
                    onChange={(e) => updateFormData("whatsDriveringThisNeed", e.target.value)}
                    required
                    aria-describedby="whatsDriveringThisNeed-error"
                  >
                    <option value="">Select Driver</option>
                    <option value="Rapid business growth">Rapid business growth</option>
                    <option value="Cost pressure/budget cuts">Cost pressure/budget cuts</option>
                    <option value="Customer complaints">Customer complaints</option>
                    <option value="Staff shortages">Staff shortages</option>
                    <option value="Competitive advantage">Competitive advantage</option>
                    <option value="Strategic initiative">Strategic initiative</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="ifYouDontSolveThis" className="text-sm font-medium text-gray-700">
                    If You Don't Solve This in Next 3 Months
                  </Label>
                  <select
                    id="ifYouDontSolveThis"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.ifYouDontSolveThis || ""}
                    onChange={(e) => updateFormData("ifYouDontSolveThis", e.target.value)}
                  >
                    <option value="">Select Impact</option>
                    <option value="Business as usual">Business as usual</option>
                    <option value="Minor inefficiencies">Minor inefficiencies</option>
                    <option value="Lost opportunities">Lost opportunities</option>
                    <option value="Significant problems">Significant problems</option>
                    <option value="Major business crisis">Major business crisis</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="currentPriorityLevel" className="text-sm font-medium text-gray-700">
                    Current Priority Level *
                  </Label>
                  <select
                    id="currentPriorityLevel"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.currentPriorityLevel || ""}
                    onChange={(e) => updateFormData("currentPriorityLevel", e.target.value)}
                    required
                    aria-describedby="currentPriorityLevel-error"
                  >
                    <option value="">Select Priority</option>
                    <option value="Top 3 business priority">Top 3 business priority</option>
                    <option value="Important but not urgent">Important but not urgent</option>
                    <option value="Nice to have improvement">Nice to have improvement</option>
                    <option value="Just exploring options">Just exploring options</option>
                  </select>
                </div>

                {/* Lead Score Display */}
                {(formData.currentPriorityLevel || formData.whatsDriveringThisNeed) && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 animate-scale-in">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2" /> Your Current Lead Score
                    </h3>
                    {(() => {
                      const score = calculateLeadScore()
                      const display = getLeadScoreDisplay(score)
                      return (
                        <div className="text-center">
                          <div className={`text-4xl font-bold mb-2 ${display.color} animate-pulse`}>{score}/100</div>
                          <div
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${display.bg} ${display.color}`}
                          >
                            {display.message}
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: AI Services Interest */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    AI Services Interest * (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "AI Chatbots",
                      "Voice AI & IVR",
                      "Live Chat Support",
                      "SMS Automation",
                      "Email Automation",
                      "Appointment Scheduling",
                      "Lead Qualification",
                      "Customer Support",
                    ].map((service) => (
                      <label
                        key={service}
                        className="flex items-center p-3 border rounded-lg hover:bg-gray-50 touch-target cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.aiServicesInterest.includes(service)}
                          onChange={(e) => handleMultipleChoice("aiServicesInterest", service, e.target.checked)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="primaryUseCase" className="text-sm font-medium text-gray-700">
                    Primary Use Case
                  </Label>
                  <select
                    id="primaryUseCase"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.primaryUseCase || ""}
                    onChange={(e) => updateFormData("primaryUseCase", e.target.value)}
                  >
                    <option value="">Select Primary Use Case</option>
                    <option value="Customer support">Customer support</option>
                    <option value="Lead generation">Lead generation</option>
                    <option value="Appointment booking">Appointment booking</option>
                    <option value="Order processing">Order processing</option>
                    <option value="FAQ automation">FAQ automation</option>
                    <option value="After-hours coverage">After-hours coverage</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="pricingTierInterest" className="text-sm font-medium text-gray-700">
                    Pricing Tier Interest
                  </Label>
                  <select
                    id="pricingTierInterest"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.pricingTierInterest || ""}
                    onChange={(e) => updateFormData("pricingTierInterest", e.target.value)}
                  >
                    <option value="">Select Tier</option>
                    <option value="AI Starter ($447/month)">AI Starter ($447/month)</option>
                    <option value="AI Professional ($847/month)">AI Professional ($847/month)</option>
                    <option value="AI Enterprise ($1,597/month)">AI Enterprise ($1,597/month)</option>
                    <option value="Custom solution">Custom solution</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="multiLanguageInterest" className="text-sm font-medium text-gray-700">
                    Multi-Language Support Needed?
                  </Label>
                  <select
                    id="multiLanguageInterest"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.multiLanguageInterest || ""}
                    onChange={(e) => updateFormData("multiLanguageInterest", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe in future">Maybe in future</option>
                  </select>
                </div>

                {formData.multiLanguageInterest === "Yes" && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Languages Required (Select all that apply)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {["Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese", "Other"].map(
                        (language) => (
                          <label
                            key={language}
                            className="flex items-center p-2 border rounded hover:bg-gray-50 touch-target cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={formData.languagesNeeded.includes(language)}
                              onChange={(e) => handleMultipleChoice("languagesNeeded", language, e.target.checked)}
                              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">{language}</span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Budget & Timeline */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentBudget" className="text-sm font-medium text-gray-700">
                    Current Budget Range
                  </Label>
                  <select
                    id="currentBudget"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.currentBudget || ""}
                    onChange={(e) => updateFormData("currentBudget", e.target.value)}
                  >
                    <option value="">Select Budget</option>
                    <option value="Under $500/month">Under $500/month</option>
                    <option value="$500-1,000/month">$500-1,000/month</option>
                    <option value="$1,000-2,000/month">$1,000-2,000/month</option>
                    <option value="$2,000-5,000/month">$2,000-5,000/month</option>
                    <option value="$5,000+/month">$5,000+/month</option>
                    <option value="Need to see ROI first">Need to see ROI first</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="budgetFlexibility" className="text-sm font-medium text-gray-700">
                    Budget Flexibility
                  </Label>
                  <select
                    id="budgetFlexibility"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.budgetFlexibility || ""}
                    onChange={(e) => updateFormData("budgetFlexibility", e.target.value)}
                  >
                    <option value="">Select Flexibility</option>
                    <option value="Fixed budget - no flexibility">Fixed budget - no flexibility</option>
                    <option value="Some flexibility for right solution">Some flexibility for right solution</option>
                    <option value="Flexible based on ROI">Flexible based on ROI</option>
                    <option value="Budget not finalized">Budget not finalized</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="timeline" className="text-sm font-medium text-gray-700">
                    Implementation Timeline *
                  </Label>
                  <select
                    id="timeline"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.timeline || ""}
                    onChange={(e) => updateFormData("timeline", e.target.value)}
                    required
                    aria-describedby="timeline-error"
                  >
                    <option value="">Select Timeline</option>
                    <option value="ASAP - within 30 days">ASAP - within 30 days</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="Over 12 months">Over 12 months</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="decisionRole" className="text-sm font-medium text-gray-700">
                    Your Role in Decision Making *
                  </Label>
                  <select
                    id="decisionRole"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.decisionRole || ""}
                    onChange={(e) => updateFormData("decisionRole", e.target.value)}
                    required
                    aria-describedby="decisionRole-error"
                  >
                    <option value="">Select Role</option>
                    <option value="Final decision maker">Final decision maker</option>
                    <option value="Strong influencer">Strong influencer</option>
                    <option value="Some input">Some input</option>
                    <option value="IT/Technical role">IT/Technical role</option>
                    <option value="Just researching">Just researching</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Updated Lead Score Display */}
                {(formData.decisionRole || formData.timeline) && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6 animate-scale-in">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" /> Updated Lead Score
                    </h3>
                    {(() => {
                      const score = calculateLeadScore()
                      const display = getLeadScoreDisplay(score)
                      return (
                        <div className="text-center">
                          <div className={`text-4xl font-bold mb-2 ${display.color} animate-pulse`}>{score}/100</div>
                          <div
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${display.bg} ${display.color}`}
                          >
                            {display.message}
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* Step 6: Technical Setup */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentCRMDatabase" className="text-sm font-medium text-gray-700">
                    Current CRM/Database *
                  </Label>
                  <select
                    id="currentCRMDatabase"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.currentCRMDatabase || ""}
                    onChange={(e) => updateFormData("currentCRMDatabase", e.target.value)}
                    required
                    aria-describedby="currentCRMDatabase-error"
                  >
                    <option value="">Select CRM/Database</option>
                    <option value="Salesforce">Salesforce</option>
                    <option value="HubSpot">HubSpot</option>
                    <option value="Pipedrive">Pipedrive</option>
                    <option value="Zoho">Zoho</option>
                    <option value="Microsoft Dynamics">Microsoft Dynamics</option>
                    <option value="Custom database">Custom database</option>
                    <option value="Spreadsheets">Spreadsheets</option>
                    <option value="None currently">None currently</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="integrationRequirements" className="text-sm font-medium text-gray-700">
                    Integration Requirements
                  </Label>
                  <select
                    id="integrationRequirements"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.integrationRequirements || ""}
                    onChange={(e) => updateFormData("integrationRequirements", e.target.value)}
                  >
                    <option value="">Select Requirements</option>
                    <option value="Must integrate with existing systems">Must integrate with existing systems</option>
                    <option value="Some integration preferred">Some integration preferred</option>
                    <option value="Standalone solution is fine">Standalone solution is fine</option>
                    <option value="Not sure about integrations">Not sure about integrations</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="technologyImplementationHandler" className="text-sm font-medium text-gray-700">
                    Who Handles Technology Implementation?
                  </Label>
                  <select
                    id="technologyImplementationHandler"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.technologyImplementationHandler || ""}
                    onChange={(e) => updateFormData("technologyImplementationHandler", e.target.value)}
                  >
                    <option value="">Select Handler</option>
                    <option value="Internal IT team">Internal IT team</option>
                    <option value="External IT consultant">External IT consultant</option>
                    <option value="I handle it myself">I handle it myself</option>
                    <option value="Need implementation support">Need implementation support</option>
                    <option value="Not decided yet">Not decided yet</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 7: Decision Process */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Other Stakeholders Involved (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "CEO/Owner",
                      "CTO/IT Director",
                      "Operations Manager",
                      "Finance/CFO",
                      "Marketing Director",
                      "Customer Service Manager",
                      "None - I decide alone",
                    ].map((stakeholder) => (
                      <label
                        key={stakeholder}
                        className="flex items-center p-3 border rounded-lg hover:bg-gray-50 touch-target cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.stakeholdersInvolved.includes(stakeholder)}
                          onChange={(e) => handleMultipleChoice("stakeholdersInvolved", stakeholder, e.target.checked)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-gray-700">{stakeholder}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="budgetAuthority" className="text-sm font-medium text-gray-700">
                    Budget Authority
                  </Label>
                  <select
                    id="budgetAuthority"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.budgetAuthority || ""}
                    onChange={(e) => updateFormData("budgetAuthority", e.target.value)}
                  >
                    <option value="">Select Authority</option>
                    <option value="I have full budget authority">I have full budget authority</option>
                    <option value="I can approve up to certain amount">I can approve up to certain amount</option>
                    <option value="Need approval from others">Need approval from others</option>
                    <option value="Budget already approved">Budget already approved</option>
                    <option value="Budget approval in process">Budget approval in process</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="implementationApprover" className="text-sm font-medium text-gray-700">
                    Who Approves Implementation?
                  </Label>
                  <select
                    id="implementationApprover"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.implementationApprover || ""}
                    onChange={(e) => updateFormData("implementationApprover", e.target.value)}
                  >
                    <option value="">Select Approver</option>
                    <option value="I approve implementation">I approve implementation</option>
                    <option value="CEO/Owner approval needed">CEO/Owner approval needed</option>
                    <option value="IT team approval needed">IT team approval needed</option>
                    <option value="Board/committee approval">Board/committee approval</option>
                    <option value="Already pre-approved">Already pre-approved</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="decisionTimeline" className="text-sm font-medium text-gray-700">
                    Decision Timeline
                  </Label>
                  <select
                    id="decisionTimeline"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.decisionTimeline || ""}
                    onChange={(e) => updateFormData("decisionTimeline", e.target.value)}
                  >
                    <option value="">Select Timeline</option>
                    <option value="Ready to decide now">Ready to decide now</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Within 3 months">Within 3 months</option>
                    <option value="Still researching">Still researching</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="approvalProcess" className="text-sm font-medium text-gray-700">
                    Approval Process
                  </Label>
                  <select
                    id="approvalProcess"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.approvalProcess || ""}
                    onChange={(e) => updateFormData("approvalProcess", e.target.value)}
                  >
                    <option value="">Select Process</option>
                    <option value="Simple - I can approve">Simple - I can approve</option>
                    <option value="Requires 1-2 approvals">Requires 1-2 approvals</option>
                    <option value="Complex approval process">Complex approval process</option>
                    <option value="Informal process">Informal process</option>
                    <option value="Not sure of process">Not sure of process</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 8: Competitive Landscape */}
            {currentStep === 8 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Other AI Solutions Being Evaluated (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "ChatGPT/OpenAI",
                      "Zendesk AI",
                      "Intercom",
                      "Drift",
                      "LiveChat",
                      "Freshworks",
                      "Custom development",
                      "None - only evaluating you",
                    ].map((solution) => (
                      <label
                        key={solution}
                        className="flex items-center p-3 border rounded-lg hover:bg-gray-50 touch-target cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.solutionsEvaluated.includes(solution)}
                          onChange={(e) => handleMultipleChoice("solutionsEvaluated", solution, e.target.checked)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-gray-700">{solution}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentProvider" className="text-sm font-medium text-gray-700">
                    Current Service Provider
                  </Label>
                  <select
                    id="currentProvider"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.currentProvider || ""}
                    onChange={(e) => updateFormData("currentProvider", e.target.value)}
                  >
                    <option value="">Select Current Provider</option>
                    <option value="Virtual assistants/freelancers">Virtual assistants/freelancers</option>
                    <option value="Traditional call center">Traditional call center</option>
                    <option value="Answering service">Answering service</option>
                    <option value="In-house staff only">In-house staff only</option>
                    <option value="Mix of solutions">Mix of solutions</option>
                    <option value="No current solution">No current solution</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="previousAIExperience" className="text-sm font-medium text-gray-700">
                    Previous AI Experience
                  </Label>
                  <select
                    id="previousAIExperience"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.previousAIExperience || ""}
                    onChange={(e) => updateFormData("previousAIExperience", e.target.value)}
                  >
                    <option value="">Select Experience</option>
                    <option value="Never used AI solutions">Never used AI solutions</option>
                    <option value="Used basic chatbots">Used basic chatbots</option>
                    <option value="Tried AI but didn't work well">Tried AI but didn't work well</option>
                    <option value="Currently using AI successfully">Currently using AI successfully</option>
                    <option value="Experienced with AI implementations">Experienced with AI implementations</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="competitorConcerns" className="text-sm font-medium text-gray-700">
                    Main Concerns About AI Solutions
                  </Label>
                  <Textarea
                    id="competitorConcerns"
                    value={formData.competitorConcerns || ""}
                    onChange={(e) => updateFormData("competitorConcerns", e.target.value)}
                    placeholder="What are your main concerns or hesitations about implementing AI?"
                    className="mt-1 touch-target"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    What Would Make You Choose Us? (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Best price",
                      "Proven ROI",
                      "Easy implementation",
                      "Superior technology",
                      "Great support",
                      "SMB focus",
                      "Custom solution",
                      "Fast deployment",
                    ].map((differentiator) => (
                      <label
                        key={differentiator}
                        className="flex items-center p-3 border rounded-lg hover:bg-gray-50 touch-target cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.differentiators.includes(differentiator)}
                          onChange={(e) => handleMultipleChoice("differentiators", differentiator, e.target.checked)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-gray-700">{differentiator}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 9: Next Steps & Preferences */}
            {currentStep === 9 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="preferredDemo" className="text-sm font-medium text-gray-700">
                    Preferred Demo Format
                  </Label>
                  <select
                    id="preferredDemo"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.preferredDemo || ""}
                    onChange={(e) => updateFormData("preferredDemo", e.target.value)}
                  >
                    <option value="">Select Demo Format</option>
                    <option value="Live video demo">Live video demo</option>
                    <option value="In-person meeting">In-person meeting</option>
                    <option value="Recorded demo video">Recorded demo video</option>
                    <option value="Phone call discussion">Phone call discussion</option>
                    <option value="Not ready for demo">Not ready for demo</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="demoTimeline" className="text-sm font-medium text-gray-700">
                    When Would You Like a Demo?
                  </Label>
                  <select
                    id="demoTimeline"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.demoTimeline || ""}
                    onChange={(e) => updateFormData("demoTimeline", e.target.value)}
                  >
                    <option value="">Select Timeline</option>
                    <option value="ASAP - this week">ASAP - this week</option>
                    <option value="Next week">Next week</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="Within a month">Within a month</option>
                    <option value="Not ready yet">Not ready yet</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="referenceInterest" className="text-sm font-medium text-gray-700">
                    Interest in Speaking with References
                  </Label>
                  <select
                    id="referenceInterest"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.referenceInterest || ""}
                    onChange={(e) => updateFormData("referenceInterest", e.target.value)}
                  >
                    <option value="">Select Interest</option>
                    <option value="Very interested">Very interested</option>
                    <option value="Somewhat interested">Somewhat interested</option>
                    <option value="Maybe later">Maybe later</option>
                    <option value="Not necessary">Not necessary</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="followUpPreference" className="text-sm font-medium text-gray-700">
                    Follow-up Preference
                  </Label>
                  <select
                    id="followUpPreference"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.followUpPreference || ""}
                    onChange={(e) => updateFormData("followUpPreference", e.target.value)}
                  >
                    <option value="">Select Preference</option>
                    <option value="Email only">Email only</option>
                    <option value="Phone call preferred">Phone call preferred</option>
                    <option value="Email first, then call">Email first, then call</option>
                    <option value="Text/SMS">Text/SMS</option>
                    <option value="No follow-up needed">No follow-up needed</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="readyToStart" className="text-sm font-medium text-gray-700">
                    How Ready Are You to Get Started?
                  </Label>
                  <select
                    id="readyToStart"
                    className="w-full p-3 border border-gray-300 rounded-md touch-target focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.readyToStart || ""}
                    onChange={(e) => updateFormData("readyToStart", e.target.value)}
                  >
                    <option value="">Select Readiness</option>
                    <option value="Ready to start immediately">Ready to start immediately</option>
                    <option value="Ready after seeing demo">Ready after seeing demo</option>
                    <option value="Need to compare options">Need to compare options</option>
                    <option value="Still in research phase">Still in research phase</option>
                    <option value="Just gathering information">Just gathering information</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="additionalQuestions" className="text-sm font-medium text-gray-700">
                    Additional Questions or Comments
                  </Label>
                  <Textarea
                    id="additionalQuestions"
                    value={formData.additionalQuestions || ""}
                    onChange={(e) => updateFormData("additionalQuestions", e.target.value)}
                    placeholder="Any specific questions or requirements we should know about?"
                    className="mt-1 touch-target"
                    rows={4}
                  />
                </div>

                {/* Final Lead Score and ROI Summary */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Trophy className="h-5 w-5 mr-2" /> Final Assessment Summary
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Lead Score */}
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700 mb-2">Your Lead Score</div>
                      {(() => {
                        const score = calculateLeadScore()
                        const display = getLeadScoreDisplay(score)
                        return (
                          <div>
                            <div className={`text-3xl font-bold mb-1 ${display.color}`}>{score}/100</div>
                            <div
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${display.bg} ${display.color}`}
                            >
                              {display.message}
                            </div>
                          </div>
                        )
                      })()}
                    </div>

                    {/* ROI Summary */}
                    {formData.numberOfCurrentVAs && Number.parseInt(formData.numberOfCurrentVAs) > 0 && (
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-700 mb-2">Potential Annual Savings</div>
                        {(() => {
                          const roi = calculateROI()
                          return (
                            <div>
                              <div className="text-3xl font-bold text-green-600 mb-1">
                                ${roi.annualSavings.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-600">
                                {roi.roi}% ROI replacing {roi.numVAs} VA{roi.numVAs > 1 ? "s" : ""}
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Swipe Instruction */}
            {isMobile && (
              <div className="mt-6 text-center text-sm text-gray-500">
                Tip: Swipe left/right to navigate between steps
              </div>
            )}
          </CardContent>

          {/* Navigation */}
          <div className="border-t p-6">
            <div className="flex justify-between items-center">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="flex items-center bg-transparent"
              >
                ← Previous
              </Button>

              <div className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </div>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center bg-blue-600 hover:bg-blue-700"
                  disabled={validationErrors.length > 0}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || validationErrors.length > 0}
                  className="flex items-center bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>Complete Assessment</>
                  )}
                </Button>
              )}
            </div>

            {/* Progress indication */}
            <div className="mt-4 text-center text-sm text-gray-500">
              {completedSteps} of {totalSteps} steps completed
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
