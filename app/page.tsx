"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Package,
  Mail,
  Instagram,
  MapPin,
  CheckCircle,
  Home,
  TrendingUp,
  Shield,
  User,
  Bed,
  Bath,
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
  DollarSign,
  Send,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import BookingModal from "@/components/booking-modal"

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  date: string
}

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

export default function HomePage() {
  const packagesRef = useRef<HTMLElement>(null)
  const higherIncomeRef = useRef<HTMLDivElement>(null)
  const fiveStarRef = useRef<HTMLDivElement>(null)
  const stressFreeRef = useRef<HTMLDivElement>(null)

  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [consultationForm, setConsultationForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmittingConsultation, setIsSubmittingConsultation] = useState(false)
  const [consultationSubmitted, setConsultationSubmitted] = useState(false)

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Alaa transformed my Airbnb income! My bookings increased by 40% in just 2 months. Professional, reliable, and truly cares about your success.",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment:
        "Best decision I made for my rental property. Alaa handles everything professionally and my guests always leave 5-star reviews. Highly recommend!",
      date: "2024-01-10",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 5,
      comment:
        "I was struggling to manage my Airbnb while working full-time. Alaa's full-service package gave me my life back while increasing my revenue. Amazing service!",
      date: "2024-01-05",
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      comment:
        "Professional photography and listing optimization made a huge difference. My property now stands out and books consistently. Worth every penny!",
      date: "2023-12-28",
    },
  ])

  const [properties] = useState<Property[]>([
    {
      id: 1,
      name: "Modern Downtown Condo",
      location: "Toronto, ON",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a480e83c.jpg-zwCXBjXFsazUcqyirTULdZabPEyc5J.avif",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/57ddd0c6.jpg-tr3RmC2dzzxvMFRuWfFGTOEPrqXJwl.avif",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cc54e225.jpg-P5JB8gnldjXa6tIOBEzaJPSM4MtDEu.avif",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/36d2def1.jpg-lGoXTqkzgrjzrDYNuhKCXrfLTFFjko.avif",
      ],
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      pricePerNight: 185,
      rating: 4.9,
      totalReviews: 127,
      amenities: ["WiFi", "Kitchen", "Parking", "AC", "Gym"],
    },
    {
      id: 2,
      name: "Cozy Lakefront Cottage",
      location: "Muskoka, ON",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9fa4b1f1.jpg-4JPlB7ni4ZxNFBAazctU1g4ke80sJq.avif",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/89b2c400.jpg-kaf5DcfbTZ0l7Wc2y60VuOd2tZ9OBx.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/126c253f.jpg-moTBOxz5KVEAim9ZmSRQH5Z18BB15I.webp",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/119fe9fd.jpg-pUsD7RpUjLEljWI8WS4IdApmhj16a3.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/056ea253.jpg-h8asJlpSDKxKzgaEJwqae1tDdDLozQ.avif",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a31f21f5.jpg-7CfhrJKe6eVjBiHgYVuNZ5mb4JC8Xv.jpeg",
      ],
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      pricePerNight: 225,
      rating: 4.8,
      totalReviews: 89,
      amenities: ["Lake Access", "Fireplace", "BBQ", "Kayaks", "WiFi"],
    },
    {
      id: 3,
      name: "Luxury Urban Loft",
      location: "Vancouver, BC",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b3e38a20-7285-4c0f-a2c9-8997087ebc0f.png-iVlxLweb6tQ4EgDruC1BypuGqPLxCh.avif",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1273a9b5-6493-44a8-8409-579505afb3a2.jpeg-XWr3IcPYpKzP1oa6iUl85aF7rgE6hy.avif",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f63dd1e7-1607-48d1-aff9-e5ec1ae1c6f0.jpeg-EZWUxOf0NNMqpJx05PeCEDL6Xov17Z.avif",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/73ea7bfa-19d5-46be-8b4d-3f4440339697.jpeg-CT5beLqvLbio2m51WM3qvjVTTRPBEa.avif",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2739a3bd-c39f-4c7a-b0d7-d01a66e5df09.png-MhU76xRmOavTuya9b8fR80bOtadomK.avif",
      ],
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      pricePerNight: 165,
      rating: 4.9,
      totalReviews: 203,
      amenities: ["City View", "High-end Appliances", "Concierge", "Pool", "Gym"],
    },
    {
      id: 4,
      name: "Mountain Chalet Retreat",
      location: "Whistler, BC",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b2d10d2b.jpg-gOgk57CcCA3t4tLsOxpJgQ5uwl4L54.webp",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aa4e8ed3.jpg-oAo3jb5hfFOHz4K7LC17DrVsgA4kVy.avif",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/220698ab.jpg-dVG23cKyvblcL6A56DVal1fvuta8Lc.webp",
      ],
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      pricePerNight: 295,
      rating: 4.9,
      totalReviews: 156,
      amenities: ["Mountain View", "Hot Tub", "Fireplace", "Ski Storage", "WiFi"],
    },
    {
      id: 5,
      name: "Historic Heritage Home",
      location: "Quebec City, QC",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      pricePerNight: 145,
      rating: 4.7,
      totalReviews: 98,
      amenities: ["Historic Charm", "Garden", "WiFi", "Parking", "Central Location"],
    },
    {
      id: 6,
      name: "Oceanfront Beach House",
      location: "Halifax, NS",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      pricePerNight: 195,
      rating: 4.8,
      totalReviews: 142,
      amenities: ["Ocean View", "Beach Access", "Deck", "BBQ", "WiFi"],
    },
  ])

  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  })
  const [showReviewForm, setShowReviewForm] = useState(false)

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const handleBookProperty = (property: Property) => {
    setSelectedProperty(property)
    setShowBookingModal(true)
  }

  const handleCloseBookingModal = () => {
    setShowBookingModal(false)
    setSelectedProperty(null)
  }

  const scrollToSection = (ref: React.RefObject<HTMLElement | HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingConsultation(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Here you would typically send the email
    console.log("Consultation form submitted:", consultationForm)
    console.log("Email would be sent to: Attia.alaa777@gmail.com")

    setConsultationSubmitted(true)
    setIsSubmittingConsultation(false)
    setShowConsultationForm(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setConsultationSubmitted(false)
      setConsultationForm({ name: "", email: "", phone: "", message: "" })
    }, 3000)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.name && newReview.comment) {
      const review: Review = {
        id: reviews.length + 1,
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
      }
      setReviews([review, ...reviews])
      setNewReview({ name: "", rating: 5, comment: "" })
      setShowReviewForm(false)
    }
  }

  const nextImage = (propertyId: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages,
    }))
  }

  const prevImage = (propertyId: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages,
    }))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
    ))
  }

  const packages = [
    {
      name: "Basic",
      percentage: "15%",
      price: "Monthly",
      description: "Perfect for hands-on owners who want essential support",
      features: ["Guest messaging", "Calendar updates", "Help during emergencies"],
      icon: <MessageCircle className="h-8 w-8" />,
      popular: false,
      signupLink: "/signup/basic",
    },
    {
      name: "Full Service",
      percentage: "25%",
      price: "/monthly",
      description: "Complete management for busy property owners",
      features: [
        "Guest messaging",
        "Calendar updates",
        "Cleaning scheduling",
        "Pricing updates",
        "Reviews",
        "Maintenance help",
      ],
      icon: <Sparkles className="h-8 w-8" />,
      popular: true,
      signupLink: "/signup/full-service",
    },
    {
      name: "Premium",
      percentage: "30%",
      price: "/monthly",
      description: "Full optimization for maximum income potential",
      features: [
        "Professional photographer setup",
        "Monthly performance reports",
        "Listing optimization every month",
        "Supplies restocking",
      ],
      icon: <Star className="h-8 w-8" />,
      popular: false,
      signupLink: "/signup/premium",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-2xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg transform rotate-3">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Canada BnB Co-Host
              </h1>
            </div>
            <Button
              onClick={() => setShowConsultationForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Free Consultation
            </Button>
          </div>
        </div>
      </header>

      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Free Consultation
              </CardTitle>
              <p className="text-gray-600">Tell me about your property and goals</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={consultationForm.name}
                  onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })}
                  required
                  className="border-2 border-blue-200 focus:border-blue-500 rounded-xl"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={consultationForm.email}
                  onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })}
                  required
                  className="border-2 border-blue-200 focus:border-blue-500 rounded-xl"
                />
                <Input
                  type="tel"
                  placeholder="Your Phone"
                  value={consultationForm.phone}
                  onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                  className="border-2 border-blue-200 focus:border-blue-500 rounded-xl"
                />
                <Textarea
                  placeholder="Tell me about your property and goals..."
                  value={consultationForm.message}
                  onChange={(e) => setConsultationForm({ ...consultationForm, message: e.target.value })}
                  required
                  className="border-2 border-blue-200 focus:border-blue-500 rounded-xl"
                  rows={4}
                />
                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    disabled={isSubmittingConsultation}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {isSubmittingConsultation ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Request
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowConsultationForm(false)}
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Consultation Success Message */}
      {consultationSubmitted && (
        <div className="fixed top-20 right-4 bg-green-500 text-white p-4 rounded-xl shadow-2xl z-50 transform animate-pulse">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Consultation request sent! I'll contact you soon.</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 transform -skew-y-1"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center bg-white/80 backdrop-blur-lg rounded-full px-4 py-2 shadow-xl">
              <MapPin className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-600 font-semibold">Based in Canada</span>
            </div>
          </div>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            Boost Your Airbnb Income with
            <span className="block mt-2">Professional Co-Hosting</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            I help property owners earn more income by managing their short-term rentals professionally and stress-free.
            Get 5-star reviews and enjoy passive income without the hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection(packagesRef)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <Package className="h-5 w-5 mr-2" />
              View My Packages
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowConsultationForm(true)}
              className="text-lg px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              DM for Free Consultation
            </Button>
          </div>

          {/* 3D Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div
              ref={higherIncomeRef}
              onClick={() => scrollToSection(higherIncomeRef)}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-white/20 cursor-pointer"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 rounded-2xl shadow-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Higher Income</h3>
              <p className="text-gray-600">Maximize your rental revenue</p>
            </div>

            <div
              ref={fiveStarRef}
              onClick={() => scrollToSection(fiveStarRef)}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-white/20 cursor-pointer"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 rounded-2xl shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                  <Star className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">5-Star Reviews</h3>
              <p className="text-gray-600">Exceptional guest experiences</p>
            </div>

            <div
              ref={stressFreeRef}
              onClick={() => scrollToSection(stressFreeRef)}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-white/20 cursor-pointer"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 rounded-2xl shadow-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Stress-Free</h3>
              <p className="text-gray-600">Complete peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white/50 to-blue-50/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover some of the amazing properties I manage across Canada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card
                key={property.id}
                className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.images[currentImageIndex[property.id] || 0]}
                    alt={property.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-lg rounded-full px-3 py-1 shadow-lg">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{property.rating}</span>
                      <span className="text-xs text-gray-600">({property.totalReviews})</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{property.name}</h3>
                      <p className="text-sm opacity-90">{property.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 p-2"
                        onClick={() => prevImage(property.id, property.images.length)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 p-2"
                        onClick={() => nextImage(property.id, property.images.length)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Bed className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">{property.bedrooms} Bed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">{property.bathrooms} Bath</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">{property.guests} Guests</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">${property.pricePerNight}</span>
                      <span className="text-gray-600">/ night</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Available</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                      >
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="outline" className="border-blue-300 text-blue-600">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                    <Button
                      onClick={() => handleBookProperty(property)}
                      className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Packages Section */}
      <section
        ref={packagesRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 transform skew-y-1"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
              Co-Hosting Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three flexible packages designed to meet your specific needs and maximize your Airbnb success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative bg-white/80 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 overflow-hidden ${
                  pkg.popular ? "ring-2 ring-blue-500 ring-opacity-50" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg text-white">
                      {pkg.icon}
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-6">{pkg.name}</CardTitle>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <ul className="space-y-4 text-left">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="p-1 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mr-3 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Horizontal Layout for Pricing and Button */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    {/* Pricing Badge */}
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 shadow-xl">
                        <div className="flex items-center justify-center">
                          <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg mr-3">
                            <span className="text-xl font-bold text-gray-900">{pkg.percentage}</span>
                          </div>
                          <span className="text-white text-lg font-medium">{pkg.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Sign Up Button */}
                    <div className="flex-1">
                      <Link href={pkg.signupLink}>
                        <Button
                          className={`w-full font-semibold py-3 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                            pkg.popular
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                              : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                          }`}
                        >
                          SIGN UP
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p>
                  Hi, I'm <span className="font-bold text-blue-600">Alaa</span> — a passionate and reliable Airbnb
                  Co-Host based in Canada.
                </p>
                <p>
                  I've helped property owners boost their listing income, get 5-star reviews, and enjoy passive income
                  without stress. I treat every property like it's my own, ensuring your guests have exceptional
                  experiences while maximizing your revenue.
                </p>
                <p>
                  With my comprehensive co-hosting services, you can focus on what matters most while I handle the
                  day-to-day management of your Airbnb property with professionalism and care.
                </p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="space-y-6">
                {[
                  { icon: Star, text: "5-Star Guest Experiences", color: "yellow" },
                  { icon: TrendingUp, text: "Increased Property Income", color: "green" },
                  { icon: Shield, text: "Reliable & Professional Service", color: "blue" },
                  { icon: MapPin, text: "Based in Canada", color: "red" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-2xl shadow-lg ${
                        item.color === "yellow"
                          ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                          : item.color === "green"
                            ? "bg-gradient-to-br from-green-500 to-emerald-600"
                            : item.color === "blue"
                              ? "bg-gradient-to-br from-blue-500 to-purple-600"
                              : "bg-gradient-to-br from-red-500 to-pink-600"
                      }`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-gray-800 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 transform -skew-y-1"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent mb-6">
              What My Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real reviews from property owners who've transformed their Airbnb success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mr-4">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                      <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            {!showReviewForm ? (
              <Button
                onClick={() => setShowReviewForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Star className="h-5 w-5 mr-2" />
                Leave a Review
              </Button>
            ) : (
              <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                    Share Your Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Rating</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="focus:outline-none transform hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`h-10 w-10 ${
                                star <= newReview.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Textarea
                        placeholder="Tell us about your experience..."
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
                        rows={4}
                        required
                      />
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                      >
                        Submit Review
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowReviewForm(false)}
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Boost Your Airbnb Income?</h2>
          <p className="text-xl text-blue-100 mb-12">
            Let's chat about your Airbnb goals and how I can help you achieve them
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="p-4 bg-white/20 rounded-2xl w-fit mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <a
                href="mailto:Attia.alaa777@gmail.com"
                className="text-blue-100 hover:text-white transition-colors font-medium"
              >
                Attia.alaa777@gmail.com
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="p-4 bg-white/20 rounded-2xl w-fit mx-auto mb-4">
                <Instagram className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instagram</h3>
              <a
                href="https://instagram.com/canadabnbcohost"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors font-medium"
              >
                @canadabnbcohost
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="p-4 bg-white/20 rounded-2xl w-fit mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Phone/WhatsApp</h3>
              <a
                href="https://wa.me/14373325714"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors font-medium"
              >
                437-332-5714
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="mailto:Attia.alaa777@gmail.com">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                DM Me for Free Consultation
              </Button>
            </a>
            <a href="tel:+14373325714">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 bg-transparent shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg mr-3">
              <Home className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Canada BnB Co-Host</h3>
          </div>
          <p className="text-gray-400 mb-6">Professional Airbnb Co-Hosting Services in Canada</p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:Attia.alaa777@gmail.com"
              className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <Mail className="h-6 w-6 text-white" />
            </a>
            <a
              href="https://instagram.com/canadabnbcohost"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <Instagram className="h-6 w-6 text-white" />
            </a>
            <a
              href="https://wa.me/14373325714"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <Phone className="h-6 w-6 text-white" />
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400">© 2024 Canada BnB Co-Host. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Booking Modal */}
      <BookingModal property={selectedProperty} isOpen={showBookingModal} onClose={handleCloseBookingModal} />
    </div>
  )
}
