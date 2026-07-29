'use client';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IGear } from '@/types/gear.type'
import { Calendar, Check, Package, Star } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  gear: IGear;
}
const OrderAction = ({ gear }: Props) => {

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [quantity, setQuantity] = useState(1)



  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const totalDays = calculateTotalDays()
  const totalPrice = totalDays * gear?.pricePerDay * quantity



  const handleBooking = () => {
    if (!startDate || !endDate || quantity < 1) {
      alert('Please select dates and quantity')
      return
    }
    // In production, navigate to booking/checkout page with params
    console.log('Booking:', { gearId: gear.id, startDate, endDate, quantity, totalPrice })
  }
  return (
    <>
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-bold text-primary">${gear?.pricePerDay}</span>
          <span className="text-sm text-muted-foreground">/day</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(1)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-muted-foreground'
                  }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{2.5}</span>
          <span className="text-xs text-muted-foreground">({4} reviews)</span>
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
              max={gear?.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="text-center"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.min(gear?.stock, quantity + 1))}
            >
              +
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{gear?.stock} available</p>
        </div>

        {/* Price Breakdown */}
        {totalDays > 0 && (
          <div className="space-y-2 rounded-lg bg-primary/10 p-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {totalDays} day{totalDays !== 1 ? 's' : ''} × {quantity} item{quantity !== 1 ? 's' : ''}
              </span>
              <span className="font-medium">${totalDays * gear?.pricePerDay * quantity}</span>
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
    </>
  )
}

export default OrderAction