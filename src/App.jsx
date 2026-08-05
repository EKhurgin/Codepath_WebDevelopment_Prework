import { useCallback, useEffect, useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'

import { supabase, isSupabaseConfigured } from './client'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'
import NotFound from './pages/NotFound'

function App() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Read every creator out of the database (async/await).
  const fetchCreators = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      setError('missing-config')
      return
    }

    setLoading(true)
    try {
      const { data, error: dbError } = await supabase
        .from('creators')
        .select('*')
        .order('id', { ascending: true })

      if (dbError) throw dbError
      setCreators(data ?? [])
      setError(null)
    } catch (err) {
      console.error('Failed to fetch creators:', err)
      setError(err.message ?? 'Something went wrong fetching creators.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCreators()
  }, [fetchCreators])

  const routes = useRoutes([
    {
      path: '/',
      element: (
        <ShowCreators
          creators={creators}
          loading={loading}
          error={error}
          onRefresh={fetchCreators}
        />
      ),
    },
    { path: '/creator/:id', element: <ViewCreator onRefresh={fetchCreators} /> },
    { path: '/edit/:id', element: <EditCreator onRefresh={fetchCreators} /> },
    { path: '/new', element: <AddCreator onRefresh={fetchCreators} /> },
    { path: '*', element: <NotFound /> },
  ])

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="shell">
          <Link to="/" className="brand">
            <span className="brand-mark">CV</span>
            <span className="brand-text">
              <strong>Creatorverse</strong>
              <em>The Iron Index</em>
            </span>
          </Link>
          <nav>
            <Link to="/" className="ghost-btn">
              All Creators
            </Link>
            <Link to="/new" className="accent-btn">
              + Add Creator
            </Link>
          </nav>
        </div>
      </header>

      <main className="shell">{routes}</main>

      <footer className="site-footer">
        <div className="shell">
          <span>Creatorverse — CodePath WEB103 Prework</span>
          <span className="footer-rule" />
          <span>Built with React, Vite, Supabase &amp; Pico CSS</span>
        </div>
      </footer>
    </div>
  )
}

export default App
