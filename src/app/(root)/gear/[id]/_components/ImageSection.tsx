'use client';
import { IGear } from '@/types/gear.type';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  gear: IGear
}
const ImageSection = ({gear}:Props) => {
  //   const images = gear.images && gear.images.length > 0 ? gear.images : [
  //   'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=500&fit=crop'
  // ]


    const images = gear?.images || [];
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
     {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={images[currentImageIndex]}
                alt={gear?.title}
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
                    {currentImageIndex + 1} / {images?.length}
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
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
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
            </>
  )
}

export default ImageSection