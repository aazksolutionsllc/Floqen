import React from 'react'
import './Nav.css'

function Nav({ onOpenEarlyAccess }) {
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  React.useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  React.useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [menuOpen])

  function handleNavClick() {
    setMenuOpen(false)
  }

  return (
    <nav className="nav">
      <div className="nav-container nav-three">
        <div className="nav-left">
          <a href="#platform" className="nav-link">Platform</a>
          <a href="#integrations" className="nav-link">Integrations</a>
        </div>
        <div className="nav-logo">
          <span className="logo-text">FLOQEN</span>
        </div>
        <div className="nav-right">
          <a href="#about" className="nav-link">About</a>
          <button className="nav-button" onClick={() => onOpenEarlyAccess?.()}>Get Early Access</button>
        </div>
        <button
          className="nav-burger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="burger-lines" />
        </button>
      </div>
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobile-inner">
          <div className="mobile-header">
            <span className="logo-text">FLOQEN</span>
            <button
              className="nav-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="mobile-links">
            <a href="#platform" className="nav-link" onClick={handleNavClick}>Platform</a>
            <a href="#integrations" className="nav-link" onClick={handleNavClick}>Integrations</a>
            <a href="#about" className="nav-link" onClick={handleNavClick}>About</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav

