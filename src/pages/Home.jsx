import HeroSection from '../components/HeroSection'
import ProblemSection from '../components/Problems.jsx'
import FAQSection from '../components/FAQSection.jsx'
import FinalCTASection from '../components/FinalCTASection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
    
     <ProblemSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  )
}