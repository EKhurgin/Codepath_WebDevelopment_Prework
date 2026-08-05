import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="empty-state">
      <h2>404 — Missed the lift</h2>
      <p>That page isn’t on the roster.</p>
      <Link to="/" className="accent-btn">
        Back to the roster
      </Link>
    </section>
  )
}

export default NotFound
