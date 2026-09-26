import { Truck, Gift, MessagesSquare, Sparkles, ShieldCheck } from 'lucide-react'
import Reveal from './Reveal'

const services = [
  {
    icon: Truck,
    title: 'Complimentary Shipping',
    text: 'Insured, signature-required delivery on every order, anywhere in the world.',
  },
  {
    icon: Gift,
    title: 'Signature Gift Wrapping',
    text: 'Each creation is presented in our ivory and gold Maison box, tied with a satin ribbon.',
  },
  {
    icon: MessagesSquare,
    title: 'Personal Consultation',
    text: 'Our client advisors accompany you by appointment, in person or privately online.',
  },
  {
    icon: Sparkles,
    title: 'Jewellery Care',
    text: 'Complimentary cleaning, polishing and re-rhodium for the lifetime of every piece.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    text: 'Protected payment and full certification for every diamond and gemstone.',
  },
]

export default function LuxuryServices() {
  return (
    <section className="services">
      <div className="container">
        <Reveal>
          <div className="section-heading center">
            <span className="section-eyebrow">The Zeyura Experience</span>
            <h2 className="section-title">Services of the Maison</h2>
          </div>
        </Reveal>

        <div className="services-grid">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <div className="service-item">
                <service.icon size={26} strokeWidth={1} className="service-icon" />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
