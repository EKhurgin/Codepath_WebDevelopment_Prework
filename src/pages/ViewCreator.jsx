import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { supabase } from '../client'

function ViewCreator({ onRefresh }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true)
      try {
        const { data, error: dbError } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single()

        if (dbError) throw dbError
        setCreator(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch creator:', err)
        setError(err.message ?? 'Could not load this creator.')
      } finally {
        setLoading(false)
      }
    }

    fetchCreator()
  }, [id])

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete ${creator?.name}? This can’t be undone.`
    )
    if (!confirmed) return

    setDeleting(true)
    try {
      const { error: dbError } = await supabase.from('creators').delete().eq('id', id)
      if (dbError) throw dbError
      await onRefresh?.()
      navigate('/')
    } catch (err) {
      console.error('Failed to delete creator:', err)
      setError(err.message ?? 'Could not delete this creator.')
      setDeleting(false)
    }
  }

  if (loading) return <p className="state-msg">Loading…</p>

  if (error || !creator) {
    return (
      <section className="empty-state">
        <h2>Creator not found</h2>
        <p>{error ?? 'We couldn’t find anyone at this address.'}</p>
        <Link to="/" className="accent-btn">
          Back to the roster
        </Link>
      </section>
    )
  }

  const showImage = Boolean(creator.imageURL) && !imageFailed

  return (
    <article className="detail">
      <Link to="/" className="back-link">
        ← All creators
      </Link>

      <div className="detail-grid">
        <div className="detail-media">
          {showImage ? (
            <img
              src={creator.imageURL}
              alt={creator.name}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span className="card-monogram large" aria-hidden="true">
              {creator.name
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
                .toUpperCase()}
            </span>
          )}
        </div>

        <div className="detail-body">
          <p className="eyebrow">Creator profile</p>
          <h1>{creator.name}</h1>
          <p className="detail-description">{creator.description}</p>

          <a
            className="detail-link"
            href={creator.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit channel ↗
          </a>

          <div className="detail-actions">
            <Link to={`/edit/${creator.id}`} className="ghost-btn">
              Edit
            </Link>
            <button
              type="button"
              className="danger-btn"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ViewCreator
