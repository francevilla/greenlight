import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Testimonial } from '@/components/Testimonial'
import { Pricing } from '@/components/Pricing'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Features />
      <Testimonial />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  )
}
