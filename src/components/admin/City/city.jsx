import React, { useEffect, useState } from 'react';
import AddCityModel from './addCity';
import DeleteCategory from '../../comfirmations/DeleteCategory'
import { MdDelete } from 'react-icons/md'
import { getCity } from '../../../Api/AdminAPI';
import DeleteCity from '../../comfirmations/DeleteCity';

function City() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [CityId, setCityId] = useState('');
    const [city, setCity] = useState([])

    useEffect(() => {
        getCity().then((res) => {
            setCity(res.data)
        })
    }, [showAddModal,showDeleteModal])

    const toggleModal = () => {
        setShowAddModal(!showAddModal)
    }

    const handleDelete = ((cityId) => {
        setShowDeleteModal(true);
        setCityId(cityId);
    })
   
    const filteredData = city.filter((item) =>
        item.cityName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-col mx-auto max-w-screen-lg mt-10" >
                <div className="flex justify-between items-center mb-4 px-6 md:px-0">
                    <div className="relative">
                        <input
                            type="text"
                            className="py-2 px-4 w-full md:w-72 border border-gray-400 rounded-lg pr-10 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-900"
                            value={searchTerm}
                            onChange={((e) => setSearchTerm(e.target.value))}
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
                    <button
                        className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={toggleModal}
                    >
                        Add City
                    </button>
                </div>
                <div className=" overflow-x-auto ">
                    <table className="table-auto w-full ">
                        <thead className='text-white '>
                            <tr className='bg-blue-900 flex justify-between'>
                                <th className="px-4 py-2">Category Name</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead >
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item._id} >
                                    <td className="border px-4 py-2 flex justify-between">{item.cityName}
                                        <MdDelete size={22} color="red" className="me-5" onClick={() => handleDelete(item._id)} />
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    {showAddModal && (
                        <div className="modal-overlay">
                            <AddCityModel
                                onClose={toggleModal}
                                City={city}
                            />
                        </div>
                    )}
                    {showDeleteModal && (
                        <div className="modal-overlay">
                            <DeleteCity
                                open={setShowDeleteModal}
                                cityId={CityId}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default City;
