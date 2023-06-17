import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { startJob } from '../../Api/providerAPI';

function StartJob({ onClose, data, action }) {
  const [bookingId, setBookingId] = useState('');

  const headers = { Authorization: `Bearer ${localStorage.getItem('ProviderToken')}` };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.BookingID === bookingId) {
        const response = await startJob(data, headers)
        if (response.status === 200) {
          toast.success('Booking ID verified successfully!');
          action()
          onClose()
        }
      }
      else {
        toast.error('Invalid booking ID. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="fixed z-50 flex justify-center items-center top-0 bottom-0 rounded z-5 0 right-0 left-0 ">
      <div className="bg-[#E8F5FF] flex justify-center items-center flex-col w-[300px] md:w-[500px] p-8 opacity-100">
        <div className="w-full flex justify-center text-xl text-blue-950">
          Please Enter BookingId to Start JOB
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mt-5">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-blue-500"
              placeholder="A123456"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-8 pt-6">
            <button
              onClick={onClose}
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2  border border-red-500 hover:border-transparent w-24  text-center rounded"
            >
              cancel
            </button>
            <button
              type="submit"
              className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2  border border-green-500 hover:border-transparent w-24  text-center rounded"
            >
              Start
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StartJob;
