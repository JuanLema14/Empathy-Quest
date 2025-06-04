import fs from 'fs'
import path from 'path'

export default function handler(req, res) {

  console.log('Received request to save leaderboard:', req.body)
  console.log('Request method:', req.method)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const filePath = path.resolve('./data/leaderboard.json')

  try {
    const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : []
    data.push(req.body)

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return res.status(200).json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: 'Error saving leaderboard' })
  }
}
