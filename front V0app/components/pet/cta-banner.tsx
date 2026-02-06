import { Button } from "@/components/ui/button"
import { Heart, ArrowRight } from "lucide-react"

export function CTABanner() {
  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/20">
          <Heart className="h-6 w-6 text-primary-foreground" fill="currentColor" />
        </div>
        <h2 className="font-serif text-3xl text-primary-foreground md:text-4xl lg:text-5xl text-balance">
          Ready to change a life?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80 leading-relaxed">
          Thousands of loving animals are waiting for someone like you. Start
          your adoption journey today and give a pet their forever home.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            variant="secondary"
            className="gap-2 text-foreground"
          >
            Browse All Pets
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  )
}
