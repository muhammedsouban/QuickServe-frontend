import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faUsers, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineDoneAll, MdPendingActions } from 'react-icons/md';
import { BsPatchQuestionFill } from 'react-icons/bs';
import { FaRupeeSign } from 'react-icons/fa';

function StatCard({ value }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 justify-center gap-4 mt-5">
      {value &&
        value.map((item,index) => (
          <div key={index} className="relative flex flex-col min-w-[300px] break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h5 className="text-blue-900 uppercase font-semibold text-2xl">
                    {item.name}
                  </h5>
                </div>
                <div className="relative w-auto pl-4 flex-initial ">
                  <div className=" p-3 text-center inline-flex items-center text-xl justify-center w-14 h-14 shadow-md rounded-full">
                    {item.name === 'Earnings' && (
                      <FaRupeeSign className='text-orange-400' />
                    )}
                    {item.name === 'Bookings' && (
                      <FontAwesomeIcon color='green' icon={faCalendar} />
                    )}
                    {item.name === 'Users' && (
                      <FontAwesomeIcon color='blue' icon={faUser} />
                    )}
                    {item.name === 'Providers' && (
                      <FontAwesomeIcon icon={faUsers} />
                    )}
                    {item.name === 'Completed' && (
                      <MdOutlineDoneAll size={25} className='text-green-600' />

                    )}
                    {item.name === 'Upcomings' && (
                      <MdPendingActions size={25} className='text-gray-700' />

                    )}
                    {item.name === 'Requests' && (
                      <BsPatchQuestionFill size={25} className='text-red-500' />

                    )}
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-blueGray-400 font-sans text-6xl">
                  {item.count}
                </h5>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default StatCard