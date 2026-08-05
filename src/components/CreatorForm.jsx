import { useState } from 'react'

const EMPTY = { name: '', url: '', description: '', imageURL: '' }

/**
 * Shared form for both Add and Edit.
 * `initialValues` seeds the fields, `onSubmit` receives the cleaned creator object.
 */
function CreatorForm({
  initialValues = EMPTY,
  onSubmit,
  submitLabel = 'Save Creator',
  busy = false,
  children,
}) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues })
  const [touched, setTouched] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setTouched(true)

    const cleaned = {
      name: values.name.trim(),
      url: values.url.trim(),
      description: values.description.trim(),
      imageURL: values.imageURL.trim(),
    }

    if (!cleaned.name || !cleaned.url || !cleaned.description) return
    onSubmit(cleaned)
  }

  const missing = (field) => touched && !values[field].trim()

  return (
    <form className="creator-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          type="text"
          placeholder="David Laid"
          value={values.name}
          onChange={handleChange}
          aria-invalid={missing('name') ? 'true' : undefined}
        />
        {missing('name') && <small className="field-error">A name is required.</small>}
      </label>

      <label htmlFor="url">
        Channel URL
        <input
          id="url"
          name="url"
          type="url"
          placeholder="https://www.youtube.com/@DavidLaid"
          value={values.url}
          onChange={handleChange}
          aria-invalid={missing('url') ? 'true' : undefined}
        />
        {missing('url') && <small className="field-error">A link is required.</small>}
      </label>

      <label htmlFor="description">
        Description
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="What makes them worth following?"
          value={values.description}
          onChange={handleChange}
          aria-invalid={missing('description') ? 'true' : undefined}
        />
        {missing('description') && (
          <small className="field-error">A short description is required.</small>
        )}
      </label>

      <label htmlFor="imageURL">
        Image URL <span className="optional-tag">optional</span>
        <input
          id="imageURL"
          name="imageURL"
          type="url"
          placeholder="https://example.com/photo.jpg"
          value={values.imageURL}
          onChange={handleChange}
        />
      </label>

      {values.imageURL.trim() && (
        <div className="form-preview">
          <img src={values.imageURL} alt="Preview" />
          <small>Image preview</small>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="accent-btn" disabled={busy}>
          {busy ? 'Working…' : submitLabel}
        </button>
        {children}
      </div>
    </form>
  )
}

export default CreatorForm
