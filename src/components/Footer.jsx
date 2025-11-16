import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">VisionAuth</span>
            <p className="footer-tagline">Where APIs are born secure</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
              © 2008-2025 AA & ZK Solutions LLC. All Rights Reserved. Established 2008
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

