import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const secret = req.query.secret

  if (secret !== 'admin123') {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const filePath = path.resolve('./data/leaderboard.json')

  try {
    fs.writeFileSync(filePath, '[]')
    return res.status(200).json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: 'Error resetting leaderboard' })
  }
}
