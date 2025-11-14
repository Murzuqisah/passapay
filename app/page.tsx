'use client'

import {
  Footer,
  Navbar,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  CTASection
} from './components'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  )
}
