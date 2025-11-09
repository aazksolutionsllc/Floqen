import React from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProblemSolution from './components/ProblemSolution'
import Lifecycle from './components/Lifecycle'
import Integrations from './components/Integrations'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import EarlyAccessModal from './components/EarlyAccessModal'
import './App.css'

function App() {
  const [eaOpen, setEaOpen] = React.useState(false)

  function openEA() { setEaOpen(true) }
  function closeEA() { setEaOpen(false) }

  return (
    <div className="App">
      <Nav onOpenEarlyAccess={openEA} />
      <Hero onOpenEarlyAccess={openEA} />
      <ProblemSolution />
      <Lifecycle />
      <Integrations />
      <CTASection onOpenEarlyAccess={openEA} />
      <Footer />
      <EarlyAccessModal open={eaOpen} onClose={closeEA} />
    </div>
  )
}

export default App

