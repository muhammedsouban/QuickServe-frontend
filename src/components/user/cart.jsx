import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, deleteCartItem, addCartItem, clearCart } from "../../redux/Slice/cartSlice";
import { useEffect, useState } from "react";
import { AddBooking, RemoveCart, getCart } from "../../Api/userAPI";
import { toast } from "react-hot-toast";
import TimeShedule from "./Checkouts/TimeShedule";
import Address from "./Checkouts/Address";
import Map from "./Checkouts/Map";
import Payment from "./payment/Payment";
import { Link } from "react-router-dom";
import BASE_URL from "../../config/config";
function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false)
    const [showAddressModal, setShowAddressModal] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState([]);
    const [selectedTime, setSelectedTime] = useState([]);
    const [showPayment, setShowPayment] = useState(false)
    const [TotalPrice, setTotalPrice] = useState(0)
    const headers = { Authorization: `Bearer ${localStorage.getItem('userToken')}` };

    useEffect(() => {
        getCart(headers).then((res) => {
            dispatch(addCartItem(res[0].CartItems))
        })
    }, [])


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

    const handleDecrement = (itemId) => {
        dispatch(decreaseQty(itemId));
    };

    const handleIncrement = (itemId) => {
        dispatch(increaseQty(itemId));
    };

    const subtotal = cartItems.reduce((total, item) => {
        return total + item.price * item.qty;
    }, 0);

    const handlepayment = () => {
        setShowPayment(!showPayment)
        setTotalPrice(subtotal)
    }

    const handleRemove = (itemId) => {
        dispatch(deleteCartItem(itemId))
        RemoveCart(itemId, headers).then((res) => {
            toast.success(res.data.message)
        })
    }
    const CurrentAddress = selectedAddress.map((address) => address.id).join('');
    const data = {
        userId: user.data._id,
        service: cartItems,
        dateTime: selectedTime,
        totalPrice: TotalPrice,
        address: CurrentAddress
    }
    const paymentSuccess = () => {
        AddBooking(data, headers)
        dispatch(clearCart())
    }


    return (
        <>
            <div>
                <div className="w-full h-full flex justify-center top-20 overflow-y-auto overflow-x-hidden">
                    <div className="w-full absolute right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700">
                        {cartItems.length > 0 ? <div className="flex md:flex-row flex-col justify-center">
                            <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8  overflow-y-auto overflow-x-hidden max-h-screen hide-scrollbar">
                                <style>
                                    {`.hide-scrollbar::-webkit-scrollbar { width: 0.5rem;}.hide-scrollbar::-webkit-scrollbar-track { background: transparent; }
                                .hide-scrollbar::-webkit-scrollbar-thumb {  background: transparent;} `}
                                </style>
                                <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon icon-tabler icon-tabler-chevron-left"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <polyline points="15 6 9 12 15 18" />
                                    </svg>
                                    <p className="text-sm pl-2 leading-none">Back</p>
                                </div>
                                <p className="text-5xl font-black leading-10 text-gray-800 mb-10 pt-3">CART</p>
                                {cartItems.map((service) => {
                                    const { _id, image, servicename, description, price, qty } = service;
                                    const totalPrice = price * qty;
                                    return (
                                        <div key={_id} className="md:flex items-center py-8 border-t bg-white px-3 border-gray-200">
                                            <div className="w-1/4">
                                                <img
                                                    src={`${BASE_URL}/public/images/${image}`}
                                                    alt=""
                                                    className="w-24 h-full object-center object-cover"
                                                />
                                            </div>
                                            <div className="md:pl-3 md:w-3/4 ">
                                                <p className="text-base font-black leading-none text-gray-800">{servicename}</p>
                                                <div className="flex items-center justify-between w-full pt-1">
                                                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">{description}</p>
                                                </div>
                                                <div className="flex items-center justify-between pt-5 pr-6">
                                                    <div className="flex items-center">
                                                        <button className="text-sm text-red-500 p-1 rounded border border-red-700 text-center cursor-pointer" onClick={(() => handleRemove(_id))}>Remove</button>
                                                    </div>
                                                    <div>
                                                        <button className="bg-blue-900 text-white w-8" onClick={() => handleDecrement(_id)}>
                                                            -
                                                        </button>

                                                        <input
                                                            className="text-center w-10"
                                                            name="quantity"
                                                            min="1"
                                                            value={qty}
                                                            type="number"
                                                        />

                                                        <button className="bg-blue-900 text-white w-8" onClick={() => handleIncrement(_id)}>
                                                            +
                                                        </button>

                                                    </div>
                                                    <p className="text-base font-black leading-none text-gray-800">{totalPrice}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="xl:w-1/3 md:w-1/2 sm:w-1/4 w-full  h-full">
                                <div className="flex flex-col px-14 lg:py-20 justify-between overflow-y-auto">
                                    <p className="text-4xl font-black  text-gray-800 mb-10">Summary</p>
                                    <div className="bg-white px-5 py-4">

                                        <div className="">
                                            <div className="flex items-center bg-white justify-between ">
                                                <p className="text-base leading-none text-gray-800">Subtotal</p>
                                                <p className="text-base leading-none text-gray-800">{subtotal}</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-gray-800">Min Order fee</p>
                                                <p className="text-base leading-none text-gray-800">Free</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-gray-800">Taxes and fee</p>
                                                <p className="text-base leading-none text-gray-800">0</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                                <p className="text-2xl leading-normal text-gray-800">Total</p>
                                                <p className="text-2xl font-bold leading-normal text-right text-gray-800">{subtotal}</p>
                                            </div>
                                            <button onClick={toggleModal} className="text-base leading-none w-full py-4 bg-blue-900 rounded-md border focus:outline-none hover:bg-blue-950 duration-200 text-white">
                                                Proceed
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> :
                            <div className="flex justify-center items-center">
                                <div className="text-center">
                                    <h2 className="text-blue-950 text-xl opacity-50 mb-2 md:text-4xl font-bold">
                                        Nothing in Cart
                                    </h2>
                                    <Link to={'/'}><button className="p-2 bg-blue-900 text-white rounded-lg px-2 md:px-10 mt-5">Book Now</button> </Link>
                                </div>
                                <img className="object-contain w-1/3" src={`${BASE_URL}/public/images/book now.png`} alt="" />
                            </div>

                        }
                    </div>
                </div>
                {showModal && (
                    <div className="modal-overlay">
                        <TimeShedule
                            onClose={toggleModal}
                            modal={addresshandle}
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

            </div>
        </>
    );
}

export default Cart;
