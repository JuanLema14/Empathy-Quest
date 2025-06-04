import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default async function handler(req, res) {
  const secret = req.query.secret

  if (secret !== 'admin123') {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { error } = await supabase.from('leaderboard').delete()

    if (error) {
      console.error('Supabase delete error:', error)
      return res.status(500).json({ error: 'Error resetting leaderboard' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: 'Unexpected error', details: err })
  }
}
