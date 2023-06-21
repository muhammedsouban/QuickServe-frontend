import React from 'react';
import { Link } from 'react-router-dom';
// import { StarIcon, HeartIcon } from '@heroicons/react/solid';
import BASE_URL from '../../../config/config';

const MyCard = ({ data }) => {
  return (
    <>
      <div className='flex space-x-10 mt-24 justify-center'>
        <h1 className='text-2xl font-semibold'>{data?.title}</h1>
      </div>
      <div className="flex space-x-10 mt-6 justify-center">
        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-5 sm:grid-cols-1'>
          {data?.images.length > 0 ? (
            data.images.map((service) => (
            <Link to={'/services'}>  <div className="w-72 bg-white shadow-lg rounded-lg overflow-hidden" key={service._id}>
                <img
                  src={`${BASE_URL}/public/images/${service.image}`}
                  alt="Service"
                  className="w-full h-full object-contain"
                />
              </div></Link>
            ))
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default MyCard;
