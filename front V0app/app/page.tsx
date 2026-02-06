import { Navbar } from "@/components/pet/navbar"
import { Hero } from "@/components/pet/hero"
import { FeaturedPets } from "@/components/pet/featured-pets"
import { HowItWorks } from "@/components/pet/how-it-works"
import { SuccessStories } from "@/components/pet/success-stories"
import { CTABanner } from "@/components/pet/cta-banner"
import { Footer } from "@/components/pet/footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedPets />
      <HowItWorks />
      <SuccessStories />
      <CTABanner />
      <Footer />
    </main>
  )
}
