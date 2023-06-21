import React, { useEffect, useState } from 'react';
import { getProfile } from '../../../Api/userAPI';
import { TfiEmail } from 'react-icons/tfi'
import { BiPhoneCall } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr'
import { getProviderprofile } from '../../../Api/providerAPI';
import BASE_URL from '../../../config/config';
import Loader from '../../Loader';
const Profile = () => {
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(true);

    const headers = { Authorization: `Bearer ${localStorage.getItem('ProviderToken')}` };

    useEffect(() => {
        getProviderprofile(headers).then((res) => {
            setProfile(res.data)
            setLoading(false)
        })

    }, [])

    return (
        <>
            {loading ? <Loader /> : <div className="flex justify-center">
                <div>
                    <div className="flex items-center mt-10 p-4 max-w-xl  h-5 bg-white lg:min-w-[1024px]">
                        My Profile
                    </div>
                    <section className="container py-4 mx-auto ">
                        <div
                            className="flex items-center p-4  max-w-xl border-gray-200 rounded-lg shadow-sm bg-white lg:min-w-[1024px]"
                        >
                            <div className="lg:flex ml-5">

                                <img
                                    alt="avatar"
                                    className=" h-44 rounded-md border-2 border-gray-300"
                                    src={`${BASE_URL}/public/images/${profile?.image}`}
                                />
                                <div className='ml-5'>

                                    <p className="text-blue-900 text-2xl">
                                        <span className='font-semibold'>{profile?.providername}</span>
                                    </p>
                                    <p>{profile?.category}</p>
                                    <div className='grid md:grid-cols-2 gap-3'>
                                        <div>
                                            <p className="text-black mt-5 flex items-center ">
                                                <TfiEmail size={15} className='me-2' /> <span>{profile?.email}</span>
                                            </p>
                                            <p className="text-black  mt-5 flex items-center ">
                                                <BiPhoneCall size={15} className='me-2' /> <span >{profile?.phone}</span>
                                            </p>
                                            <p className="text-black  mt-5 flex items-center ">
                                                <GrLocation size={15} className='me-2' /> <span >{profile?.location}</span>
                                            </p>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </div>}
        </>

    );
}

export default Profile;
