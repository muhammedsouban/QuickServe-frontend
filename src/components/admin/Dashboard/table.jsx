import React from 'react';
import moment from 'moment';

const DashboardTable = ({ value }) => {

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4">Service Name</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Start Time</th>
            </tr>
          </thead>
          <tbody>
            {value && value.length > 0 ? (
              value.map((booking) => (
                <tr key={booking.bookingId} className="border-b border-gray-200">
                  {booking.services.map((service) => (
                    <td className="py-2 px-4" key={service.serviceId}>
                      {service.serviceData.servicename}
                    </td>
                  ))}
                  {/* <td className="py-2 px-4">{booking.user}</td> */}

                  <td className="py-2 px-4">{moment(booking.date).format("MMMM Do, YYYY")}</td>
                  <td className="py-2 px-4">{booking.startTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No bookings found.</td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
