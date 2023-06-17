import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Payment = ({ shedule, payment, price, status }) => {
    
    const navigate = useNavigate()
    const options = {
        key: 'rzp_test_FtVK05Td5kBCzd',
        amount: price * 100,
        name: 'QuickServe',
        description: 'some description',
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function (response) {
            if (response) {
                toast.success('payment Successful');
                payment()
                status()
                navigate('/bookings')
            }
        },
        prefill: {
            name: '',
            contact: '',
            email: '',
        },
        notes: {
            address: '',
        },
        theme: {
            color: '#020073',
            hide_topbar: false,
        },

    };

    const openPayModal = () => {
        if (window.Razorpay) {
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        }
    };

    useEffect(() => {
        shedule();
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = openPayModal;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            payment();
        };
    }, []);

    return (
        <>
            <div className="payment-modal">
                <div className="payment-modal-content">
                    {/* Payment modal content */}
                </div>
            </div>
        </>
    );
};

export default Payment;
