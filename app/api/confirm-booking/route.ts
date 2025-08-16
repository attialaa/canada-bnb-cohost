import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json()

    // Retrieve payment intent to get booking details
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === "succeeded") {
      const bookingData = {
        bookingId: paymentIntent.metadata.bookingId,
        propertyId: paymentIntent.metadata.propertyId,
        guestName: paymentIntent.metadata.guestName,
        guestEmail: paymentIntent.metadata.guestEmail,
        checkIn: paymentIntent.metadata.checkIn,
        checkOut: paymentIntent.metadata.checkOut,
        guests: Number.parseInt(paymentIntent.metadata.guests),
        amount: paymentIntent.amount / 100, // Convert from cents
        status: "confirmed",
        createdAt: new Date().toISOString(),
      }

      // Here you would save to your database
      console.log("Booking confirmed:", bookingData)

      // Send confirmation email (you would implement this)
      await sendConfirmationEmail(bookingData)

      return NextResponse.json({
        success: true,
        booking: bookingData,
      })
    } else {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error confirming booking:", error)
    return NextResponse.json({ error: "Failed to confirm booking" }, { status: 500 })
  }
}

async function sendConfirmationEmail(bookingData: any) {
  // Implement email sending logic here
  // You could use services like SendGrid, Resend, or Nodemailer
  console.log("Sending confirmation email to:", bookingData.guestEmail)

  // Example email content
  const emailContent = `
    Dear ${bookingData.guestName},
    
    Your booking has been confirmed!
    
    Booking Details:
    - Booking ID: ${bookingData.bookingId}
    - Check-in: ${bookingData.checkIn}
    - Check-out: ${bookingData.checkOut}
    - Guests: ${bookingData.guests}
    - Total: $${bookingData.amount} CAD
    
    We'll send you check-in instructions 24 hours before your arrival.
    
    Best regards,
    Canada BnB Co-Host Team
  `

  // Here you would actually send the email
  return true
}
