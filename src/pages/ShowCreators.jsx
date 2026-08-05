import { Link } from 'react-router-dom'

import Card from '../components/Card'
import SetupNotice from '../components/SetupNotice'

function ShowCreators({ creators, loading, error }) {
  if (error === 'missing-config') return <SetupNotice />

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Five people worth following</p>
        <h1>
          Built <span className="accent">rep</span> by rep.
        </h1>
        <p className="hero-sub">
          A hand-picked index of lifters, champions, and coaches who actually teach
          something. Add your own, edit the roster, cut the dead weight.
        </p>
      </section>

      {loading && <p className="state-msg">Loading the roster…</p>}

      {!loading && error && (
        <p className="state-msg error">Couldn’t load creators: {error}</p>
      )}

      {!loading && !error && creators.length === 0 && (
        <section className="empty-state">
          <h2>The rack is empty</h2>
          <p>No content creators yet. Add the first one to get started.</p>
          <Link to="/new" className="accent-btn">
            + Add Creator
          </Link>
        </section>
      )}

      {!loading && !error && creators.length > 0 && (
        <>
          <div className="section-head">
            <h2>The Roster</h2>
            <span className="count-pill">{creators.length}</span>
          </div>
          <div className="card-grid">
            {creators.map((creator) => (
              <Card key={creator.id} creator={creator} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default ShowCreators
