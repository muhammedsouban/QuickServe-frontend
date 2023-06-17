import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { deleteAddress, getAddress } from '../../../Api/userAPI';
import { MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { getCity } from '../../../Api/AdminAPI';

const Address = ({ onClose, shedule, map, onSelectAddress }) => {
    const [address, setAddress] = useState([]);
    const [city, setCity] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false)

    const headers = { Authorization: `Bearer ${localStorage.getItem('userToken')}` };

    const handleGoBack = () => {
        shedule();
        onClose();
    };

    const selectAddress = address
        .filter((address) => address.id === selectedAddress)

    const proceed = () => {
        const selected = address.find((addr) => addr.id === selectedAddress);
        if (selected) {
            const selectedCity = city.find((city) =>
                selected.address.includes(city.cityName)
            ); if (selectedCity) {
                onSelectAddress(selectAddress);
                shedule();
                onClose();
            } else {
                toast.error('Service not available at selected address.');
            }
        } else {
            toast.error('Please select an address.');
        }
    };


    const addAddress = () => {
        map();
        onClose();
    };
    const handleDelete = ((Id) => {
        deleteAddress(Id, headers).then((res) => {
            setIsUpdated(!isUpdated)
        })
    })

    useEffect(() => {
        try {
            getAddress(headers).then((res) => {
                setAddress(res.data);
            });
            getCity().then((res) => {
                setCity(res.data)
                console.log(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }, [isUpdated]);

    return (
        <>
            <div className='flex justify-center items-center absolute left-0 right-0 bottom-0 top-0'>
                <div className="  bg-[#E8F5FF] min-w-[300px] max-w-[400px] py-2 rounded-lg shadow-lg">
                    <div className="flex justify-between mb-2">
                        <button className="top-0 relative left-5" onClick={handleGoBack}>
                            <BiArrowBack size={20} />
                        </button>
                        <h1 className="text-2xl text-center">Saved Address</h1>
                        <div></div>
                    </div>
                    <div className="flex">
                        <div className="grid h-fit w-full grid-cols-1 mx-8">
                            <div onClick={addAddress} className="w-full mb-3 border-b-[1px]  border-gray-400">
                                <h2 className="mb-2 font-semibold">+ Add Address</h2>
                            </div>
                            <div className="overflow-y-auto max-h-[250px]">
                                {address.map((address) => (
                                    <div key={address.id} className="w-full mb-3 border-b-[1px] border-gray-400 ">
                                        <div className="flex">
                                            <input
                                                type="radio"
                                                name="address"
                                                checked={selectedAddress === address.id}
                                                onChange={() => setSelectedAddress(address.id)}
                                            />
                                            <div className='flex justify-between'>
                                                <h2 className="ml-2 ">{address.house}</h2>
                                                <MdDeleteOutline onClick={() => handleDelete(address.id)} size={20} color="red" className="ms-5" />

                                            </div>
                                        </div>
                                        <h2 className="ml-5 text-gray-500 mb-2">{address.address}</h2>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>
                    <div className="flex">
                        <button
                            onClick={proceed}
                            type="submit"
                            className="w-full mx-8 text-white bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm mb-5 py-2.5 text-center"
                        >
                            PROCEED
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Address;
