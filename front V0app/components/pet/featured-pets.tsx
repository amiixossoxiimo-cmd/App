"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const pets = [
  {
    name: "Luna",
    species: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Female",
    location: "Portland, OR",
    image: "/images/pet-luna.jpg",
    tags: ["Friendly", "Trained"],
  },
  {
    name: "Milo",
    species: "Cat",
    breed: "Orange Tabby",
    age: "1 year",
    gender: "Male",
    location: "Seattle, WA",
    image: "/images/pet-milo.jpg",
    tags: ["Playful", "Indoor"],
  },
  {
    name: "Bella",
    species: "Dog",
    breed: "Cavalier King Charles",
    age: "6 months",
    gender: "Female",
    location: "San Francisco, CA",
    image: "/images/pet-bella.jpg",
    tags: ["Puppy", "Gentle"],
  },
  {
    name: "Charlie",
    species: "Dog",
    breed: "Black Labrador",
    age: "3 years",
    gender: "Male",
    location: "Austin, TX",
    image: "/images/pet-charlie.jpg",
    tags: ["Active", "Loyal"],
  },
  {
    name: "Daisy",
    species: "Cat",
    breed: "Russian Blue",
    age: "2 years",
    gender: "Female",
    location: "Denver, CO",
    image: "/images/pet-daisy.jpg",
    tags: ["Calm", "Affectionate"],
  },
  {
    name: "Max",
    species: "Dog",
    breed: "Beagle",
    age: "1 year",
    gender: "Male",
    location: "Chicago, IL",
    image: "/images/pet-max.jpg",
    tags: ["Curious", "Friendly"],
  },
]

type Filter = "All" | "Dogs" | "Cats"

export function FeaturedPets() {
  const [filter, setFilter] = useState<Filter>("All")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const filtered = pets.filter((pet) => {
    if (filter === "Dogs") return pet.species === "Dog"
    if (filter === "Cats") return pet.species === "Cat"
    return true
  })

  const toggleFavorite = (name: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  return (
    <section id="pets" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Meet Our Friends
          </p>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl text-balance">
            Pets looking for a loving home
          </h2>
          <p className="max-w-xl text-muted-foreground leading-relaxed">
            Each of these adorable animals is waiting to meet you. Browse our
            featured pets and find the perfect companion.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {(["All", "Dogs", "Cats"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pet) => (
            <div
              key={pet.name}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pet.image || "/placeholder.svg"}
                  alt={`${pet.name}, a ${pet.breed} available for adoption`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => toggleFavorite(pet.name)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
                  aria-label={`Favorite ${pet.name}`}
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      favorites.has(pet.name)
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {pet.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {pet.breed} &middot; {pet.age} &middot; {pet.gender}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-xs">{pet.location}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {pet.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="mt-1 w-full bg-transparent" variant="outline">
                  Meet {pet.name}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button size="lg" variant="outline" className="gap-2 bg-transparent">
            View All Pets
            <span className="text-muted-foreground">(120+)</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
