import React from 'react'
import './Hero.css'

function Hero({ onOpenEarlyAccess }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">Where APIs are born secure</h1>
            <p className="hero-subtext tagline">Design → Publish Securely → Test → Subscribe → Consume</p>
            <p className="hero-subtext">Floqen unifies the entire API lifecycle into a single AI-driven platform.</p>
            <div className="hero-ctas">
              <button className="cta-primary" onClick={() => onOpenEarlyAccess?.()}>Get Early Access</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="data-stream">
              <div className="stream-line"></div>
              <div className="stream-line delay-1"></div>
              <div className="stream-line delay-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

