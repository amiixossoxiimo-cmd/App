import Image from "next/image"
import { Star } from "lucide-react"

const stories = [
  {
    name: "Sarah M.",
    pet: "Adopted Buddy",
    quote:
      "Buddy has completely changed our lives. He greets us every morning with the biggest tail wag. I cannot imagine our family without him.",
    rating: 5,
  },
  {
    name: "James L.",
    pet: "Adopted Whiskers",
    quote:
      "We were nervous about adopting a cat for the first time, but the team at FurEver Home guided us every step. Whiskers is now the king of our apartment.",
    rating: 5,
  },
  {
    name: "Emily R.",
    pet: "Adopted Coco",
    quote:
      "The process was so smooth and the home visit was really friendly. Coco settled in right away. She is my best friend now, and I feel like I was the one who got rescued.",
    rating: 5,
  },
]

export function SuccessStories() {
  return (
    <section id="stories" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="/images/success-story.jpg"
                alt="Happy owner hugging their adopted golden retriever in a sunny backyard"
                width={600}
                height={450}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-card p-5 shadow-lg">
              <p className="text-3xl font-bold text-foreground">2,400+</p>
              <p className="text-sm text-muted-foreground">Happy Adoptions</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Happy Tails
            </p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl text-balance">
              Stories that warm the heart
            </h2>

            <div className="flex flex-col gap-6">
              {stories.map((story) => (
                <div
                  key={story.name}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: story.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-card-foreground">
                    {`"${story.quote}"`}
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">
                      {story.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {story.pet}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
