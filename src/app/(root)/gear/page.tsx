'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Star, Search, Filter, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import GearCard from '@/components/shared/GearCard'
import Gears from '../_components/Gears'

const gearData = [
  {
    id: 1,
    name: 'Canon EOS R5 Camera',
    brand: 'Canon',
    category: 'Photography',
    price: 85,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop',
    provider: 'ProGear Rentals',
    availability: true,
    inStock: 50,
  },
  {
    id: 2,
    name: 'DJI Air 3S Drone',
    brand: 'DJI',
    category: 'Drones',
    price: 65,
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=300&fit=crop',
    provider: 'SkyTech Equipment',
    availability: true,
    inStock: 15,
  },
  {
    id: 3,
    name: 'Sony A7IV Mirrorless',
    brand: 'Sony',
    category: 'Photography',
    price: 75,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1606986628024-a4f65e3a7eca?w=400&h=300&fit=crop',
    provider: 'ProGear Rentals',
    availability: true,
    inStock: 8,
  },
  {
    id: 4,
    name: 'Rode Wireless Mic',
    brand: 'Rode',
    category: 'Audio',
    price: 35,
    rating: 4.6,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=300&fit=crop',
    provider: 'AudioPro Solutions',
    availability: true,
    inStock: 25,
  },
  {
    id: 5,
    name: 'GoPro Hero 12',
    brand: 'GoPro',
    category: 'Action Camera',
    price: 45,
    rating: 4.8,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
    provider: 'Adventure Gear',
    availability: true,
    inStock: 18,
  },
  {
    id: 6,
    name: 'Manfrotto Tripod Pro',
    brand: 'Manfrotto',
    category: 'Accessories',
    price: 25,
    rating: 4.5,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1606986628011-d0a32c1c4ffb?w=400&h=300&fit=crop',
    provider: 'ProGear Rentals',
    availability: true,
    inStock: 40,
  },
  {
    id: 7,
    name: 'Nikon Z8 Professional',
    brand: 'Nikon',
    category: 'Photography',
    price: 95,
    rating: 4.9,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1606986627011-d0a32c1c4ffb?w=400&h=300&fit=crop',
    provider: 'ProGear Rentals',
    availability: false,
    inStock: 0,
  },
  {
    id: 8,
    name: 'Shure SM7B Microphone',
    brand: 'Shure',
    category: 'Audio',
    price: 55,
    rating: 4.7,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=300&fit=crop',
    provider: 'AudioPro Solutions',
    availability: true,
    inStock: 12,
  },
]

const categories = [
  'All Categories',
  'Photography',
  'Video',
  'Audio',
  'Drones',
  'Accessories',
]

const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100+', min: 100, max: Infinity },
]

export default function GearListingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState('recommended')
  const [showFilters, setShowFilters] = useState(false)
  const [availability, setAvailability] = useState('all')

  // Filter and sort gear
  let filteredGear = gearData.filter((gear) => {
    const matchesSearch =
      gear.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gear.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gear.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All Categories' || gear.category === selectedCategory

    const matchesPrice =
      gear.price >= selectedPrice.min && gear.price <= selectedPrice.max

    const matchesAvailability =
      availability === 'all' ||
      (availability === 'available' && gear.availability) ||
      (availability === 'unavailable' && !gear.availability)

    return matchesSearch && matchesCategory && matchesPrice && matchesAvailability
  })

  // Sort
  if (sortBy === 'price-low') {
    filteredGear.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredGear.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filteredGear.sort((a, b) => b.rating - a.rating)
  }

  const handleReset = () => {
    setSearchQuery('')
    setSelectedCategory('All Categories')
    setSelectedPrice(priceRanges[0])
    setSortBy('recommended')
    setAvailability('all')
  }

  const isFiltered =
    searchQuery ||
    selectedCategory !== 'All Categories' ||
    selectedPrice !== priceRanges[0] ||
    availability !== 'all'

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <h1 className="text-3xl font-bold">Browse Gear</h1>
          <p className="mt-2 text-muted-foreground">
            Find and rent {filteredGear.length} piece{filteredGear.length !== 1 ? 's' : ''} of equipment
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Filters */}
          <div
            className={`${showFilters ? 'block' : 'hidden'
              } w-full space-y-6 lg:sticky lg:top-20 lg:block lg:h-fit lg:w-64 lg:flex-shrink-0`}
          >
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                {isFiltered && (
                  <button
                    onClick={handleReset}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-sm mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-sm mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          checked={selectedPrice === range}
                          onChange={() => setSelectedPrice(range)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-sm mb-3">Availability</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'All', value: 'all' },
                      { label: 'Available', value: 'available' },
                      { label: 'Out of Stock', value: 'unavailable' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="availability"
                          value={option.value}
                          checked={availability === option.value}
                          onChange={(e) => setAvailability(e.target.value)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowFilters(false)}
              className="w-full lg:hidden"
              variant="outline"
            >
              Close Filters
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search gear by name, brand, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  size="sm"
                  className="gap-2 lg:hidden"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>

                <div className="relative ml-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-9 py-2 border border-border rounded-md bg-background text-sm font-medium cursor-pointer"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {isFiltered && (
              <div className="mb-6 flex flex-wrap gap-2">
                {searchQuery && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm">
                    <span>Search: {searchQuery}</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-muted-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {selectedCategory !== 'All Categories' && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm">
                    <span>{selectedCategory}</span>
                    <button
                      onClick={() => setSelectedCategory('All Categories')}
                      className="hover:text-muted-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {selectedPrice !== priceRanges[0] && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm">
                    <span>{selectedPrice.label}</span>
                    <button
                      onClick={() => setSelectedPrice(priceRanges[0])}
                      className="hover:text-muted-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <Gears className={''} />

            {/* Gear Grid */}
            {/* {filteredGear.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGear.map((gear) => (
                  <GearCard gear={gear} key={gear.id} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-border bg-card p-12 text-center">
                <p className="text-muted-foreground mb-2">No gear found matching your filters</p>
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  size="sm"
                >
                  Clear all filters
                </Button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  )
}
