import express, { Request, Response } from 'express'
import querystring from 'querystring'
import bodyParser from 'body-parser'
import request from 'request'
import crypto from 'crypto'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI

const generateRandomString = (length: number): string => {
  return crypto.randomBytes(60).toString('hex').slice(0, length)
}

const stateKey = 'spotify_auth_state'

const app = express()

app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))

app.get('/login', (req: Request, res: Response) => {
  console.log('Client ID:', client_id)
  console.log('Redirect URI:', redirect_uri)
  const state = generateRandomString(16)
  res.cookie(stateKey, state)

  // your application requests authorization
  const scope = 'user-read-private user-read-email'
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      }),
  )
})

app.get('/callback', (req: Request, res: Response) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch',
        }),
    )
  } else {
    res.clearCookie(stateKey)
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      json: true,
    }

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token
        const refresh_token = body.refresh_token

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          'http://localhost:3000/' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            }),
        )
      } else {
        res.redirect(
          'http://localhost:3000/' +
            querystring.stringify({
              error: 'invalid_token',
            }),
        )
      }
    })
  }
})

app.get('/refresh_token', (req: Request, res: Response) => {
  const refresh_token = req.query.refresh_token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
    json: true,
  }

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token
      const refresh_token = body.refresh_token
      res.send({
        access_token: access_token,
        refresh_token: refresh_token,
      })
    }
  })
})

const PORT = 8888
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
