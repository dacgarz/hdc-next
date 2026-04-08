'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import styles from './contact.module.css'

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formType, setFormType] = useState('')

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', website: '', servicePackage: '', message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const payload = {
        access_key: 'f9503ab1-7d32-422c-8a02-d5fd920116b9',
        subject: "New Contact Page Submission - Honeyfoot Digital Co.",
        from_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        servicePackage: formData.servicePackage,
        message: formData.message,
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({ firstName: '', lastName: '', email: '', phone: '', website: '', servicePackage: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openModal = (type) => { setFormType(type); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setFormType('') }

  return (
    <div className={styles.page}>
      <Header onOpenModal={openModal} />
      <ContactModal isOpen={modalOpen} onClose={closeModal} formType={formType} />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            Let&apos;s Build Something Together
          </div>
          <h1>Ready to <em>Start</em> Your<br />Next Project?</h1>
          <p>Tell us about what you&apos;re building. We respond within one business day — usually faster.</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className={styles.main}>
        <div className={styles.grid}>

          {/* LEFT — INFO PANEL */}
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <div className={styles.infoHeader}>
                <div className={styles.infoTag}>Contact Info</div>
                <h2>We&apos;d Love to<br /><span>Hear From You</span></h2>
                <p>Whether you need a brand new site, want to revamp what you have, or just want expert advice — we&apos;re here.</p>
              </div>

              <div className={styles.channels}>
                <a href="tel:3057070889" className={styles.channel}>
                  <div className={styles.channelIcon}>
                    <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div className={styles.channelText}>
                    <div className={styles.channelLabel}>Call Us Directly</div>
                    <div className={styles.channelValue}>(305) 707-0889</div>
                  </div>
                  <svg className={styles.channelArrow} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>

                <a href="mailto:hello@honeyfootco.com" className={styles.channel}>
                  <div className={styles.channelIcon}>
                    <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div className={styles.channelText}>
                    <div className={styles.channelLabel}>Send an Email</div>
                    <div className={styles.channelValue}>hello@honeyfootco.com</div>
                  </div>
                  <svg className={styles.channelArrow} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>

                <div className={styles.channel} style={{ cursor: 'default' }}>
                  <div className={styles.channelIcon}>
                    <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div className={styles.channelText}>
                    <div className={styles.channelLabel}>Our Office</div>
                    <div className={styles.channelValue}>Hollywood, FL 33020</div>
                  </div>
                </div>

                <div className={styles.channel} style={{ cursor: 'default' }}>
                  <div className={styles.channelIcon}>
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div className={styles.channelText}>
                    <div className={styles.channelLabel}>Business Hours</div>
                    <div className={styles.channelValue}>Mon – Fri, 9am – 6pm EST</div>
                  </div>
                </div>
              </div>

              <div className={styles.testimonial}>
                <div className={styles.stars}>★★★★★</div>
                <p>&ldquo;HoneyFoot Digital Co. excels at turning your website dreams into reality. Professional, detail-oriented, and prompt delivery.&rdquo;</p>
                <div className={styles.testimonialAuthor}>— Happy Client, Chicago</div>
              </div>

              <div className={styles.responseTime}>
                <div className={styles.rtDot} />
                <span>Typically respond within <strong>2–4 hours</strong> on business days</span>
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className={styles.formWrap}>
            {submitStatus === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We&apos;ll get back to you within one business day.</p>
                <button className={styles.sendAnother} onClick={() => setSubmitStatus(null)}>Send Another Message</button>
              </div>
            ) : (
              <>
                <div className={styles.formHeader}>
                  <h3>Send Us a Message</h3>
                  <p>Fill out the form below and we&apos;ll get back to you shortly.</p>
                </div>

                {submitStatus === 'error' && (
                  <div className={styles.errorBanner}>
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  <div className={styles.row}>
                    <div className={`${styles.field} ${focusedField === 'firstName' ? styles.focused : ''} ${formData.firstName ? styles.filled : ''}`}>
                      <label htmlFor="firstName">First Name <span>*</span></label>
                      <input
                        type="text" id="firstName" name="firstName"
                        value={formData.firstName} onChange={handleChange}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                    </div>
                    <div className={`${styles.field} ${focusedField === 'lastName' ? styles.focused : ''} ${formData.lastName ? styles.filled : ''}`}>
                      <label htmlFor="lastName">Last Name <span>*</span></label>
                      <input
                        type="text" id="lastName" name="lastName"
                        value={formData.lastName} onChange={handleChange}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                    </div>
                  </div>

                  <div className={`${styles.field} ${focusedField === 'email' ? styles.focused : ''} ${formData.email ? styles.filled : ''}`}>
                    <label htmlFor="email">Email Address <span>*</span></label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>

                  <div className={styles.row}>
                    <div className={`${styles.field} ${focusedField === 'phone' ? styles.focused : ''} ${formData.phone ? styles.filled : ''}`}>
                      <label htmlFor="phone">Phone Number <span>*</span></label>
                      <input
                        type="tel" id="phone" name="phone"
                        value={formData.phone} onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                    </div>
                    <div className={`${styles.field} ${focusedField === 'website' ? styles.focused : ''} ${formData.website ? styles.filled : ''}`}>
                      <label htmlFor="website">Current Website</label>
                      <input
                        type="url" id="website" name="website"
                        value={formData.website} onChange={handleChange}
                        onFocus={() => setFocusedField('website')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="https://"
                      />
                    </div>
                  </div>

                  <div className={`${styles.field} ${focusedField === 'servicePackage' ? styles.focused : ''} ${formData.servicePackage ? styles.filled : ''}`}>
                    <label htmlFor="servicePackage">How Can We Help? <span>*</span></label>
                    <select
                      id="servicePackage" name="servicePackage"
                      value={formData.servicePackage} onChange={handleChange}
                      onFocus={() => setFocusedField('servicePackage')}
                      onBlur={() => setFocusedField(null)}
                      required
                    >
                      <option value="">Select a service...</option>
                      <option value="Web Design & Development">Web Design &amp; Development</option>
                      <option value="SEO & Content Strategy">SEO &amp; Content Strategy</option>
                      <option value="Website Maintenance">Website Maintenance</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Strategic Consultation">Strategic Consultation</option>
                      <option value="Not Sure">Not Sure Yet</option>
                    </select>
                    <div className={styles.selectArrow}>
                      <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>

                  <div className={`${styles.field} ${focusedField === 'message' ? styles.focused : ''} ${formData.message ? styles.filled : ''}`}>
                    <label htmlFor="message">Tell Us About Your Project <span>*</span></label>
                    <textarea
                      id="message" name="message"
                      value={formData.message} onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows="5"
                      required
                    />
                    <div className={styles.charCount}>{formData.message.length} / 1000</div>
                  </div>

                  <button type="submit" className={styles.submit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><div className={styles.spinner} /> Sending...</>
                    ) : (
                      <>Send Message <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></>
                    )}
                  </button>

                  <p className={styles.disclaimer}>
                    No spam, ever. Your info stays with us and is only used to respond to your inquiry.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
