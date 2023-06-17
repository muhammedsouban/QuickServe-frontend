import React from 'react';
import { Link } from 'react-router-dom'
import BASE_URL from '../../../config/config';
function Advt({ data }) {
  return (
    <div className='flex justify-center mt-20'>
         <div className='w-[64%] h-[150px] flex items-center'>
      <Link to={'/services'}>
        <img
          src={`${BASE_URL}/public/images/${data.image}`}
          className='object-contain w-full h-full'
          alt='advt'
        />
      </Link>
      </div>
    </div>
  );
}

export default Advt;
