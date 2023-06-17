import React, { useState,useEffect } from 'react'
import BookingsCard from './BookingCards';
import { acceptRequest, bookingRequests, completed, upcoming } from '../../../Api/providerAPI';

function Completed() {

    const headers = { Authorization: `Bearer ${localStorage.getItem('ProviderToken')}` };

    const [booking, setBooking] = useState([])
    useEffect(() => {
        completed(headers).then((res) => {
            setBooking(res.data);
        });
    }, []);
    const handleAccept = ((services, booking) => {

        const data = {
            services: services,
            bookingId: booking
        }
        acceptRequest(data, headers)
    })


    return (
        <>
            <BookingsCard value={booking} accept={handleAccept} status={'Completed'}/>
        </>
    )
}

export default Completed