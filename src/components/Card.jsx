import { useState } from 'react'
import { Link } from 'react-router-dom'

// Turns "David Laid" into "DL" for the fallback tile.
function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

// Strips protocol / trailing slash so the link reads cleanly on the card.
function prettyUrl(url = '') {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function Card({ creator }) {
  const { id, name, url, description, imageURL } = creator
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(imageURL) && !imageFailed

  return (
    <article className="creator-card">
      <Link to={`/creator/${id}`} className="card-media" aria-label={`View ${name}`}>
        {showImage ? (
          <img src={imageURL} alt={name} loading="lazy" onError={() => setImageFailed(true)} />
        ) : (
          <span className="card-monogram" aria-hidden="true">
            {initials(name)}
          </span>
        )}
        <span className="card-media-scrim" />
      </Link>

      <div className="card-body">
        <h2 className="card-name">
          <Link to={`/creator/${id}`}>{name}</Link>
        </h2>

        <p className="card-description">{description}</p>

        <a
          className="card-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="card-link-icon" aria-hidden="true">
            ↗
          </span>
          {prettyUrl(url)}
        </a>

        <div className="card-actions">
          <Link to={`/creator/${id}`} className="ghost-btn">
            View
          </Link>
          <Link to={`/edit/${id}`} className="ghost-btn">
            Edit
          </Link>
        </div>
      </div>
    </article>
  )
}

export default Card
