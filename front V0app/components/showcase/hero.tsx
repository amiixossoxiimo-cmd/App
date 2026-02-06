"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const words = ["dashboards", "landing pages", "full-stack apps", "data tables", "auth flows", "APIs"]

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.03] blur-3xl" />

      <div
        className={`relative z-10 flex max-w-4xl flex-col items-center gap-8 text-center transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          This page was built by v0. Right now.
        </div>

        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
          Stop prompting.
          <br />
          <span className="text-muted-foreground">Start shipping.</span>
        </h1>

        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Other AIs give you code snippets. v0 gives you{" "}
          <span className="relative inline-block">
            <span
              key={currentWord}
              className="inline-block animate-fade-up font-medium text-foreground"
            >
              {words[currentWord]}
            </span>
          </span>{" "}
          that actually work, deploy in one click, and look incredible.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="gap-2 px-8 text-base" asChild>
            <a href="https://v0.dev" target="_blank" rel="noopener noreferrer">
              Try v0 now
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent px-8 text-base"
            asChild
          >
            <a href="#proof">See the proof</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-muted-foreground/50 to-transparent" />
      </div>
    </section>
  )
}
