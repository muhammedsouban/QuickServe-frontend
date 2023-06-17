import React, { useEffect, useState } from 'react'
import BlockUser from '../../comfirmations/BlockUser';
import { getUsers } from '../../../Api/AdminAPI';
import '../Services/Services.css'
import Button from '@mui/material/Button';
import BASE_URL from '../../../config/config';

function UserList() {
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState('')
    const [block, setBlock] = useState(true);

    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

    useEffect(() => {
        getUsers(headers).then(data => {
            setUsers(data)
        })
    }, [showBlockModal])

    const handleBlock = (userId, isBlocked) => {
        setUserId(userId);
        setBlock(!isBlocked);
        setShowBlockModal(true);
    };

    return (
        <div>
            <div className="flex flex-col mx-auto max-w-screen-lg mt-10" >

                <div className="flex justify-between items-center mb-4 px-6 md:px-0">
                    <div className="relative z-[-1]">

                        <input
                            type="text"
                            className="py-2 px-4 w-full md:w-72 border border-gray-400 rounded-lg pr-10 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-900"
                            placeholder="Search..."
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                            <svg
                                className="fill-current h-4 w-4 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M18.56 16.44l-3.76-3.78a6.77 6.77 0 1 0-.86.86l3.78 3.76a.61.61 0 0 0 .86 0 .61.61 0 0 0 0-.84zM6.5 12.5a5 5 0 1 1 7.08 0A5 5 0 0 1 6.5 12.5z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full ">
                        <thead className='text-white'>
                            <tr className='bg-blue-900'>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Number</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {users.map(item => (
                                <tr key={item._id}>
                                    <td className="border px-4 py-2"><img className='w-[100px]' src={`${BASE_URL}/public/images/${item.image}`} alt="" /></td>
                                    <td className="border px-4 py-2">{item.username}</td>
                                    <td className="border px-4 py-2">{item.email}</td>
                                    <td className="border px-4 py-2">{item.mobile}</td>
                                    <td className="border px-4 py-2">
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            {item.isBlocked ? (
                                                <Button onClick={() => handleBlock(item._id, true)} variant="contained" color="success">  Unblock </Button>)
                                                :
                                                (<Button onClick={() => handleBlock(item._id, false)} variant="contained" color="error"> Block </Button>
                                                )}
                                        </span>
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
                    {showBlockModal && (
                        <div className="modal-overlay">
                            <BlockUser
                                open={setShowBlockModal}
                                userId={userId}
                                block={block} />
                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}

export default UserList