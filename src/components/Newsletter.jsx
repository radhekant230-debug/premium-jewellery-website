import { useState } from 'react'
import Reveal from './Reveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
  }

  return (
    <section className="newsletter">
      <Reveal className="newsletter-inner">
        <span className="section-eyebrow light">Enter Our World</span>
        <h2 className="section-title light">A Correspondence of Rare Beauty</h2>
        <p className="newsletter-text">
          Discover new collections, stories, and exceptional creations — a letter from the
          Maison, sent with care and never too often.
        </p>

        {subscribed ? (
          <p className="newsletter-thanks">Welcome. You will hear from us soon.</p>
        ) : (
          <form className="newsletter-form" onSubmit={submit}>
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" className="btn btn-light">
              Subscribe
            </button>
          </form>
        )}
      </Reveal>
    </section>
  )
}
