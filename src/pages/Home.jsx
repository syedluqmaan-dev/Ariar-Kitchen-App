import HeroSection from '../components/HeroSection'
import RestaurantInfo from '../components/RestaurantInfo'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <RestaurantInfo />
    </div>
  )
}