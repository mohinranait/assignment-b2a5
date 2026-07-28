'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Star, MapPin, User, Calendar, Package, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Sample data structure matching the API response
const sampleGear = {
  id: '46c91945-24ab-4481-b547-00477ef3b69c',
  providerId: '15ccc0ab-425c-42b7-b341-08a2f3890b5a',
  categoryId: 'de7818ee-c8c3-44de-a464-210d3a542e78',
  title: 'Canon EOS R5 Camera',
  brand: 'Canon',
  description: 'Professional mirrorless camera perfect for photography and videography. Features 45MP full-frame sensor, advanced autofocus, and 8K video recording capabilities.',
  pricePerDay: 85,
  stock: 50,
  images: [
    'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=500&fit=crop',
    'https://images.unsplash.com/photo-1606986628024-a4f65e3a7eca?w=600&h=500&fit=crop',
    'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=500&fit=crop',
  ],
  status: true,
  createdAt: '2026-07-07T16:58:16.710Z',
  updatedAt: '2026-07-07T16:58:16.710Z',
  category: {
    id: 'de7818ee-c8c3-44de-a464-210d3a542e78',
    name: 'Photography',
    description: 'Professional photography equipment',
  },
  provider: {
    id: '15ccc0ab-425c-42b7-b341-08a2f3890b5a',
    name: 'ProGear Rentals',
    email: 'contact@progear.com',
    role: 'Provider',
    status: 'activate',
    phone: '+1-800-123-4567',
    address: 'New York, NY',
    createdAt: '2026-07-07T16:57:10.822Z',
    updatedAt: '2026-07-07T16:57:10.822Z',
  },
  rating: 4.8,
  reviews: 156,
}

export default function GearDetailsPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [quantity, setQuantity] = useState(1)

  const gear = sampleGear // In production, fetch from API using params.id

  const images = gear.images && gear.images.length > 0 ? gear.images : [
    'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=500&fit=crop'
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const totalDays = calculateTotalDays()
  const totalPrice = totalDays * gear.pricePerDay * quantity

  const handleBooking = () => {
    if (!startDate || !endDate || quantity < 1) {
      alert('Please select dates and quantity')
      return
    }
    // In production, navigate to booking/checkout page with params
    console.log('Booking:', { gearId: gear.id, startDate, endDate, quantity, totalPrice })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/gear" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-5 w-5" />
              <span>Back to Gear</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={images[currentImageIndex]}
                alt={gear.title}
                className="h-full w-full object-cover"
              />
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur transition-all hover:bg-background"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur transition-all hover:bg-background"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      idx === currentImageIndex
                        ? 'border-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Details Section */}
            <div className="space-y-6 pt-4">
              {/* Specifications */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Specifications & Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <p className="font-semibold">{gear.category.name}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Brand</p>
                    <p className="font-semibold">{gear.brand}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Stock Available</p>
                    <p className="font-semibold">{gear.stock} items</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Price Per Day</p>
                    <p className="font-semibold text-lg text-primary">${gear.pricePerDay}</p>
                  </Card>
                </div>
              </div>

              {/* Description */}
              {gear.description && (
                <div>
                  <h2 className="text-xl font-bold mb-3">About This Gear</h2>
                  <p className="text-muted-foreground leading-relaxed">{gear.description}</p>
                </div>
              )}

              {/* Features */}
              <div>
                <h2 className="text-xl font-bold mb-3">Key Features</h2>
                <ul className="space-y-2">
                  {[
                    '45MP Full-Frame Sensor',
                    '8K Video Recording',
                    'Advanced Autofocus System',
                    'Professional Weather Sealing',
                    'Fast Prime Lenses Compatible',
                    'Includes Extra Battery & Memory Card',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div>
            <Card className="sticky top-24 p-6">
              {/* Price & Rating */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-bold text-primary">${gear.pricePerDay}</span>
                  <span className="text-sm text-muted-foreground">/day</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(gear.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{gear.rating}</span>
                  <span className="text-xs text-muted-foreground">({gear.reviews} reviews)</span>
                </div>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                {/* Start Date */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="pl-9"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="text-sm font-medium mb-2 block">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="pl-9"
                      min={startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      −
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      max={gear.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-center"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(gear.stock, quantity + 1))}
                    >
                      +
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{gear.stock} available</p>
                </div>

                {/* Price Breakdown */}
                {totalDays > 0 && (
                  <div className="space-y-2 rounded-lg bg-primary/10 p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {totalDays} day{totalDays !== 1 ? 's' : ''} × {quantity} item{quantity !== 1 ? 's' : ''}
                      </span>
                      <span className="font-medium">${totalDays * gear.pricePerDay * quantity}</span>
                    </div>
                  </div>
                )}

                {/* Booking Button */}
                <Button
                  onClick={handleBooking}
                  disabled={!startDate || !endDate}
                  className="w-full mt-2"
                  size="lg"
                >
                  <Package className="h-4 w-4 mr-2" />
                  {totalDays > 0 ? `Book Now - $${totalPrice}` : 'Select Dates'}
                </Button>

                {/* Availability Status */}
                <div className="flex items-center gap-2 p-2 rounded bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm">
                  <Check className="h-4 w-4" />
                  In Stock - Ready to Rent
                </div>
              </div>

              {/* Provider Info */}
              <div className="mt-6 border-t border-border pt-6">
                <h3 className="text-sm font-semibold mb-4">Provider Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{gear.provider.name}</p>
                      <p className="text-xs text-muted-foreground">{gear.provider.role}</p>
                    </div>
                  </div>

                  {gear.provider.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{gear.provider.address}</p>
                    </div>
                  )}

                  {gear.provider.phone && (
                    <div className="text-sm">
                      <p className="font-medium mb-1">Contact</p>
                      <a
                        href={`tel:${gear.provider.phone}`}
                        className="text-primary hover:underline text-sm"
                      >
                        {gear.provider.phone}
                      </a>
                    </div>
                  )}

                  <Link href={`/provider/${gear.provider.id}`}>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View Provider Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Similar Gear Section */}
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl font-bold mb-8">Similar Gear</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Link key={item} href={`/gear/${item}`}>
                <Card className="overflow-hidden group hover:shadow-lg transition-shadow h-full">
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop&rand=${item}`}
                      alt="Similar gear"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium text-primary mb-1">Photography</p>
                    <h3 className="font-semibold line-clamp-2 mb-2">Professional Camera Equipment</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">${50 + item * 5}/day</span>
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
