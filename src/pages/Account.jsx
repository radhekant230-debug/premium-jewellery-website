import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

export default function Account() {
  return (
    <>
      <PageHeader
        eyebrow="Private Client Area"
        title="Your Account"
        text="Client accounts are managed personally by our advisors."
      />
      <section className="section container">
        <div className="empty-state">
          <p>
            Zeyura by Anshika is a demonstration boutique — accounts, authentication and payment are
            intentionally not connected. Our client advisors would be pleased to assist you with
            any enquiry.
          </p>
          <Link to="/contact" className="btn btn-outline btn-margin-top">
            Contact Client Services
          </Link>
        </div>
      </section>
    </>
  )
}
