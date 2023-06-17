import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { AddReview, getBookings } from '../../../Api/userAPI';
import moment from 'moment';
import ReactStars from 'react-stars';
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux';

function BookingDetail({ action, data }) {
  const [bookings, setBookings] = useState();
  const [rating, setRatingValue] = useState(0);
  const [feedback, setFeedback] = useState('')

  const headers = { Authorization: `Bearer ${localStorage.getItem('userToken')}` };
  const user = useSelector((state) => state.user.data)
  const handleRating = (rate) => {
    setRatingValue(rate);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
    } else if (!feedback) {
      toast.error('Please provide feedback');
    } else {
      const data = {
        userId: user._id,
        rating: rating,
        feedback: feedback,
        serviceIDs: bookings.serviceData,
      };
      AddReview(data, headers).then((res) => {
        if (res) {
          toast.success(res.data.message);
          action();
        }
      });
    }
  };


  useEffect(() => {
    getBookings(headers).then((res) => {
      if (data) {
        const filteredBookings = res.data.filter((booking) => booking.BookingID === data);
        const [filteredBooking] = filteredBookings;
        setBookings(filteredBooking);
      }
    });
  }, []);

  const handleComplaintClick = (BookingID) => {
    const email = 'complaints.quickserve@gmail.com';
    const subject = `Complaint for Booking ID: ${BookingID}`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  
    window.open(mailtoLink);
  };
  
  const today = moment().format('MMMM Do, YYYY');
  const isToday = bookings?.date === today;

  return (
    <>
      <div>
        <div className='flex justify-center items-center absolute left-0 right-0 bottom-0 top-0'>
          <div className="bg-[#E8F5FF] min-w-[320px] px-8 py-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <button className="top-0 relative left-5" onClick={(() => action())}>
                <BiArrowBack size={20} />
              </button>
              <h1 className="text-2xl text-center">Booking Details</h1>
              <div></div>
            </div>
            {bookings && (
              <div className='mt-3'>
                <div className='flex justify-between'>
                  <div>
                    <p className='font-bold'>ID: {bookings.BookingID}</p>
                    <p className='text-sm'>{moment(bookings.date).format('MMMM Do, YYYY')} At  {bookings.startTime}</p>
                  </div>
                  <div>
                    {bookings.status !== 'Completed' && isToday && (
                      <button className='text-red-500'>Cancel</button>
                    )}
                  </div>
                </div>

                <div className='bg-white rounded-lg px-1 py-1 mt-2'>
                  {bookings.serviceData.map((item, index) => (
                    <div key={index}>
                      {/* <p>{index + 1}.</p> */}
                      <p className='font-semibold'> {item.servicename}</p>
                    </div>
                  ))}
                  <p className="font-normal">Paid: <span className="font-bold">₹ {bookings.totalPrice}</span></p>
                </div>

              </div>
            )}
            {bookings && bookings.status === 'Completed' && (
              <div>
                <div className="items-center mt-2">
                  <p className='font-bold mt-1'>Rate Now</p>
                  <ReactStars
                    count={5}
                    onChange={handleRating}
                    size={24}
                    color2={'#ffd700'}
                    value={rating}
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    className="w-full px-3 py-1 border border-gray-300 rounded-md"
                    rows="2"
                    value={feedback}
                    onChange={((e) => setFeedback(e.target.value))}
                    placeholder="Enter your feedback..."
                  ></textarea>

                </div>
                <button type='submit' onClick={handleSubmit} className='bg-blue-900 w-full text-white p-1 rounded'>Submit</button>
                <p
                  className='text-center underline text-sm py-1 text-blue-700 cursor-pointer'
                  onClick={() => handleComplaintClick(bookings.BookingID)}
                >
                  Register a Complaint
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
}

export default BookingDetail;