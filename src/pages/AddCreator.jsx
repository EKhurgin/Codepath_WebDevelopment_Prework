import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import CreatorForm from '../components/CreatorForm'
import { supabase } from '../client'

function AddCreator({ onRefresh }) {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (values) => {
    setBusy(true)
    setError(null)
    try {
      const { data, error: dbError } = await supabase
        .from('creators')
        .insert([values])
        .select()
        .single()

      if (dbError) throw dbError
      await onRefresh?.()
      navigate(data?.id ? `/creator/${data.id}` : '/')
    } catch (err) {
      console.error('Failed to add creator:', err)
      setError(err.message ?? 'Could not save this creator.')
      setBusy(false)
    }
  }

  return (
    <section className="form-page">
      <Link to="/" className="back-link">
        ← All creators
      </Link>

      <p className="eyebrow">New entry</p>
      <h1>Add a creator</h1>
      <p className="hero-sub">Who else belongs on the roster?</p>

      {error && <p className="state-msg error">{error}</p>}

      <CreatorForm onSubmit={handleSubmit} submitLabel="Add to Roster" busy={busy}>
        <Link to="/" className="ghost-btn">
          Cancel
        </Link>
      </CreatorForm>
    </section>
  )
}

export default AddCreator
