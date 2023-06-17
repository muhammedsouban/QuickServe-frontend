import React, { useEffect, useState } from 'react';
import moment from 'moment';
import StartJob from '../../comfirmations/StartJobModal';

function BookingsCard({ value, accept, status, action }) {
  const [showModal, setShowModal] = useState(false);
  const [Data, setData] = useState()

  const handleStartJob = (services, bookingId, booking) => {
    setShowModal(!showModal);
    const data = {
      services: services,
      bookingId: bookingId,
      BookingID: booking
    }
    setData(data)
  };

  return (
    <>
      <div className="flex justify-center">
        <div>
          <div className="lg:w-[900px] md:w-[500px] sm:w-[100px] mt-20 mb-5">
            <div className="bg-white py-1 px-5">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {status} Booking
              </h2>
            </div>
          </div>
          {value.map((bookingItem) => (
            <div
              key={bookingItem.bookingId}
              className="py-1 px-6 bg-white flex justify-between items-center rounded-lg shadow-lg mt-4"
            >
              <div>
                {bookingItem.services.map((service) => (
                  <div key={service._id}>
                    <h2 className="text-xl font-bold mb-2 text-gray-800">
                      {service.serviceData.servicename}
                    </h2>
                  </div>
                ))}
                <p>{bookingItem.startTime}</p>
                <p>{moment(bookingItem.date).format("MMMM Do, YYYY")}</p>
              </div>

              <div>
                {status === 'Requested' && (
                  <button
                    onClick={() =>
                      accept(
                        bookingItem.services,
                        bookingItem.bookingId,

                      )}
                    className="bg-green-600 text-white py-1 px-3 rounded-md"
                  >
                    Accept
                  </button>
                )}

                {status === 'Upcoming' && (
                  <button
                    onClick={() =>
                      handleStartJob(
                        bookingItem.services,
                        bookingItem.bookingId,
                        bookingItem.booking
                      )}
                    className="bg-blue-600 text-white py-1 px-3 rounded-md"
                  >
                    Start
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && <div className="modal-overlay"> <StartJob onClose={handleStartJob} action={action} data={Data} /></div>}
    </>
  );
}

export default BookingsCard;
