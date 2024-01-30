//
import express from 'express'
import spotifyRoutes from './routes/spotify.router'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8888

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/', spotifyRoutes)

app.listen(PORT, () => {
  console.log(`Running server on port http://localhost:${PORT}`)
})

export default app
