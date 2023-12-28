import axios from 'axios'
import { getHashParams } from '../utils'
import { LikedTrackInterface } from '../types'

const EXPIRATION_DURATION = 3540 * 1000
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
      `http://localhost:8888/refresh_token?refresh_token=${getLocalRefreshToken()}`,
    )
    const { access_token } = data
    setLocalAccessToken(access_token)
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
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
}

export const getProfile = async () => {
  const res = await axios.get('https://api.spotify.com/v1/me', { headers })
  return res
}

// Will get top 50 or 100 top songs (will try for 100)
export const getTopItems = async (
  limit: number,
  offset: number,
  timeFrame: string,
  item: string,
) => {
  const res = await axios.get(`https://api.spotify.com/v1/me/top/${item}/`, {
    params: {
      limit: limit,
      offset: offset,
      time_range: timeFrame,
    },
    headers,
  })
  return res
}

export const getPlaylists = async (limit: number, offset: number) => {
  const res = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
    params: {
      limit: limit,
      offset: offset,
    },
    headers,
  })
  return res
}

export const createPlaylist = async (
  userID: string,
  name: string,
  description: string = '',
  isPublic: boolean = true,
) => {
  const res = await axios.post(`https://api.spotify.com/v1/users/${userID}/playlists`, {
    headers,
    data: {
      name: name,
      description: description,
      public: isPublic,
    },
  })
  return res
}

/**
 *
 * @param playlistID playlist to add the song to
 * @param trackIDs list of ids to add to track
 * @returns snapshot id, but just use this to check for error
 */
export const addTrackToPlaylist = async (playlistID: string, trackIDs: string[]) => {
  const res = await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
    {
      headers,
      data: {
        uris: trackIDs,
        position: 0,
      },
    },
  )
  return res
}

/**
 * Gets me saved tracks
 * @param limit num of songs
 * @param offset where it starts
 * @returns added_at, track
 */
export const getSavedTracks = async (limit: number, offset: number) => {
  try {
    const res = await axios.get(`https://api.spotify.com/v1/me/tracks?`, {
      headers,
      params: {
        limit: limit,
        offset: offset,
      },
    })
    return res.data.items
  } catch (error) {
    console.error('Error getting saved tracks', error)
    return []
  }
}

export const getSavedTracksByDate = async (month: number, year: number) => {
  try {
    const limit = 50
    let offset = 0
    let allTracks: LikedTrackInterface[] = []
    do {
      const tracks = await getSavedTracks(limit, offset)
      allTracks = [...allTracks, ...tracks]
      offset += 50
    } while (
      allTracks.length > 0 &&
      keepGoing(allTracks[allTracks.length - 1], month, year)
    )
    const filteredTracks = filterTracksByDate(allTracks, month, year)

    return filteredTracks
  } catch (error) {
    console.error(`Error getting saved tracks for ${month}, ${year}`)
    return []
  }
}

const keepGoing = (
  track: LikedTrackInterface,
  targetMonth: number,
  targetYear: number,
): boolean => {
  const addedDate = new Date(track.added_at)
  return (
    (addedDate.getMonth() + 1 >= targetMonth &&
      addedDate.getFullYear() === targetYear) ||
    addedDate.getFullYear() > targetYear ||
    (addedDate.getMonth() + 1 === targetMonth && addedDate.getFullYear() === targetYear)
  )
}

const isWithinDateRange = (
  track: LikedTrackInterface,
  targetMonth: number,
  targetYear: number,
): boolean => {
  const addedDate = new Date(track.added_at)
  return (
    addedDate.getMonth() + 1 === targetMonth && addedDate.getFullYear() === targetYear
  )
}

const filterTracksByDate = (
  tracks: LikedTrackInterface[],
  targetMonth: number,
  targetYear: number,
): LikedTrackInterface[] => {
  return tracks.filter((track) => isWithinDateRange(track, targetMonth, targetYear))
}

export const getUserInfo = async () => {
  axios.all([getProfile()]).then(
    axios.spread((user) => ({
      user: user ? user.data : null,
    })),
  )
}
