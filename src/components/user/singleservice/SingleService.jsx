import React, { useState, useEffect } from "react";
import Ratings from "../Ratings/Ratings";
import { useParams } from "react-router-dom";
import { addToCart, getServiceDetails } from "../../../Api/userAPI";
import { toast } from "react-hot-toast";
import BookNow from "../BookNow/BookNow";
import { StarIcon } from "@heroicons/react/solid";
import BASE_URL from "../../../config/config";

const SingleService = () => {
  const [service, setService] = useState()
  const [showModal, setShowModal] = useState(false)

  const { serviceId } = useParams();
  const headers = { Authorization: `Bearer ${localStorage.getItem('userToken')}` };

  const handleAddToCart = (serviceId, image, name, description, price) => {
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

  const handleModel = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    getServiceDetails(serviceId).then((res) => {
      setService(res.data);
    });

  }, []);
  return (
    <section className="">
      <div className="flex justify-center px-5 mt-5 mx-auto">
        <div className="lg:w-4/5  justify-center items-center flex ">
          <div className="w-2/3  bg-white ">
            {service && <div className="grid lg:grid-cols-2 sm:grid-cols-1">
              <div className="w-full p-4">
                <img alt="ecommerce" className=" h-72 object-cover object-center rounded border border-gray-200" src={`${BASE_URL}/public/images/${service.image}`} />
              </div>
              <div className=" w-full lg:py-4 mt-6 lg:p-3 lg:mt-0 ">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{service.category}</h2>
                <h1 className="text-blue-900 text-4xl title-font font-medium mb-1">{service.servicename}</h1>
                <p className="leading-relaxed">{service.description}</p>
                <div className="flex mb-4 mt-5">
                  <span className="flex items-center">
                  {/* <StarIcon className="w-5 h-5 text-yellow-400" />

                    <span className="text-gray-600 ml-3">4.5</span> */}
                  </span>

                </div>
                <div className="flex mt-6 items-center border-gray-200">

                  <span className="title-font font-medium text-3xl text-gray-900">{service.price}</span>
                </div>
                <p className="mb-6">*Extra Charges Applicable for Spare Parts</p>
                <div className="flex ">
                  <button onClick={handleModel} className=" text-blue-900 mr-8 border-blue-900 border-2 py-3 px-12 focus:outline-none hover:border-blue-600 hover:text-white hover:bg-blue-600 rounded-lg">Book Now</button>
                  <button className=" text-white bg-blue-900 border-0 py-3 px-12 focus:outline-none hover:bg-blue-600 rounded-lg" onClick={() => handleAddToCart(service._id, service.image, service.servicename, service.description, service.price)}>Add to cart</button>
                </div>
              </div>
            </div>}
          </div>

        </div>
      </div>
     {service && <Ratings serviceId={service._id}/>}
      {showModal && <BookNow action={handleModel} serviceData={service} />}
    </section>


  );
};

export default SingleService;
