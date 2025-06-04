import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })

    if (error) {
      console.error('Supabase fetch error:', error)
      return res.status(500).json({ error: 'Failed to fetch leaderboard' })
    }

    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: 'Unexpected error', details: err })
  }
}
