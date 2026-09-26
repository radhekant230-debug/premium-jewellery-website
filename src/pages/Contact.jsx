import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: 'General enquiry', message: '' })

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Client Services"
        title="Contact the Maison"
        text="Our client advisors respond within one business day, in French and English."
      />

      <section className="section container contact-layout">
        <Reveal>
          <div className="contact-info">
            <h2 className="contact-heading">By Appointment</h2>

            <div className="contact-item">
              <MapPin size={19} strokeWidth={1.2} />
              <div>
                <h3>Flagship Boutique</h3>
                <p>
                  14 Rue de la Paix
                  <br />
                  75002 Paris, France
                </p>
              </div>
            </div>

            <div className="contact-item">
              <Phone size={19} strokeWidth={1.2} />
              <div>
                <h3>Telephone</h3>
                <p>+33 1 42 00 00 00</p>
              </div>
            </div>

            <div className="contact-item">
              <Mail size={19} strokeWidth={1.2} />
              <div>
                <h3>Email</h3>
                <p>clients@zeyura.example</p>
              </div>
            </div>

            <div className="contact-item">
              <Clock size={19} strokeWidth={1.2} />
              <div>
                <h3>Opening Hours</h3>
                <p>
                  Monday — Saturday, 10h — 19h
                  <br />
                  Private viewings by appointment
                </p>
              </div>
            </div>

            <div className="contact-care">
              <h3>Care &amp; Services</h3>
              <ul>
                <li>Shipping — complimentary insured delivery worldwide</li>
                <li>Returns — accepted within 30 days, unworn</li>
                <li>Jewellery care — lifetime cleaning &amp; polishing</li>
                <li>FAQ — sizing guides, certification, engraving</li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-sent">
                <span className="section-eyebrow">Thank you</span>
                <h2 className="section-title">Your message has been received</h2>
                <p>
                  A client advisor of the Maison will respond to you shortly. This is a
                  demonstration form — no message was actually sent.
                </p>
                <button className="btn btn-outline btn-margin-top" onClick={() => setSent(false)}>
                  Write Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <h2 className="contact-heading">Write to Us</h2>

                <div className="form-row">
                  <label className="form-field">
                    <span>Name</span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </label>
                  <label className="form-field">
                    <span>Email</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </label>
                </div>

                <label className="form-field">
                  <span>Subject</span>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  >
                    <option>General enquiry</option>
                    <option>Private consultation</option>
                    <option>Bridal appointment</option>
                    <option>Order follow-up</option>
                    <option>Jewellery care</option>
                  </select>
                </label>

                <label className="form-field">
                  <span>Message</span>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How may the Maison assist you?"
                  />
                </label>

                <button type="submit" className="btn btn-dark btn-block">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </>
  )
}
