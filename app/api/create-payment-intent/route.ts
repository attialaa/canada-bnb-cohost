import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { formatAmountForStripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const { amount, propertyId, bookingDetails } = await request.json()

    // Generate unique booking ID
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount),
      currency: "cad",
      metadata: {
        bookingId,
        propertyId: propertyId.toString(),
        guestName: `${bookingDetails.firstName} ${bookingDetails.lastName}`,
        guestEmail: bookingDetails.email,
        checkIn: bookingDetails.checkIn,
        checkOut: bookingDetails.checkOut,
        guests: bookingDetails.guests.toString(),
      },
    })

    // Here you would typically save the booking to your database
    // For now, we'll just log it
    console.log("Booking created:", {
      bookingId,
      propertyId,
      bookingDetails,
      amount,
      paymentIntentId: paymentIntent.id,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      bookingId,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
