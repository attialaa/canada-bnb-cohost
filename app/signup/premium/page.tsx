"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PremiumSignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "",
    currentBookings: "",
    currentRevenue: "",
    photographyNeeds: "",
    optimizationGoals: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-fit mx-auto mb-6">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
              Thank You!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Your application for the Premium Package has been received. I'll contact you within 24 hours to discuss
              next steps and schedule a comprehensive property consultation.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg transform rotate-3">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Canada BnB Co-Host
              </h1>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Package Details */}
            <div>
              <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
                    Premium Package
                  </CardTitle>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-xl mb-6">
                      <div className="flex items-center justify-center">
                        <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg mr-4">
                          <span className="text-2xl font-bold text-gray-900">30%</span>
                        </div>
                        <span className="text-white text-xl font-medium">/monthly</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6 text-center text-lg">
                    Full optimization for maximum income potential
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Professional photographer setup and staging",
                      "Monthly performance reports and analytics",
                      "Listing optimization every month",
                      "Supplies restocking and inventory management",
                      "Plus everything from Full-Service Package",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="p-1 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mr-3 mt-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-800">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Signup Form */}
            <div>
              <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-blue-600"></div>
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">
                    Get Started Today
                  </CardTitle>
                  <p className="text-gray-700">Fill out the form below and I'll contact you within 24 hours.</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Address *</label>
                      <Input
                        name="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={handleChange}
                        className="border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg focus:outline-none"
                        required
                      >
                        <option value="">Select property type</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Monthly Bookings</label>
                      <Input
                        name="currentBookings"
                        value={formData.currentBookings}
                        onChange={handleChange}
                        placeholder="e.g., 15 nights per month"
                        className="border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Monthly Revenue</label>
                      <Input
                        name="currentRevenue"
                        value={formData.currentRevenue}
                        onChange={handleChange}
                        placeholder="e.g., $3,000 CAD"
                        className="border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Photography Needs</label>
                      <select
                        name="photographyNeeds"
                        value={formData.photographyNeeds}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg focus:outline-none"
                      >
                        <option value="">Select photography needs</option>
                        <option value="full-shoot">Full professional photo shoot</option>
                        <option value="refresh">Photo refresh/update</option>
                        <option value="seasonal">Seasonal updates</option>
                        <option value="not-needed">Not needed currently</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Optimization Goals</label>
                      <Textarea
                        name="optimizationGoals"
                        value={formData.optimizationGoals}
                        onChange={handleChange}
                        placeholder="What are your main goals? (e.g., increase bookings, higher rates, better reviews)"
                        className="border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your property and any specific needs..."
                        className="border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
                        rows={4}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
