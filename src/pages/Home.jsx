import HeroSection from '../components/HeroSection'
import ProblemSection from '../components/Problemsection.jsx'
import FAQSection from '../components/Faqsection.jsx'
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