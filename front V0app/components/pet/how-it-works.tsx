import { Search, FileText, Home, Heart } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Browse Pets",
    description:
      "Search through our database of lovable animals. Filter by species, breed, age, and location to find your perfect match.",
  },
  {
    icon: FileText,
    title: "Apply to Adopt",
    description:
      "Fill out a simple application form. Our team will review it and reach out within 48 hours to discuss the next steps.",
  },
  {
    icon: Home,
    title: "Home Visit",
    description:
      "We schedule a friendly home visit to make sure your space is a safe and loving environment for your new family member.",
  },
  {
    icon: Heart,
    title: "Welcome Home",
    description:
      "Complete the adoption, and take your new best friend home. We provide ongoing support for a smooth transition.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Simple Process
          </p>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl text-balance">
            How adoption works
          </h2>
          <p className="max-w-xl text-muted-foreground leading-relaxed">
            We have made the adoption process simple, transparent, and joyful.
            Here is how you can bring a new friend home.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-px w-full bg-border lg:block" />
              )}
              <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <step.icon className="h-6 w-6" />
              </div>
              <span className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                Step {i + 1}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
