"use client"

import { useEffect, useRef, useState } from "react"
import {
  Zap,
  Layers,
  Globe,
  Database,
  Paintbrush,
  Terminal,
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant generation",
    description:
      "Describe what you want in plain English. Get a working app in seconds, not hours.",
  },
  {
    icon: Layers,
    title: "Real components",
    description:
      "Built on shadcn/ui and Radix. Accessible, composable, and production-grade from day one.",
  },
  {
    icon: Globe,
    title: "Deploy in one click",
    description:
      "Hit publish and your app is live on Vercel. Custom domains, edge network, zero config.",
  },
  {
    icon: Database,
    title: "Database built in",
    description:
      "Supabase, Neon, Upstash. Real storage, real auth, real APIs. Not localStorage hacks.",
  },
  {
    icon: Paintbrush,
    title: "Pixel-perfect design",
    description:
      "v0 doesn't just code. It designs. Every component is crafted with intention and detail.",
  },
  {
    icon: Terminal,
    title: "Full-stack power",
    description:
      "Server actions, API routes, middleware, auth flows. Not just UI - the whole stack.",
  },
]

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-3 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Capabilities
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Everything you need. Nothing you don&apos;t.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-muted-foreground/30 hover:bg-accent ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-foreground/10">
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
