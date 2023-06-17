import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getBookings } from '../../../Api/AdminAPI';

function Bookings() {
  const [booking, setBooking] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');

  const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

  useEffect(() => {
    getBookings(headers)
      .then((res) => {
        setBooking(res.data);
      });
  }, []);

  const handleSearch = () => {
    const filteredBookings = booking.filter((bookingItem) =>
      bookingItem.BookingID.includes(searchInput)
    );
    setBooking(filteredBookings);
  };

  return (
    <>
      <div className='flex justify-center'>
        <div>
          <div className="lg:w-[900px] md:w-[500px] sm:w-[100px] mt-20 mb-5">
            <div className="bg-white py-1 px-5">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Bookings</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            <div className="flex mt-2">
              <input
                type="text"
                placeholder="Search by BookingId"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                className="w-full px-3 h-10 rounded-l border-2 border-blue-900 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-900 h-10 text-white rounded-r px-2 md:px-3  py-0 md:py-1"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            <div className="flex lg:justify-end lg:self-start sm:justify-center sm:content-center mt-2 mb-4">
              <button
                className={`button ${filter === 'all' ? 'active' : ''} border-2 p-2 rounded-md border-blue-900 text-blue-900 focus:outline-none focus:bg-blue-900 focus:text-white`}
                onClick={() => setFilter('all')}
              >
                All
              </button>

              <button
                className={`button ${filter === 'Completed' ? 'active' : ''} border-2 p-2 ml-2 rounded-md border-blue-900 text-blue-900 focus:outline-none focus:bg-blue-900 focus:text-white`}
                onClick={() => setFilter('Completed')}
              >
                Completed
              </button>

              <button
                className={`button ${filter === 'Pending' ? 'active' : ''} border-2 p-2 ml-2 rounded-md border-blue-900 text-blue-900 focus:outline-none focus:bg-blue-900 focus:text-white`}
                onClick={() => setFilter('Pending')}
              >
                Pending
              </button>
            </div>

          </div>
          {booking
            .filter((bookingItem) => {
              if (filter === 'all') {
                return true;
              } else {
                return bookingItem.status === filter;
              }
            })
            .filter((bookingItem) =>
              bookingItem.BookingID.includes(searchInput)
            )
            .map((bookingItem) => (
              <div
                key={bookingItem.bookingId}
                className="py-1 px-6 bg-white flex justify-between items-center rounded-lg shadow-lg mt-4"
              >
                <div>
                  <div className='flex gap-3'>

                    <p className='font-semibold text-red-500' >BookingId: {bookingItem.BookingID}</p>
                    <p className={`font-semibold ${bookingItem.status === 'Pending' ? 'text-red-500' : 'text-green-500'}`}>Status: {bookingItem.status}</p>

                  </div>

                  {bookingItem.serviceData.map((service) => (
                    <div key={service._id}>
                      <h2 className="text-xl font-bold mb-2 text-gray-800">{service.servicename} <span className='text-sm font-normal'>({service.category})</span></h2>
                    </div>
                  ))}
                  <p>{bookingItem.startTime}</p>
                  <p>{moment(bookingItem.date).format('MMMM Do, YYYY')}</p>

                  {bookingItem.userData.map((user) => (
                    <div key={user.id}>
                      <span>Client: {user.username}</span>
                    </div>
                  ))}
                </div>
                <div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Bookings;
