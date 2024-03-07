import React from 'react';
import { Icon } from '../types';

export default function StatsIcon({ width = 24, height = 24 }: Icon) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='feather feather-activity'>
      <polyline points='22 12 18 12 15 21 9 3 6 12 2 12'></polyline>
    </svg>
  );
}
