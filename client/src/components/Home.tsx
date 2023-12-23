import React from 'react'
import { logout, getUserPlayingTrack } from '../spotify'

export default function Home({ token }: { token: string }) {
  return (
    <div style={{ width: '100%', alignItems: 'center' }}>
      <h1>Home Page</h1>
      <p>{token}</p>
      <button onClick={logout}>Logout</button>
      <button onClick={() => getUserPlayingTrack({ token })}>
        Get user Playing track
      </button>
    </div>
  )
}
