

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, MapPin, User,  Check, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import ImageSection from './_components/ImageSection'
import OrderAction from './_components/OrderAction'
import { apiUrl } from '@/config/accessEnv'

export default async function GearDetailsPage({ params }: { params: Promise< { id: string }> }) {

  const {id} = await params;

  const res = await fetch(`${apiUrl}/gear/${id}`, {
    method: "GET",
  })

  const data = await res.json();



  const gear = data.data; 


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
            <ImageSection gear={gear} />

            {/* Details Section */}
            <div className="space-y-6 pt-4">
              {/* Specifications */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Specifications & Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <p className="font-semibold">{gear?.category?.name}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Brand</p>
                    <p className="font-semibold">{gear?.brand}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Stock Available</p>
                    <p className="font-semibold">{gear?.stock} items</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Price Per Day</p>
                    <p className="font-semibold text-lg text-primary">${gear?.pricePerDay}</p>
                  </Card>
                </div>
              </div>

              {/* Description */}
              {gear?.description && (
                <div>
                  <h2 className="text-xl font-bold mb-3">About This Gear</h2>
                  <p className="text-muted-foreground leading-relaxed">{gear?.description}</p>
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
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
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
              <OrderAction gear={gear} />

              {/* Provider Info */}
              <div className="mt-6 border-t border-border pt-6">
                <h3 className="text-sm font-semibold mb-4">Provider Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{gear?.provider?.name}</p>
                      <p className="text-xs text-muted-foreground">{gear?.provider?.role}</p>
                    </div>
                  </div>

                  {gear?.provider?.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{gear?.provider?.address}</p>
                    </div>
                  )}

                  {gear?.provider.phone && (
                    <div className="text-sm">
                      <p className="font-medium mb-1">Contact</p>
                      <a
                        href={`tel:${gear?.provider?.phone}`}
                        className="text-primary hover:underline text-sm"
                      >
                        {gear?.provider?.phone}
                      </a>
                    </div>
                  )}

                  <Link href={`/provider/${gear?.provider?.id}`}>
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
