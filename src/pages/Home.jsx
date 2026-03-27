import HeroSection from '../components/HeroSection'

import FAQSection from '../components/FAQSection.jsx'
import FinalCTASection from '../components/FinalCTASection'
import BenefitsSection from '../components/Benefitssection.jsx'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BenefitsSection/>
      <FAQSection />
      <FinalCTASection />
    </div>
  )
}