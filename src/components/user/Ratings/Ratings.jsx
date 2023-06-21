import React, { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid';
import { getReviews } from '../../../Api/userAPI';
import moment from 'moment';
import ReactStars from 'react-stars';
import BASE_URL from '../../../config/config';

function Ratings({ serviceId }) {
  const [review, setReview] = useState([])
  useEffect(() => {
    getReviews(serviceId).then((res) => {
      setReview(res.data);
      console.log();
    })
  }, [])

  return (
    <>
      <div className="flex justify-center ">
        <div className="bg-white my-4 rounded-lg overflow-hidden ">
          <div className='lg:w-[930px] md:w-[730px] bg-white '>
            {review.length > 0 &&
              <div className="px-10 bg-white">
                <div className='h-full'>
                  <h1 className='mt-5 md:text-2xl text-xl font-semibold'>Customer Reviews</h1>
                  {review.length > 0 && review.map
                    ((item) => (<div className='review-cards py-5'>
                      <div className='flex items-center '>
                        <div className='h-14 w-14 bg-blue-300 rounded-full'>
                          <img src={`${BASE_URL}/public/images/${item.user.image}`} className='object-cover rounded-full' alt="User" />
                        </div>
                        <h2 className='ml-2 text-md md:text-xl font-medium'>{item.user.username}</h2>
                      </div>
                      <div className='flex mt-2 items-center'>
                        <ReactStars
                          count={5}
                          size={24}
                          color2={'#ffd700'}
                          edit={false}
                          value={item.rating}
                        />
                        <p className='font-semibold ml-2'>
                          {item.rating >= 4.5 ? 'Awesome Service' :
                            item.rating >= 3.5 ? 'Good Service' :
                              'Average Service'}
                        </p>
                      </div>
                      <p className='text-xs text-gray-500'>Reviewed on {moment(item.date).format('MMMM Do, YYYY')}</p>
                      <p className='lg:w-80 mt-2'>{item.feedback}</p>
                    </div>))}
                </div>
              </div>}
          </div>
        </div>
      </div>

    </>
  )
}

export default Ratings