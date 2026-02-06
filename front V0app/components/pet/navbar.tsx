"use client"

import { useState } from "react"
import { Heart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="text-xl font-bold text-foreground">
            FurEver Home
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          <a
            href="#pets"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Adopt
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </a>
          <a
            href="#stories"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Success Stories
          </a>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About Us
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" size="sm">
            Volunteer
          </Button>
          <Button size="sm">Donate</Button>
        </div>

        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            <a href="#pets" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>
              Adopt
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>
              How It Works
            </a>
            <a href="#stories" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>
              Success Stories
            </a>
            <a href="#" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>
              About Us
            </a>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                Volunteer
              </Button>
              <Button size="sm" className="flex-1">
                Donate
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
