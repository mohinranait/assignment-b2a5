'use client';
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100+', min: 100, max: Infinity },
]
const categories = [
  'All Categories',
  'Photography',
  'Video',
  'Audio',
  'Drones',
  'Accessories',
]

const Sidebars = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState('recommended')
  const [availability, setAvailability] = useState('all')

  const [showFilters, setShowFilters] = useState(false)

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
    <div
      className={`${showFilters ? 'block' : 'hidden'
        } w-full space-y-6 lg:sticky lg:top-20 lg:block lg:h-fit lg:w-64 lg:shrink-0`}
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
  )
}

export default Sidebars