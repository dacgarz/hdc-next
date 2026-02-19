'use client'

import { useState } from 'react'
import './ContactModal.css'

export default function ContactModal({ isOpen, onClose, formType }) {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', website: '', servicePackage: '', message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const formPayload = {
        access_key: 'f9503ab1-7d32-422c-8a02-d5fd920116b9',
        subject: `New ${formType} Submission - Honeyfoot Digital Co.`,
        from_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        formType,
      }

      if (formType === 'Get An Assessment' || formType === "Let's Collaborate") {
        formPayload.website = formData.website
      }
      if (formType === "Let's Collaborate") {
        formPayload.servicePackage = formData.servicePackage
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPayload),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({ firstName: '', lastName: '', email: '', phone: '', website: '', servicePackage: '', message: '' })
        setTimeout(() => { onClose(); setSubmitStatus(null) }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const getFormTitle = () => {
    switch (formType) {
      case 'Get An Assessment': return 'Get Your Free Assessment'
      case 'Get In Touch': return 'Get In Touch With Us'
      case "Let's Collaborate": return "Let's Work Together"
      default: return 'Contact Us'
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">{getFormTitle()}</h2>

        {submitStatus === 'success' && <div className="success-message">✓ Thank you! We&apos;ll get back to you soon.</div>}
        {submitStatus === 'error' && <div className="error-message">✗ Something went wrong. Please try again.</div>}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          {(formType === 'Get An Assessment' || formType === "Let's Collaborate") && (
            <div className="form-group">
              <label htmlFor="website">Website URL *</label>
              <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} placeholder="https://" required />
            </div>
          )}

          {formType === "Let's Collaborate" && (
            <div className="form-group">
              <label htmlFor="servicePackage">Service Package *</label>
              <select id="servicePackage" name="servicePackage" value={formData.servicePackage} onChange={handleChange} required>
                <option value="">Select a service...</option>
                <option value="Web Design">Web Design</option>
                <option value="Web Development">Web Development</option>
                <option value="Hosting & Maintenance">Hosting & Maintenance</option>
                <option value="Full Package">Full Package</option>
                <option value="Custom Solution">Custom Solution</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="2" required></textarea>
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
