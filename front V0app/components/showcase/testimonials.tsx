"use client"

import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "I shipped a complete SaaS dashboard in 20 minutes. My team couldn't believe it wasn't hand-coded.",
    author: "Sarah K.",
    role: "Engineering Lead",
    initials: "SK",
  },
  {
    quote: "Other AI tools give you fragments. v0 gives you a running application. There's no comparison.",
    author: "Marcus T.",
    role: "Indie Hacker",
    initials: "MT",
  },
  {
    quote: "The design quality is what sets v0 apart. It doesn't just work - it looks like a designer touched every pixel.",
    author: "Priya R.",
    role: "Product Designer",
    initials: "PR",
  },
]

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="border-y border-border px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-3 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Builders love v0
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Don&apos;t take our word for it
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`flex flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <p className="mb-8 text-base leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-secondary">
                  <AvatarFallback className="bg-secondary text-sm text-foreground">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
