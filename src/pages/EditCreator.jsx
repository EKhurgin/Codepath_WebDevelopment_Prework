import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import CreatorForm from '../components/CreatorForm'
import { supabase } from '../client'

function EditCreator({ onRefresh }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  // Load the existing record so the form starts pre-filled.
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

  const handleUpdate = async (values) => {
    setBusy(true)
    setError(null)
    try {
      const { error: dbError } = await supabase
        .from('creators')
        .update(values)
        .eq('id', id)

      if (dbError) throw dbError
      await onRefresh?.()
      navigate(`/creator/${id}`)
    } catch (err) {
      console.error('Failed to update creator:', err)
      setError(err.message ?? 'Could not save your changes.')
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete ${creator?.name}? This can’t be undone.`
    )
    if (!confirmed) return

    setBusy(true)
    try {
      const { error: dbError } = await supabase.from('creators').delete().eq('id', id)
      if (dbError) throw dbError
      await onRefresh?.()
      navigate('/')
    } catch (err) {
      console.error('Failed to delete creator:', err)
      setError(err.message ?? 'Could not delete this creator.')
      setBusy(false)
    }
  }

  if (loading) return <p className="state-msg">Loading…</p>

  if (!creator) {
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

  return (
    <section className="form-page">
      <Link to={`/creator/${id}`} className="back-link">
        ← Back to {creator.name}
      </Link>

      <p className="eyebrow">Editing</p>
      <h1>{creator.name}</h1>

      {error && <p className="state-msg error">{error}</p>}

      <CreatorForm
        initialValues={{
          name: creator.name ?? '',
          url: creator.url ?? '',
          description: creator.description ?? '',
          imageURL: creator.imageURL ?? '',
        }}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
        busy={busy}
      >
        <Link to={`/creator/${id}`} className="ghost-btn">
          Cancel
        </Link>
        <button
          type="button"
          className="danger-btn"
          onClick={handleDelete}
          disabled={busy}
        >
          Delete Creator
        </button>
      </CreatorForm>
    </section>
  )
}

export default EditCreator
