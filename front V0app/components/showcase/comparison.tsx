"use client"

import { useEffect, useRef, useState } from "react"
import { Check, X } from "lucide-react"

const comparisons = [
  {
    feature: "Production-ready code",
    v0: true,
    others: false,
    detail: "Full apps with routing, state, and styling",
  },
  {
    feature: "One-click deploy",
    v0: true,
    others: false,
    detail: "Deploy to Vercel directly from the editor",
  },
  {
    feature: "Real database integrations",
    v0: true,
    others: false,
    detail: "Supabase, Neon, Upstash built in",
  },
  {
    feature: "Component library included",
    v0: true,
    others: false,
    detail: "shadcn/ui, Radix, Tailwind CSS out of the box",
  },
  {
    feature: "Live preview",
    v0: true,
    others: false,
    detail: "See your app running as it's built",
  },
  {
    feature: "Iterative editing",
    v0: true,
    others: false,
    detail: "Refine with natural language, not copy-paste",
  },
]

export function Comparison() {
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
    <section id="proof" ref={ref} className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-3 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            The difference
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Not all AI is created equal
          </h2>
        </div>

        <div
          className={`overflow-hidden rounded-2xl border border-border bg-card transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Header */}
          <div className="grid grid-cols-[1fr_100px_100px] items-center border-b border-border px-6 py-4 md:grid-cols-[1fr_140px_140px]">
            <span className="text-sm font-medium text-muted-foreground">Feature</span>
            <span className="text-center text-sm font-bold text-foreground">v0</span>
            <span className="text-center text-sm font-medium text-muted-foreground">Others</span>
          </div>

          {/* Rows */}
          {comparisons.map((item, i) => (
            <div
              key={item.feature}
              className={`grid grid-cols-[1fr_100px_100px] items-center border-b border-border/50 px-6 py-5 transition-all duration-500 last:border-b-0 md:grid-cols-[1fr_140px_140px] ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div>
                <p className="font-medium text-foreground">{item.feature}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.detail}</p>
              </div>
              <div className="flex justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15">
                  <Check className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                  <X className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
