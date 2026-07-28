import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Star, MapPin, Calendar, ShoppingCart, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredGear = [
    {
      id: 1,
      name: "Canon EOS R5 Camera",
      category: "Photography",
      price: 85,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop",
      provider: "ProGear Rentals",
      availability: "Available",
    },
    {
      id: 2,
      name: "DJI Air 3S Drone",
      category: "Drones",
      price: 65,
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=300&fit=crop",
      provider: "SkyTech Equipment",
      availability: "Available",
    },
    {
      id: 3,
      name: "Sony A7IV Mirrorless",
      category: "Photography",
      price: 75,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1606986628024-a4f65e3a7eca?w=400&h=300&fit=crop",
      provider: "ProGear Rentals",
      availability: "Available",
    },
    {
      id: 4,
      name: "Rode Wireless Mic",
      category: "Audio",
      price: 35,
      rating: 4.6,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=300&fit=crop",
      provider: "AudioPro Solutions",
      availability: "Available",
    },
    {
      id: 5,
      name: "GoPro Hero 12",
      category: "Action Camera",
      price: 45,
      rating: 4.8,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop",
      provider: "Adventure Gear",
      availability: "Available",
    },
    {
      id: 6,
      name: "Manfrotto Tripod Pro",
      category: "Accessories",
      price: 25,
      rating: 4.5,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1606986628011-d0a32c1c4ffb?w=400&h=300&fit=crop",
      provider: "ProGear Rentals",
      availability: "Available",
    },
  ]

  const categories = [
    { name: "Photography", count: 24 },
    { name: "Video", count: 18 },
    { name: "Audio", count: 12 },
    { name: "Drones", count: 8 },
    { name: "Camping", count: 16 },
    { name: "Sports", count: 14 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold">GR</span>
              </div>
              <span className="text-xl font-bold">GearRent</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Rent Professional Gear, Build Amazing Experiences
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground">
              Access premium photography, video, audio, and outdoor equipment without the investment. Perfect for creators, events, and adventures.
            </p>

            {/* Search Bar */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-2">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search gear (e.g., camera, drone, microphone)..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Button size="lg" className="gap-2">
                Search <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {["Cameras", "Drones", "Microphones", "Tripods"].map((tag) => (
                <button
                  key={tag}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Browse",
                description: "Explore thousands of premium gear from trusted providers",
              },
              {
                step: "2",
                title: "Select Dates",
                description: "Choose your rental period and check availability",
              },
              {
                step: "3",
                title: "Checkout",
                description: "Secure payment with multiple payment options",
              },
              {
                step: "4",
                title: "Enjoy",
                description: "Receive your gear and create amazing content",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Browse by Category</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.name}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="text-left">
                  <p className="font-semibold group-hover:text-primary">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{category.count} items</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gear */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Featured Gear</h2>
              <p className="mt-2 text-muted-foreground">Handpicked equipment for your next project</p>
            </div>
            <Link href="/gear">
              <Button variant="outline" gap-2>
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGear.map((item) => (
              <Link key={item.id} href={`/gear/${item.id}`}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10">
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                      ${item.price}/day
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-primary">{item.category}</p>
                        <h3 className="mt-1 font-semibold leading-tight line-clamp-2">{item.name}</h3>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(item.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium">{item.rating}</span>
                      <span className="text-xs text-muted-foreground">({item.reviews})</span>
                    </div>

                    {/* Provider */}
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.provider}
                    </div>

                    {/* Availability */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex-1 rounded bg-primary/10 py-2 px-3 text-center text-xs font-medium text-primary">
                        {item.availability}
                      </div>
                      <button className="rounded bg-primary p-2 text-primary-foreground transition-transform hover:scale-110">
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
            <h2 className="text-3xl font-bold">Become a Gear Provider</h2>
            <p className="mt-3 text-primary-foreground/90">
              Earn money by sharing your equipment with creators and adventurers in your community.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?role=provider">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2"
                >
                  List Your Gear <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              {
                title: "Product",
                links: ["Browse Gear", "How It Works", "Pricing", "Become a Provider"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Support",
                links: ["Help Center", "Safety", "Terms", "Privacy"],
              },
              {
                title: "Follow",
                links: ["Twitter", "Instagram", "Facebook", "LinkedIn"],
              },
            ].map((column) => (
              <div key={column.title}>
                <h3 className="font-semibold">{column.title}</h3>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 GearRent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
