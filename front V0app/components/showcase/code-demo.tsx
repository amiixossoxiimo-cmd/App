"use client"

import { useEffect, useRef, useState } from "react"

const conversation = [
  {
    role: "user" as const,
    content: "Build me a dashboard with a sidebar and data table",
  },
  {
    role: "v0" as const,
    content: "Done. Your dashboard includes a collapsible sidebar with navigation, stat cards, a searchable/sortable users table with pagination, role badges, and a dark mode toggle. It's ready to deploy.",
  },
]

const codeLines = [
  { text: "import { SidebarProvider } from '@/components/ui/sidebar'", color: "text-muted-foreground" },
  { text: "import { AppSidebar } from '@/components/app-sidebar'", color: "text-muted-foreground" },
  { text: "import { UsersTable } from '@/components/users-table'", color: "text-muted-foreground" },
  { text: "", color: "" },
  { text: "export default function Page() {", color: "text-foreground" },
  { text: "  return (", color: "text-foreground" },
  { text: "    <SidebarProvider>", color: "text-emerald-400" },
  { text: "      <AppSidebar />", color: "text-emerald-400" },
  { text: "      <main className=\"flex-1 p-6\">", color: "text-emerald-400" },
  { text: "        <UsersTable />", color: "text-emerald-400" },
  { text: "      </main>", color: "text-emerald-400" },
  { text: "    </SidebarProvider>", color: "text-emerald-400" },
  { text: "  )", color: "text-foreground" },
  { text: "}", color: "text-foreground" },
]

export function CodeDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)

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

  useEffect(() => {
    if (!isVisible) return
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(timer)
          return prev
        }
        return prev + 1
      })
    }, 80)
    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section ref={ref} className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-3 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            How it works
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            You describe it. v0 builds it.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Chat side */}
          <div
            className={`flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <span className="ml-2 text-xs text-muted-foreground">v0.dev</span>
            </div>

            {conversation.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-foreground text-background"
                      : "border border-border bg-secondary text-foreground"
                  }`}
                >
                  {msg.role === "v0" && (
                    <span className="mb-1 block text-xs font-medium text-muted-foreground">v0</span>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}

            <div className="mt-auto rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
              Ask v0 anything...
            </div>
          </div>

          {/* Code side */}
          <div
            className={`overflow-hidden rounded-2xl border border-border bg-card transition-all duration-700 delay-400 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <span className="ml-2 text-xs text-muted-foreground">page.tsx</span>
            </div>
            <div className="p-6 font-mono text-sm">
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  className={`transition-all duration-300 ${
                    i < visibleLines ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  <span className="mr-4 inline-block w-6 text-right text-muted-foreground/40">
                    {i + 1}
                  </span>
                  <span className={line.color}>{line.text}</span>
                </div>
              ))}
              {visibleLines < codeLines.length && (
                <span className="ml-10 inline-block h-5 w-2 animate-pulse bg-foreground" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
