import React, { useState, useEffect } from 'react';
import { token } from './spotify';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Loading from './pages/Loading';

function App() {
  const [accessToken, setAccessToken] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setAccessToken(token);
    window.location.hash = '';
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return accessToken ? <Profile /> : <Login />;
}

export default App;
