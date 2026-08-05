function SetupNotice() {
  return (
    <section className="setup-notice">
      <h2>Connect your database</h2>
      <p>
        Creatorverse is running, but it can’t see Supabase yet. Three steps and the
        rack is loaded:
      </p>
      <ol>
        <li>
          Create a Supabase project, then run <code>supabase/schema.sql</code> in the
          SQL Editor to build the <code>creators</code> table and seed it.
        </li>
        <li>
          Copy <code>.env.example</code> to <code>.env</code> and paste in your Project
          URL and anon key.
        </li>
        <li>
          Restart the dev server (<code>npm run dev</code>) so Vite picks up the new
          environment variables.
        </li>
      </ol>
    </section>
  )
}

export default SetupNotice
