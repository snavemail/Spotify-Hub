import axios from 'axios'
import { getHashParams } from '../utils'
import SpotifyWebApi from 'spotify-web-api-js'

const EXPIRATION_DURATION = 3600 * 1000

const setTokenTimeStamp = () =>
  window.localStorage.setItem('spotify_token_timestamp', String(Date.now()))
const setLocalAccessToken = (accessToken: string) => {
  setTokenTimeStamp()
  window.localStorage.setItem('spotify_access_token', accessToken)
}

const setLocalRefreshToken = (refreshToken: string) => {
  window.localStorage.setItem('spotify_refresh_token', refreshToken)
}

const getTokenTimestamp = () => {
  const timeStamp = window.localStorage.getItem('spotify_token_timestamp')
  return timeStamp ? parseInt(timeStamp) : 0
}

const getLocalAccessToken = () => {
  return window.localStorage.getItem('spotify_access_token')
}

const getLocalRefreshToken = () => {
  return window.localStorage.getItem('spotify_refresh_token')
}

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`,
    )
    const { accessToken } = data
    setLocalAccessToken(accessToken)
    window.location.reload()
    return
  } catch (e) {
    console.error(e)
  }
}

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams()

  if (error) {
    console.error(error)
    refreshAccessToken()
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_DURATION) {
    console.warn('Access token has expired, refreshing...')
    refreshAccessToken()
  }

  const localAccessToken = getLocalAccessToken()

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
    setLocalAccessToken(access_token)
    setLocalRefreshToken(refresh_token)
    return access_token
  }

  return localAccessToken
}

export const token = getAccessToken()

export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp')
  window.localStorage.removeItem('spotify_access_token')
  window.localStorage.removeItem('spotify_refresh_token')
  window.location.reload()
}

// API CALLS
const spotifyApi = new SpotifyWebApi()

export const getUserPlayingTrack = async ({ token }: { token: string }) => {
  spotifyApi.setAccessToken(token)
  const response = await spotifyApi.getMyCurrentPlayingTrack()
  return response.is_playing
}
