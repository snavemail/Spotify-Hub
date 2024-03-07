import React from 'react';
import '../css/loading.css';
import VinylIcon from '../icons/VinylIcon';

export default function Loading() {
  return (
    <div className='vinyl-loading-screen'>
      <div className='vinyl-disk'>
        <VinylIcon />
      </div>
    </div>
  );
}
