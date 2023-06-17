import React, { useEffect, useState } from 'react'
import { AddBooking } from '../../../Api/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import Address from '../Checkouts/Address';
import TimeShedule from '../Checkouts/TimeShedule';
import Map from '../Checkouts/Map';
import Payment from '../payment/Payment';
import { clearCart } from '../../../redux/Slice/cartSlice';

function BookNow({ action, serviceData }) {

    const user = useSelector((state) => state.user)
    const [showModal, setShowModal] = useState(true)
    const [showAddressModal, setShowAddressModal] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState([]);
    const [selectedTime, setSelectedTime] = useState([]);
    const [showPayment, setShowPayment] = useState(false)
    const [TotalPrice, setTotalPrice] = useState(0)

    const headers = { Authorization: `Bearer ${localStorage.getItem('userToken')}` };

    const handlepayment = () => {
        if (serviceData) {
            setShowPayment(!showPayment)
            setTotalPrice(serviceData.price)
        }
    }

    const CurrentAddress = selectedAddress.map((address) => address.id).join('');
    const data = {
        userId: user.data._id,
        service: [{
            _id: serviceData._id,
            qty: 1
        }],
        dateTime: selectedTime,
        totalPrice: TotalPrice,
        address: CurrentAddress
    };

    const paymentSuccess = () => {
        if (serviceData) {
            AddBooking(data, headers)
            action()

        }
    }
    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
    };

    const handleTimeSelection = (date, time) => {
        setSelectedTime([date, time]);
    };

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const addresshandle = () => {
        setShowAddressModal(!showAddressModal)
    }
    const maphandle = () => { setShowMap(!showMap) }
    console.log(selectedTime);
    console.log(CurrentAddress);
    console.log(TotalPrice);

    return (
        <>

            {showModal && (
                <div className="modal-overlay">
                    <TimeShedule
                        onClose={toggleModal}
                        modal={addresshandle}
                        action={action}
                        payment={handlepayment}
                        onTimeSelection={handleTimeSelection}
                        selectedAddress={selectedAddress}
                    />
                </div>
            )}
            {showAddressModal && (
                <div className="modal-overlay">
                    <Address
                        onClose={addresshandle}
                        shedule={toggleModal}
                        map={maphandle}
                        onSelectAddress={handleAddressSelection}
                    />
                </div>
            )}
            {showMap && (
                <div className="modal-overlay">
                    <Map
                        address={addresshandle}
                        map={maphandle}
                    />
                </div>
            )}

            {showPayment && (
                <Payment
                    shedule={toggleModal}
                    payment={handlepayment}
                    price={TotalPrice}
                    status={paymentSuccess}
                />
            )}
        </>
    )
}

export default BookNow