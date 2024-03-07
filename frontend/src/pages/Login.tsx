import React from 'react';
import '../css/login.css';
import '../global.css';
import StatsIcon from '../icons/StatsIcon';
import MusicIcon from '../icons/MusicIcon';
import AddIcon from '../icons/AddIcon';

export default function Login() {
  const handleLogin = async () => {
    window.location.href = 'http://localhost:8888/login';
  };

  return (
    <div className='login-wrapper'>
      <h1 className='header'>
        <span>Spotify Hub</span>
      </h1>
      <div className='attraction-list'>
        <div className='attraction-item'>
          <StatsIcon />
          <span>Get stats</span>
        </div>
        <div className='attraction-item'>
          <AddIcon />
          <span>Create playlists</span>
        </div>
        <div className='attraction-item'>
          <MusicIcon />
          <span>Discover new songs</span>
        </div>
      </div>

      <div className='button-wrapper'>
        <button className='connect-button' onClick={handleLogin}>
          Connect with Spotify
        </button>
      </div>
    </div>
  );
}
