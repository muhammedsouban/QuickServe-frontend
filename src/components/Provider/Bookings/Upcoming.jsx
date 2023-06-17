import React, { useState,useEffect } from 'react'
import BookingsCard from './BookingCards';
import { acceptRequest, bookingRequests, upcoming } from '../../../Api/providerAPI';

function Upcoming() {

    const headers = { Authorization: `Bearer ${localStorage.getItem('ProviderToken')}` };

    const [booking, setBooking] = useState([])
    const [action,setAction]=useState(false)
    useEffect(() => {
        upcoming(headers).then((res) => {
            setBooking(res.data);
        });
    }, [action]);

    const handleAction=(()=>{
        setAction(true)
    })

    return (
        <>
            <BookingsCard value={booking} action={handleAction} status={'Upcoming'}/>
        </>
    )
}

export default Upcoming