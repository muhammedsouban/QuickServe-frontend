import React from 'react';
import BASE_URL from '../../config/config';

function Error() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <img
        className='max-w-full max-h-full'
        src={`${BASE_URL}/public/images/404.png`}
        alt=""
      />
    </div>
  );
}

export default Error;
