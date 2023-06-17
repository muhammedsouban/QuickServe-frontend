import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ApproveProvider, UnBlockProvider, blockProvider, getProvider } from '../../../Api/AdminAPI';
import BASE_URL from '../../../config/config';
const ProviderCard = () => {
    const [providers, setProviders] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [status, setStatus] = useState(false)
    const [filter, setFilter] = useState('all');

    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

    const handleApprove = (providerId) => {
        ApproveProvider(providerId, headers)
            .then((res) => {
                if (res) {
                    setStatus(!status)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleBlock = (providerId) => {
        blockProvider(providerId, headers)
            .then((res) => {
                setStatus(!status)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleUnblock = (providerId) => {
        UnBlockProvider(providerId, headers)
            .then((res) => {
                if (res) {
                    setStatus(!status)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getProvider(headers)
            .then((data) => {
                setProviders(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [status]);

    const filteredProviders = providers.filter((provider) => {
        const { providername, isApproved, isBlock } = provider;
        const nameMatches = (providername ?? '').toLowerCase().includes(searchInput.toLowerCase());

        let statusMatches = true;
        if (filter === 'approved') {
            statusMatches = isApproved;
        } else if (filter === 'blocked') {
            statusMatches = isBlock;
        } else if (filter === 'not-approved') {
            statusMatches = !isApproved;
        }
        return nameMatches && statusMatches;
    });

    return (
        <>
            <div className="flex justify-center">
                <div>
                    <section className="container py-4 mx-auto">
                        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                            <div className="flex mt-2" >
                                <input
                                    type="text"
                                    placeholder="Search by name"
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    value={searchInput}
                                    className="w-full px-3 h-10 rounded-l border-2 border-blue-900 focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-900 h-10 text-white rounded-r px-2 md:px-3  py-0 md:py-1"
                                >
                                    Search
                                </button>
                            </div>
                            <div className="flex lg:justify-end lg:self-start sm:justify-center sm:content-center mt-2 mb-4">
                                <button
                                    className={`button ${filter === 'all' ? 'active' : ''} border-2 p-2 rounded-md border-blue-900 text-blue-900 focus:outline-none focus:bg-blue-900 focus:text-white`}
                                    onClick={() => setFilter('all')}
                                >
                                    All
                                </button>

                                <button
                                    className={`button ${filter === 'approved' ? 'active' : ''} border-2 p-2 ml-2 rounded-md border-blue-900 text-blue-900 focus:outline-none focus:bg-blue-900 focus:text-white`}
                                    onClick={() => setFilter('approved')}
                                >
                                    Approved
                                </button>

                                <button
                                    className={`button ${filter === 'blocked' ? 'active' : ''} border-2 p-2 ml-2 rounded-md border-blue-900 text-blue-900 focus:outline-none focus:bg-blue-900 focus:text-white`}
                                    onClick={() => setFilter('blocked')}
                                >
                                    Blocked
                                </button>

                                <button
                                    className={`button ${filter === 'not-approved' ? 'active' : ''} border-2 p-2 ml-2 rounded-md border-blue-900 text-blue-900 focus:outline-none focus:bg-blue-900 focus:text-white`}
                                    onClick={() => setFilter('not-approved')}
                                >
                                    Not Approved
                                </button>
                            </div>
                        </div>



                        <div className="grid gap-6 mb-8 md:grid-cols-1 lg:grid-cols-2">
                            {filteredProviders.map((provider) => (
                                <div
                                    key={provider._id}
                                    className="flex items-center p-4 border-2 max-w-xl border-gray-200 rounded-lg shadow-sm bg-white"
                                >
                                    <div id="body" className="flex flex-col ml-5">
                                        <div className="flex items-center">
                                            <img
                                                alt="avatar"
                                                className="w-14 h-14 rounded-full border-2 border-gray-300"
                                                src={`${BASE_URL}/public/images/${provider.image}`}
                                            />
                                            <h4 id="name" className="text-xl ml-5 font-semibold">
                                                {provider.providername}
                                            </h4>
                                        </div>
                                        <div className="grid md:grid-cols-2">
                                            <div>
                                                <p id="job" className="text-blue-900 mt-2">
                                                    email: {provider.email}
                                                </p>
                                                <p id="job" className="text-blue-900 mt-2">
                                                    phone: {provider.phone}
                                                </p>
                                                <p id="job" className="text-blue-900 mt-2">
                                                    location: {provider.location}
                                                </p>
                                            </div>
                                            <div >
                                                <p id="job" className="text-blue-900 mt-2">
                                                    category: {provider.category}
                                                </p>
                                                <p id="job" className="text-blue-900 mt-2">
                                                    experience: {provider.experience}
                                                </p>
                                                <p id="job" className="text-blue-900 mt-2">
                                                    joined On : {moment(provider.joinedon).format('YYYY-MM-DD')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex mt-4">

                                            {!provider.isApproved && !provider.isBlock && (
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => handleApprove(provider._id)}
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {provider.isApproved && !provider.isBlock && (
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => handleBlock(provider._id)}
                                                >
                                                    Block
                                                </button>
                                            )}
                                            {provider.isBlock && (
                                                <button
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => handleUnblock(provider._id)}
                                                >
                                                    Unblock
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ProviderCard;
