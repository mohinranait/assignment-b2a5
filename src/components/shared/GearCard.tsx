import Link from 'next/link'
import React from 'react'
import { Card } from '../ui/card'
import { IGear } from '@/types/gear.type'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Button } from '../ui/button'

const GearCard = ({gear}:{gear:IGear}) => {
  return (
     <Link key={gear.id} href={`/gear/${gear.id}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-muted">
                        <img
                          src={gear.images[0]}
                          alt={gear.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {!gear.stock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="font-semibold text-white">Out of Stock</span>
                          </div>
                        )}
                        <div className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                          ${gear.pricePerDay}/day
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          <p className="text-xs font-medium text-primary">{gear.category?.name}</p>
                          <h3 className="mt-1 font-semibold line-clamp-2 leading-tight">{gear.title}</h3>
                        </div>

                        {/* Rating */}
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < Math.floor(3)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-medium">{4.2}</span>
                          <span className="text-xs text-muted-foreground">({3})</span>
                        </div>

                        {/* Provider */}
                        <p className="mt-2 text-xs text-muted-foreground truncate">
                          by {gear?.provider?.name}
                        </p>

                        {/* Stock */}
                        <div className="mt-3 flex items-center justify-between pt-3 border-t border-border">
                          <span className="text-xs text-muted-foreground">
                            {gear.stock} in stock
                          </span>
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
  )
}

export default GearCard