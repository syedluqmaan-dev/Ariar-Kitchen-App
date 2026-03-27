import HeroSection from '../components/HeroSection'

import FAQSection from '../components/FAQSection.jsx'
import FinalCTASection from '../components/FinalCTASection'
import Product from '../components/Product.jsx'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Product/>
      <FAQSection />
      <FinalCTASection />
    </div>
  )
}