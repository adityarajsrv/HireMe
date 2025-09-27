import Choose from "../components/Choose"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import WorkFlow from "../components/WorkFlow"

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <WorkFlow />
      <Choose />
      <Footer />
    </div>
  )
}

export default HomePage