import React, { useEffect, useState } from 'react';
import { getProfile } from '../../../Api/userAPI';
import {TfiEmail} from 'react-icons/tfi'
import { BiPhoneCall } from 'react-icons/bi';
import BASE_URL from '../../../config/config';
const Profile = () => {
    const [profile, setProfile] = useState([])
    const headers = { Authorization: `Bearer ${localStorage.getItem('userToken')}` };

    useEffect(() => {
        getProfile(headers).then((res) => {
            setProfile(res.data)
        })

    }, [])
    return (
        <div className="flex justify-center">
            <div>
                <div className="flex items-center mt-10 p-4 max-w-xl  h-5 bg-white lg:min-w-[1024px]">
                    My Profile
                </div>
                <section className="container py-4 mx-auto ">
                    <div
                        className="flex items-center p-4  max-w-xl border-gray-200 rounded-lg shadow-sm bg-white lg:min-w-[1024px]"
                    >
                        <div className="flex flex-col ml-5">

                            <div className="grid md:grid-cols-2 gap-2">
                                <div className="flex items-center">
                                    <img
                                        alt="avatar"
                                        className=" h-44 rounded-md border-2 border-gray-300"
                                        src={`${BASE_URL}/public/images/${profile.image}`}
                                    />
                                </div>
                                <div>
                                    <p className="text-blue-900 text-2xl">
                                        <span className='font-semibold'>{profile.username}</span>
                                    </p>
                                    <p className="text-black mt-5 flex items-center ">
                                        <TfiEmail size={15} className='me-2'/> <span>{profile.email}</span>
                                    </p>
                                    <p className="text-black  mt-5 flex items-center ">
                                       <BiPhoneCall size={15} className='me-2'/> <span >{profile.mobile}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;
