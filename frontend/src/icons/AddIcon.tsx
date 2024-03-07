import React from 'react';
import { Icon } from '../types';

export default function AddIcon({ width = 24, height = 24 }: Icon) {
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
      className='feather feather-plus-circle'>
      <circle cx='12' cy='12' r='10'></circle>
      <line x1='12' y1='8' x2='12' y2='16'></line>
      <line x1='8' y1='12' x2='16' y2='12'></line>
    </svg>
  );
}
