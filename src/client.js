import { createClient } from '@supabase/supabase-js'

// Values live in .env (copy .env.example -> .env).
// Supabase dashboard -> Project Settings -> API
const URL = import.meta.env.VITE_SUPABASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// True once both values are present, so the UI can show a friendly
// "connect your database" banner instead of crashing.
export const isSupabaseConfigured = Boolean(URL && API_KEY)

export const supabase = createClient(
  URL || 'https://placeholder.supabase.co',
  API_KEY || 'placeholder-anon-key'
)
