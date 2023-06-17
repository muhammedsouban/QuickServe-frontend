import React, { useState, useEffect } from 'react'
import BookingsCard from './BookingCards';
import { acceptRequest, bookingRequests } from '../../../Api/providerAPI';
import { toast } from 'react-hot-toast';

function Requests() {

    const headers = { Authorization: `Bearer ${localStorage.getItem('ProviderToken')}` };

    const [booking, setBooking] = useState([])
    const [action, setAction] = useState(false)
    useEffect(() => {
        bookingRequests(headers).then((res) => {
            setBooking(res.data);
        });
    }, [action]);

    const handleAccept = ((services, booking) => {
        const data = {
            services: services,
            bookingId: booking
        }
        acceptRequest(data, headers).then((res) => {
            toast.success('Booking accepted Successfully')
            setAction(true)
        })

    })


    return (
        <>
            <BookingsCard value={booking} accept={handleAccept} status={'Requested'} />
        </>
    )
}

export default Requests