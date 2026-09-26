import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import EditorialSection from '../components/EditorialSection'
import Reveal from '../components/Reveal'
import Newsletter from '../components/Newsletter'

const values = [
  {
    title: 'The Hand Before the Tool',
    text: 'Every setting is raised by hand under a binocular loupe. Machines assist; they never decide. A single ring may pass eleven pairs of hands before it leaves the atelier.',
  },
  {
    title: 'Stones With a Provenance',
    text: 'Our diamonds and coloured gemstones are sourced through certified, traceable channels, and each stone above one carat travels with its full dossier.',
  },
  {
    title: 'Made to Outlive Us',
    text: 'We design for the next generation. Every Zeyura piece can be cleaned, re-tipped, re-strung and restored in our atelier for as long as it is worn.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="The Maison"
        title="A House of Quiet Light"
        text="Founded in Paris in 1987, Zeyura by Anshika is an independent jewellery house devoted to one pursuit: jewellery that outlives fashion."
      />

      <EditorialSection
        image="/images/editorial-craft.png"
        alt="A master jeweller at work in the Zeyura atelier"
        eyebrow="Since 1987"
        title="From a Single Workbench in Paris"
        text="What began as one goldsmith's bench in the first arrondissement is today a maison of forty artisans — yet the rule of the house has never changed: nothing leaves the atelier that we would not keep ourselves. Our pieces are composed slowly, in small series, and signed discreetly on the inside, where only the wearer knows."
        ctaLabel="Explore Collections"
        ctaTo="/collections"
      />

      <section className="section container">
        <Reveal>
          <div className="section-heading center">
            <span className="section-eyebrow">Our Convictions</span>
            <h2 className="section-title">What We Hold To</h2>
          </div>
        </Reveal>
        <div className="values-grid">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1}>
              <div className="value-item">
                <span className="collection-index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="quote-band">
        <Reveal className="container">
          <blockquote>
            “Jewellery is the only art we wear. It should be worthy of the skin it touches and
            the years it will remember.”
          </blockquote>
          <cite>— Anshika, Founder &amp; Creative Director</cite>
        </Reveal>
      </section>

      <EditorialSection
        image="/images/editorial-muse.png"
        alt="Model wearing Zeyura jewellery"
        eyebrow="Craftsmanship"
        title="One Hundred and Eighty-Two Hours"
        text="A rivière necklace of the Maison demands up to 182 hours: the selection of eighty matched stones, the piercing of each collet, the setting, the polishing, the final inspection beneath five different lights. Patience is our most expensive material — and the only one you can truly see."
        ctaLabel="Meet the Client Advisors"
        ctaTo="/contact"
        align="right"
      />

      <section className="section container careers-band">
        <Reveal className="section-heading center">
          <span className="section-eyebrow">Careers</span>
          <h2 className="section-title">Join the Atelier</h2>
          <p className="section-intro">
            We are always looking for exceptional hands. Write to us at{' '}
            <Link to="/contact" className="link-underline">
              careers@zeyura.example
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <Newsletter />
    </>
  )
}
