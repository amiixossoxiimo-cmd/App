"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: "10x", label: "Faster than hand-coding" },
  { value: "1-click", label: "Deploy to production" },
  { value: "50+", label: "UI components included" },
  { value: "0", label: "Config files to write" },
]

function AnimatedValue({ value, isVisible }: { value: string; isVisible: boolean }) {
  return (
    <span
      className={`text-4xl font-bold tracking-tight text-foreground transition-all duration-700 md:text-5xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {value}
    </span>
  )
}

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="border-y border-border px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-12 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 text-center"
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <AnimatedValue value={stat.value} isVisible={isVisible} />
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
