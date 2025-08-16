"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("booking_id")
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (bookingId) {
      // Fetch booking details
      fetchBookingDetails(bookingId)
    }
  }, [bookingId])

  const fetchBookingDetails = async (id: string) => {
    try {
      // This would fetch from your API
      // For now, we'll simulate the data
      setTimeout(() => {
        setBookingDetails({
          id,
          propertyName: "Modern Downtown Condo",
          checkIn: "2024-02-15",
          checkOut: "2024-02-18",
          guests: 2,
          total: 847,
          guestEmail: "guest@example.com",
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching booking details:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your booking details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-500 rounded-full">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Booking Confirmed!
            </CardTitle>
            <p className="text-gray-600 mt-2">Thank you for your booking. We're excited to host you!</p>
          </CardHeader>

          {bookingDetails && (
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-bold text-blue-900 mb-4">Booking Details</h3>
                <div className="space-y-2 text-blue-800">
                  <p>
                    <strong>Booking ID:</strong> {bookingDetails.id}
                  </p>
                  <p>
                    <strong>Property:</strong> {bookingDetails.propertyName}
                  </p>
                  <p>
                    <strong>Check-in:</strong> {new Date(bookingDetails.checkIn).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Check-out:</strong> {new Date(bookingDetails.checkOut).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Guests:</strong> {bookingDetails.guests}
                  </p>
                  <p>
                    <strong>Total Paid:</strong>{" "}
                    <span className="text-green-600 font-bold">${bookingDetails.total} CAD</span>
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">What's Next?</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Confirmation email sent to {bookingDetails.guestEmail}</li>
                  <li>• Check-in instructions will be sent 24 hours before arrival</li>
                  <li>• Our team will contact you if any additional information is needed</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link href="/">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Home className="h-4 w-4 mr-2" />
                    Return to Home
                  </Button>
                </Link>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
                    onClick={() => window.print()}
                  >
                    Print Confirmation
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                    onClick={() => window.open("mailto:Attia.alaa777@gmail.com?subject=Booking Support")}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Need help or have questions?</p>
                <div className="flex justify-center space-x-4">
                  <a href="mailto:Attia.alaa777@gmail.com" className="text-blue-600 hover:text-blue-800">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Us
                  </a>
                  <a href="tel:+14373325714" className="text-blue-600 hover:text-blue-800">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Call Us
                  </a>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
