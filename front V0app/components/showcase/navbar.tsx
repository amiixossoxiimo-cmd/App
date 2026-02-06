"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground"
          aria-hidden="true"
        >
          <path
            d="M12 2L2 19.5H22L12 2Z"
            fill="currentColor"
          />
        </svg>
        <span className="text-lg font-bold tracking-tight text-foreground">v0</span>
      </div>

      <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
        <a href="#proof" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          Why v0
        </a>
        <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          Features
        </a>
      </nav>

      <Button size="sm" className="gap-1.5" asChild>
        <a href="https://v0.dev" target="_blank" rel="noopener noreferrer">
          Get started
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </Button>
    </header>
  )
}
