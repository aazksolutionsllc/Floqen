import React from 'react'
import './CTASection.css'

function CTASection({ onOpenEarlyAccess }) {
  return (
    <section className="cta-section">
      <div className="cta-background">
        <div className="cta-gradient"></div>
      </div>
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Start building secure APIs today</h2>
          <p className="cta-subtitle">Join forward-thinking teams building the next generation of secure APIs</p>
          <div className="cta-buttons">
            <button className="cta-button-primary" onClick={() => onOpenEarlyAccess?.()}>Get Early Access</button>
            <button className="cta-button-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection

