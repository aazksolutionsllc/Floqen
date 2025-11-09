import React from 'react'
import './EarlyAccessModal.css'

function EarlyAccessModal({ open, onClose }) {
  const [form, setForm] = React.useState({
    region: 'US5',
    email: '',
    fullName: '',
    company: '',
    phone: '',
  })
  const [errors, setErrors] = React.useState({})
  const [submitting, setSubmitting] = React.useState(false)
  const [submitMessage, setSubmitMessage] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const backdropRef = React.useRef(null)

  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = 'Enter a valid business email'
    if (!form.fullName) next.fullName = 'Full name is required'
    if (!form.company) next.company = 'Company is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function submit(e) {
    e.preventDefault()
    setSubmitMessage('')
    if (!validate()) return
    const FORMSPREE_ID =
      (typeof window !== 'undefined' && window.FLOQEN_FORMSPREE_ID) ||
      import.meta.env.VITE_FORMSPREE_ID ||
      'REPLACE_WITH_FORMSPREE_ID'
    if (!FORMSPREE_ID || FORMSPREE_ID.includes('REPLACE_WITH')) {
      setSubmitMessage('Form endpoint not configured. Add your Formspree ID.')
      return
    }
    const endpoint = `https://formspree.io/f/${FORMSPREE_ID}`
    // For security, do not send plaintext passwords over email
    const payload = {
      region: form.region,
      email: form.email,
      fullName: form.fullName,
      company: form.company,
      phone: form.phone,
      _subject: 'Floqen Early Access Request',
      _format: 'json',
    }
    try {
      setSubmitting(true)
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitting(false)
      setSuccess(true)
      setSubmitMessage('Thank you — the Floqen team will review your request and get back to you shortly.')
    } catch (err) {
      setSubmitting(false)
      setSubmitMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div
      className={`ea-backdrop ${open ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ea-title"
      onMouseDown={(e) => {
        if (e.target === backdropRef.current) onClose?.()
      }}
      ref={backdropRef}
    >
      <div className="ea-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="ea-header">
          <h3 id="ea-title" className="ea-title">Get Early Access</h3>
          <button className="ea-close" aria-label="Close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={submit} className="ea-body">
          <div className="ea-row-full">
            <label className="ea-label">
              Select a Region
            </label>
            <div className="ea-select-wrap">
              <select
                className="ea-select"
                value={form.region}
                onChange={(e) => updateField('region', e.target.value)}
              >
                <option value="US1">United States (US1-East)</option>
                <option value="US3">United States (US3-West)</option>
                <option value="US5">United States (US5-Central)</option>
                <option value="EU1">Europe (EU1)</option>
                <option value="AP1">Japan (AP1)</option>
                <option value="AP2">Australia (AP2)</option>
                <option value="US1-FED">United States (US1-FED) - FedRAMP Moderate Authorized</option>
              </select>
            </div>
          </div>

          <div className="ea-row-full">
            <label className="ea-label">Business Email <span className="ea-required">*</span></label>
            <input
              className="ea-input"
              type="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
            {errors.email && <div className="ea-error">{errors.email}</div>}
          </div>

          <div>
            <label className="ea-label">Full Name <span className="ea-required">*</span></label>
            <input
              className="ea-input"
              type="text"
              placeholder="Jane Doe"
              value={form.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
            />
            {errors.fullName && <div className="ea-error">{errors.fullName}</div>}
          </div>

          <div>
            <label className="ea-label">Company <span className="ea-required">*</span></label>
            <input
              className="ea-input"
              type="text"
              placeholder="Acme Inc."
              value={form.company}
              onChange={(e) => updateField('company', e.target.value)}
            />
            {errors.company && <div className="ea-error">{errors.company}</div>}
          </div>

          <div>
            <label className="ea-label">Phone</label>
            <input
              className="ea-input"
              type="tel"
              placeholder="+1 555 555 5555"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
            />
          </div>

          <div className="ea-actions ea-row-full">
            <button type="button" className="ea-btn ghost" onClick={onClose} disabled={submitting}>{success ? 'Close' : 'Cancel'}</button>
            {!success && (
              <button type="submit" className="ea-btn primary" disabled={submitting}>{submitting ? 'Sending…' : 'Submit'}</button>
            )}
          </div>
          {submitMessage && <div className={`ea-row-full ${success ? 'ea-success' : 'ea-hint'}`} role="status">{submitMessage}</div>}
        </form>
      </div>
    </div>
  )
}

export default EarlyAccessModal


