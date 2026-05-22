import Navbar from '../components/layout/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      <Hero />
      <Features />
    </div>
  )
}

export default LandingPage