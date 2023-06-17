import React, { useEffect, useState } from 'react';
import { StarIcon, HeartIcon } from '@heroicons/react/solid';
// import { getServicesbycategory } from '../../Api/AdminAPI';
import { getServices } from '../../../Api/AdminAPI';
import { addToCart } from '../../../Api/userAPI';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BookNow from '../BookNow/BookNow';
import BASE_URL from '../../../config/config';

const ServiceCard = () => {

  const headers = { Authorization: `Bearer ${localStorage.getItem('userToken')}` };

  const { categoryName } = useParams();
  const [service, setService] = useState([])
  const [serviceData, setServiceData] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleAddToCart = (serviceId) => {

    if (headers.Authorization !== 'Bearer null') {
      addToCart(serviceId, headers).then((res) => {
        if (res.data) {
          toast(res.data.message)
        }
      })
    } else {
      toast('please Login')
    }
  };

  const handleModel = (serviceId) => {
    setShowModal(!showModal)
    const filteredServices = service.filter((service) => service._id === serviceId)
    const [filteredService] = filteredServices;
    setServiceData(filteredService);
  }

  useEffect(() => {
    getServices().then((data) => {
      if (categoryName) {
        const filteredServices = data.filter((service) => service.category === categoryName);
        setService(filteredServices);
      } else {
        setService(data)
      }

    });
  }, [categoryName]);

  return (
    <>

      <div className='flex justify-center'>
        <Link to={'/services'} className='text-black bg-blue-50 '>View All Services</Link>
        <div>
        </div>
      </div>
      <div className="flex space-x-10 mt-6 justify-center">
        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-5 sm:grid-cols-1'>
          {(service.map((service) => (
            <div className="w-72 bg-white shadow-lg rounded-lg overflow-hidden" key={service._id}>
              <Link to={`/service/${service._id}`}>
                <div className="relative">
                  {/* <div className="absolute top-0 right-0 px-1 bg-white rounded flex mt-2 me-2 items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-600 ml-1">4</span> 
                  </div> */}
                  <img
                    src={`${BASE_URL}/public/images/${service.image}`}
                    alt="Service "
                    className="w-full h-40 object-contain"
                  />
                </div>
              </Link>

              <div className="px-4 py-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">{service.servicename}</h3>
                  {/* <HeartIcon className="w-6 h-6 text-red-500" /> */}
                </div>

                <p className="text-gray-600 h-10 mt-2">{service.description}</p>
                <div className="flex items-center mt-4">
                  <span className="text-xl font-medium text-gray-800">₹{service.price}</span>
                  {/* <span className="text-gray-600 ml-2">/hour</span> */}
                </div>
                <p className="text-gray-500 text-xs mt-1 mb-2">
                  *Extra Charges Applicable for Spare Parts
                </p>
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="flex items-center justify-between mt-2 mb-1">
                  <button onClick={() => handleModel(service._id)} className="p-2 text-blue/900 border-2 rounded-lg border-blue-900 ">
                    BOOK NOW
                  </button>
                  <button onClick={() => handleAddToCart(service._id)} className="p-2 dark:text-white rounded-lg bg-gradient-to-r from-blue-900 to-blue-500">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
      {showModal && <BookNow action={handleModel} serviceData={serviceData} />}

    </>
  );
};

export default ServiceCard;
