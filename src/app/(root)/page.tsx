
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Star, MapPin,  ShoppingCart, ArrowRight } from "lucide-react"
import Link from "next/link"
import Categories from "./_components/Categories"
import Gears from "./_components/Gears"

export default function HomePage() {


  return (
    <>
      {/* Navigation */}
  

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-primary/10 via-primary/5 to-background py-20">
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



      {/* Categories */}
            <Categories />

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

         <Gears />
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

     
    </>
  )
}
