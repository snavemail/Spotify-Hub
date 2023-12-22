import React from 'react';

const Home: React.FC = () => {
  const handleLogin = async () => {
      window.location.href = 'http://localhost:8888/login';
  };

  return (
    <div>
      <h1>Spotify Login</h1>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
};

export default Home;
