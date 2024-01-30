import express, { Router, request } from 'express'

import { loginRoute, callback, refreshToken } from '../controller/spotify.api'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const router = Router()

router
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))

router.get('/login', loginRoute)
router.get('/callback', callback)
router.get('/refresh_token', refreshToken)

export default router
