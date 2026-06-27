import Navbar from '../../components/public/Navbar'
import Hero from '../../components/public/Hero'
import MarqueeBand from '../../components/public/MarqueeBand'
import About from '../../components/public/About'
import Offers from '../../components/public/Offers'
import Testimonials from '../../components/public/Testimonials'
import Gallery from '../../components/public/Gallery'
import Contact from '../../components/public/Contact'
import Footer from '../../components/public/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MarqueeBand />
      <About />
      <Offers />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </>
  )
}
