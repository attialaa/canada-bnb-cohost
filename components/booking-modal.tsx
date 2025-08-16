"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Users, CreditCard, CheckCircle, MapPin, Star, Bed, Bath, Clock, Shield, Mail } from "lucide-react"
import { calculateNights, calculateTotalPrice, formatDate } from "@/lib/booking-utils"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Property {
  id: number
  name: string
  location: string
  images: string[]
  bedrooms: number
  bathrooms: number
  guests: number
  pricePerNight: number
  rating: number
  totalReviews: number
  amenities: string[]
}

interface BookingModalProps {
  property: Property | null
  isOpen: boolean
  onClose: () => void
}

interface BookingForm {
  checkIn: string
  checkOut: string
  guests: number
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests: string
}

export default function BookingModal({ property, isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1) // 1: Dates & Guests, 2: Guest Info, 3: Payment, 4: Confirmation
  const [isLoading, setIsLoading] = useState(false)
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    checkIn: "",
    checkOut: "",
    guests: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const [priceBreakdown, setPriceBreakdown] = useState({
    subtotal: 0,
    cleaningFee: 0,
    serviceFee: 0,
    taxes: 0,
    total: 0,
  })

  const [bookingConfirmation, setBookingConfirmation] = useState<{
    id: string
    checkIn: string
    checkOut: string
    guests: number
    total: number
  } | null>(null)

  // Calculate price when dates or guests change
  useEffect(() => {
    if (property && bookingForm.checkIn && bookingForm.checkOut) {
      const checkInDate = new Date(bookingForm.checkIn)
      const checkOutDate = new Date(bookingForm.checkOut)
      const nights = calculateNights(checkInDate, checkOutDate)

      if (nights > 0) {
        const breakdown = calculateTotalPrice(property.pricePerNight, nights, bookingForm.guests)
        setPriceBreakdown(breakdown)
      }
    }
  }, [property, bookingForm.checkIn, bookingForm.checkOut, bookingForm.guests])

  const handleInputChange = (field: keyof BookingForm, value: string | number) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handlePayment = async () => {
    if (!property) return

    setIsLoading(true)

    try {
      // Create payment intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: priceBreakdown.total,
          propertyId: property.id,
          bookingDetails: bookingForm,
        }),
      })

      const { clientSecret, bookingId } = await response.json()

      const stripe = await stripePromise
      if (!stripe) throw new Error("Stripe failed to load")

      // Redirect to Stripe Checkout or use Elements
      const { error } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/booking-success?booking_id=${bookingId}`,
        },
      })

      if (error) {
        console.error("Payment failed:", error)
      } else {
        // Payment succeeded
        setBookingConfirmation({
          id: bookingId,
          checkIn: bookingForm.checkIn,
          checkOut: bookingForm.checkOut,
          guests: bookingForm.guests,
          total: priceBreakdown.total,
        })
        setStep(4)
      }
    } catch (error) {
      console.error("Booking error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetModal = () => {
    setStep(1)
    setBookingForm({
      checkIn: "",
      checkOut: "",
      guests: 1,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
    })
    setPriceBreakdown({
      subtotal: 0,
      cleaningFee: 0,
      serviceFee: 0,
      taxes: 0,
      total: 0,
    })
    setBookingConfirmation(null)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  if (!property) return null

  const nights =
    bookingForm.checkIn && bookingForm.checkOut
      ? calculateNights(new Date(bookingForm.checkIn), new Date(bookingForm.checkOut))
      : 0

  const minDate = new Date().toISOString().split("T")[0]
  const minCheckOut = bookingForm.checkIn
    ? new Date(new Date(bookingForm.checkIn).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    : minDate

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {step === 4 ? "Booking Confirmed!" : `Book ${property.name}`}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Summary */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.name}
                    className="w-24 h-24 rounded-xl object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{property.location}</span>
                    </div>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Bed className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{property.bedrooms} bed</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bath className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{property.bathrooms} bath</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{property.guests} guests</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{property.rating}</span>
                      <span className="text-gray-600">({property.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Breakdown */}
            {nights > 0 && (
              <Card className="bg-white border-2 border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">Price Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>
                      ${property.pricePerNight} × {nights} nights
                    </span>
                    <span>${priceBreakdown.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>${priceBreakdown.cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${priceBreakdown.serviceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (HST)</span>
                    <span>${priceBreakdown.taxes}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-green-600">${priceBreakdown.total}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            {step === 1 && (
              <Card className="bg-white border-2 border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>Select Dates & Guests</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkIn">Check-in</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        min={minDate}
                        value={bookingForm.checkIn}
                        onChange={(e) => handleInputChange("checkIn", e.target.value)}
                        className="border-2 border-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out</Label>
                      <Input
                        id="checkOut"
                        type="date"
                        min={minCheckOut}
                        value={bookingForm.checkOut}
                        onChange={(e) => handleInputChange("checkOut", e.target.value)}
                        className="border-2 border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <select
                      id="guests"
                      value={bookingForm.guests}
                      onChange={(e) => handleInputChange("guests", Number.parseInt(e.target.value))}
                      className="w-full px-3 py-2 border-2 border-blue-200 focus:border-blue-500 rounded-md"
                    >
                      {Array.from({ length: property.guests }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  {nights > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 font-medium">
                        {nights} {nights === 1 ? "night" : "nights"} • {bookingForm.guests}{" "}
                        {bookingForm.guests === 1 ? "guest" : "guests"}
                      </p>
                      <p className="text-sm text-blue-600">
                        {formatDate(new Date(bookingForm.checkIn))} - {formatDate(new Date(bookingForm.checkOut))}
                      </p>
                    </div>
                  )}
                  <Button
                    onClick={handleNextStep}
                    disabled={!bookingForm.checkIn || !bookingForm.checkOut || nights <= 0}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="bg-white border-2 border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>Guest Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={bookingForm.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="border-2 border-blue-200 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={bookingForm.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="border-2 border-blue-200 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                    <Textarea
                      id="specialRequests"
                      value={bookingForm.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      placeholder="Any special requests or notes for your stay..."
                      className="border-2 border-blue-200 focus:border-blue-500"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      onClick={handlePrevStep}
                      variant="outline"
                      className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={
                        !bookingForm.firstName || !bookingForm.lastName || !bookingForm.email || !bookingForm.phone
                      }
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="bg-white border-2 border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <span>Payment & Confirmation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Booking Summary</h4>
                    <div className="space-y-1 text-sm text-blue-800">
                      <p>
                        <strong>Guest:</strong> {bookingForm.firstName} {bookingForm.lastName}
                      </p>
                      <p>
                        <strong>Dates:</strong> {formatDate(new Date(bookingForm.checkIn))} -{" "}
                        {formatDate(new Date(bookingForm.checkOut))}
                      </p>
                      <p>
                        <strong>Guests:</strong> {bookingForm.guests}
                      </p>
                      <p>
                        <strong>Total:</strong>{" "}
                        <span className="text-lg font-bold text-green-600">${priceBreakdown.total}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-semibold mb-1">Secure Payment</p>
                        <p>
                          Your payment is processed securely through Stripe. Your card information is never stored on
                          our servers.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Cancellation Policy:</strong> Free cancellation up to 48 hours before check-in.
                    </p>
                    <p>
                      <strong>House Rules:</strong> No smoking, no pets, quiet hours 10 PM - 8 AM.
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={handlePrevStep}
                      variant="outline"
                      className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePayment}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      {isLoading ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay ${priceBreakdown.total}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 4 && bookingConfirmation && (
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-green-500 rounded-full">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-green-800">Booking Confirmed!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold text-gray-900 mb-2">Booking ID: {bookingConfirmation.id}</p>
                    <div className="space-y-1 text-gray-700">
                      <p>
                        <strong>Property:</strong> {property.name}
                      </p>
                      <p>
                        <strong>Dates:</strong> {formatDate(new Date(bookingConfirmation.checkIn))} -{" "}
                        {formatDate(new Date(bookingConfirmation.checkOut))}
                      </p>
                      <p>
                        <strong>Guests:</strong> {bookingConfirmation.guests}
                      </p>
                      <p>
                        <strong>Total Paid:</strong>{" "}
                        <span className="text-green-600 font-bold">${bookingConfirmation.total}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">What's Next?</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      A confirmation email has been sent to {bookingForm.email}. You'll receive check-in instructions 24
                      hours before your arrival.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleClose}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      Close
                    </Button>
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
                        onClick={() => window.print()}
                      >
                        Print Confirmation
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                        onClick={() =>
                          window.open(`mailto:${bookingForm.email}?subject=Booking Confirmation - ${property.name}`)
                        }
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
