import axios from 'axios';
import { LikedTrackInterface, PlaylistInterface } from '../types';
import { token } from './auth';

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
};

export const getProfile = async () => {
  const res = await axios.get('https://api.spotify.com/v1/me', { headers });
  console.log(res.data);
  return res;
};
