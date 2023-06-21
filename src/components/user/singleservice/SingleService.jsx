import React, { useState, useEffect } from "react";
import Ratings from "../Ratings/Ratings";
import { useParams } from "react-router-dom";
import { addToCart, getServiceDetails } from "../../../Api/userAPI";
import { toast } from "react-hot-toast";
import BookNow from "../BookNow/BookNow";
import { StarIcon } from "@heroicons/react/solid";
import BASE_URL from "../../../config/config";
import { useSelector } from "react-redux";

const SingleService = () => {
  const [service, setService] = useState()
  const [showModal, setShowModal] = useState(false)
  
  const { serviceId } = useParams();
  const headers = { Authorization: `Bearer ${localStorage.getItem('userToken')}` };

  const handleAddToCart = (serviceId) => {
    if (headers.Authorization !== 'Bearer null') {
      addToCart(serviceId, headers).then((res) => {
        if (res.data) {
          toast.success(res.data.message)
        }
      })
    } else {
      toast.error('please Login')
    }
  };

  const handleModel = () => {
    if(headers.Authorization !== 'Bearer null'){
      setShowModal(!showModal)
    }else{
      toast.error('Please Login to Book a service')
    }
  }

  useEffect(() => {
    getServiceDetails(serviceId).then((res) => {
      setService(res.data);
    });

  }, []);
  return (
    <>
    <div className="flex justify-center">
    <div className="lg:w-4/5">
      <div className="flex justify-center px-5 mt-5 mx-auto ">
        <div className=" justify-center items-center flex bg-white">
          {service && <div className=" mx-4 my-4 rounded-lg overflow-hidden max-w-4xl">
            <div className="md:flex">
              <div className="md:w-1/2 flex items-center justify-center">
                <img src={`${BASE_URL}/public/images/${service.image}`} alt="" className="object-contain rounded-lg" />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center p-4 md:p-8">
                <h3 className="title uppercase font-semibold text-gray-700 text-xs tracking-widest">
                {service.category}
                </h3>
                <h1 className="heading font-bold text-3xl text-blue-900">
                {service.servicename}
                </h1>
                <p className="description text-base text-gray-700">
                {service.description}
                </p>
                  <p className=" font-semibold pt-4 text-3xl ">
                  <span className="font-normal">₹ </span>{service.price}
                  </p>
                <p className="mb-6">*Extra Charges Applicable for Spare Parts</p>

                <div className='flex justify-between gap-3'>
                  <button onClick={handleModel} className="px-4 w-full border h-12 border-blue-900 hover:border-none hover:text-white rounded-md text-blue-900 items-center gap-2 hover:bg-blue-700">
                   Book Now
                  </button>
                  <button onClick={() => handleAddToCart(service._id)} className="px-4 border w-full h-12 bg-blue-900  rounded-md text-white  items-center gap-2 hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>
      {service && <Ratings serviceId={service._id} />}
      {showModal && <BookNow action={handleModel} serviceData={service} />}
    </div>
    </div>
    </>
  );
};

export default SingleService;
