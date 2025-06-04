// src/pages/api/save-leaderboard.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, score } = req.body

  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid data' })
  }

  try {
    const { data, error } = await supabase.from('leaderboard').insert([{ name, score }])

    if (error) {
      console.error('Supabase insert error:', error)
      return res.status(500).json({ error: 'Failed to save' })
    }

    return res.status(200).json({ success: true, data })
  } catch (err) {
    return res.status(500).json({ error: 'Unexpected error', details: err })
  }
}
