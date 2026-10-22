import { SiteHeader } from '@/components/landing/SiteHeader'
import { Hero } from '@/components/landing/Hero'
import { LiveCheck } from '@/components/landing/LiveCheck'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { States } from '@/components/landing/States'
import { Providers } from '@/components/landing/Providers'
import { Pricing } from '@/components/landing/Pricing'
import { Faq } from '@/components/landing/Faq'
import { Closing } from '@/components/landing/Closing'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="bg-ink text-paper">
      <SiteHeader />
      <main>
        <Hero />
        <LiveCheck />
        <HowItWorks />
        <States />
        <Providers />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}
