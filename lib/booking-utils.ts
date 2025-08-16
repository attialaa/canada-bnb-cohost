export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  const timeDiff = checkOut.getTime() - checkIn.getTime()
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

export const calculateTotalPrice = (
  pricePerNight: number,
  nights: number,
  guests: number,
): {
  subtotal: number
  cleaningFee: number
  serviceFee: number
  taxes: number
  total: number
} => {
  const subtotal = pricePerNight * nights
  const cleaningFee = guests <= 2 ? 75 : guests <= 4 ? 100 : 125
  const serviceFee = Math.round(subtotal * 0.12) // 12% service fee
  const taxes = Math.round((subtotal + cleaningFee + serviceFee) * 0.13) // 13% HST
  const total = subtotal + cleaningFee + serviceFee + taxes

  return {
    subtotal,
    cleaningFee,
    serviceFee,
    taxes,
    total,
  }
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-CA", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export const isDateAvailable = (date: Date, bookedDates: Date[]): boolean => {
  return !bookedDates.some((bookedDate) => bookedDate.toDateString() === date.toDateString())
}
