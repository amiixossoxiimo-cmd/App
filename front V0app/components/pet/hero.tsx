import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 md:grid-cols-2 md:py-24 lg:py-32">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-muted-foreground">
              120+ pets waiting for a home
            </span>
          </div>

          <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Every pet deserves a{" "}
            <span className="text-primary">forever home</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            Open your heart and your home. Browse our lovable cats, dogs, and
            other companions ready to become part of your family.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="gap-2">
              <Search className="h-4 w-4" />
              Find Your Pet
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div>
              <p className="text-2xl font-bold text-foreground">2,400+</p>
              <p className="text-sm text-muted-foreground">Pets Adopted</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="text-2xl font-bold text-foreground">98%</p>
              <p className="text-sm text-muted-foreground">Happy Families</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="text-2xl font-bold text-foreground">12+</p>
              <p className="text-sm text-muted-foreground">Years of Care</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/hero-pets.jpg"
              alt="A golden retriever and tabby cat sitting together on a cozy couch"
              width={640}
              height={480}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-card p-4 shadow-lg">
            <p className="text-sm font-semibold text-foreground">Just adopted!</p>
            <p className="text-xs text-muted-foreground">Buddy found his forever family</p>
          </div>
        </div>
      </div>
    </section>
  )
}
