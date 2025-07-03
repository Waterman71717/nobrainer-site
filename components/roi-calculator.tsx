"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, DollarSign, Users, Clock } from "lucide-react"
import Link from "next/link"

export function ROICalculator() {
  const [agents, setAgents] = useState(5)
  const [avgSalary, setAvgSalary] = useState(35000)
  const [hoursPerWeek, setHoursPerWeek] = useState(40)

  const calculateSavings = () => {
    const annualCostPerAgent = avgSalary + avgSalary * 0.3 // Including benefits
    const totalAnnualCost = annualCostPerAgent * agents
    const aiCost = agents <= 5 ? 3564 : agents <= 20 ? 7164 : 14364 // Annual AI cost
    const annualSavings = totalAnnualCost - aiCost
    const monthlySavings = annualSavings / 12
    const roi = ((annualSavings / aiCost) * 100).toFixed(0)

    return {
      annualSavings: Math.max(0, annualSavings),
      monthlySavings: Math.max(0, monthlySavings),
      roi: Math.max(0, Number.parseInt(roi)),
      totalAnnualCost,
      aiCost,
    }
  }

  const savings = calculateSavings()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Calculate Your ROI</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how much you can save by implementing our AI customer service solutions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Input */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Your Current Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="agents" className="text-sm font-medium text-gray-700">
                    Number of Customer Service Agents
                  </Label>
                  <Input
                    id="agents"
                    type="number"
                    value={agents}
                    onChange={(e) => setAgents(Number.parseInt(e.target.value) || 1)}
                    min="1"
                    max="100"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="salary" className="text-sm font-medium text-gray-700">
                    Average Annual Salary per Agent ($)
                  </Label>
                  <Input
                    id="salary"
                    type="number"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Number.parseInt(e.target.value) || 35000)}
                    min="20000"
                    max="100000"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="hours" className="text-sm font-medium text-gray-700">
                    Hours per Week
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number.parseInt(e.target.value) || 40)}
                    min="20"
                    max="60"
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Your Potential Savings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">${savings.monthlySavings.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Monthly Savings</div>
                  </div>

                  <div className="bg-white rounded-lg p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{savings.roi}%</div>
                    <div className="text-sm text-gray-600">Annual ROI</div>
                  </div>

                  <div className="bg-white rounded-lg p-4 text-center">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">${savings.annualSavings.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Annual Savings</div>
                  </div>

                  <div className="bg-white rounded-lg p-4 text-center">
                    <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">Availability</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Cost Breakdown:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Annual Cost:</span>
                      <span className="font-medium">${savings.totalAnnualCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AI Solution Cost:</span>
                      <span className="font-medium">${savings.aiCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-900 font-semibold">Total Savings:</span>
                      <span className="font-bold text-green-600">${savings.annualSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/contact">Get Your Custom Quote</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
