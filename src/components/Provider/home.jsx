import React, { useEffect, useState } from "react";
import ProviderRegister from "./register";
import Navbar from "../user/Navbar/Navbar";
import BASE_URL from "../../config/config";
import { getCategories, getMedia } from "../../Api/AdminAPI";
import Footer from '../user/Footer/Footer'
import { GiCheckMark } from 'react-icons/gi'
import Loader from "../Loader";
export default function ProviderLanding() {
  const [showModal, setShowModal] = useState(false)
  const [category, setCategory] = useState([])
  const [media, setMedia] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((res) => {
      setCategory(res);
    })
    const fetchMedia = async () => {
      try {
        await getMedia().then(response => {
          setMedia(response.data);
          setLoading(false)

        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedia();
  }, [])
  const toggleModal = () => {
    setShowModal(!showModal)
  }


  return (
    <>
      <Navbar role={'provider'} />
      {loading ?
        <Loader />
        : <main>
          <div className="relative w-full h-full flex content-center items-center justify-center min-h-screen-75">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${BASE_URL}/public/images/${media?.banner[0].image})`,
              }}
            >
            </div>
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 py-36 px-4 ml-auto mr-auto text-center">
                  <div className="">
                    <h1 className=" font-semibold text-5xl">
                      Join Our Team <br /> Change Your Life
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                      Become a part of a community with more than 50,000 service professionals
                    </p>
                    <button
                      className="bg-blue-900 hover:bg-blue-700 text-lg text-white font-bold py-2 mt-5 px-4 rounded"
                      onClick={toggleModal}
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="pb-20 bg-blueGray-200 -mt-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                <div className=" pt-10 w-full md:w-4/12 px-4 ">
                  <div className="relative flex items-center justify-center py-8 min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="ms-5 h-20 w-20 rounded-full bg-blue-300">
                    </div>
                    <div className="px-4 ">
                      <h6 className="text-3xl font-semibold">5000+</h6>
                      <p className=" text-blueGray-500">
                        Professionals Worldwide
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-4/12 px-4">
                  <div className="relative flex items-center py-8 justify-center min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="ms-5 h-20 w-20 rounded-full bg-blue-300">
                    </div>
                    <div className=" px-4">
                      <h6 className=" text-3xl font-semibold">1500Cr +</h6>
                      <p className=" text-blueGray-500">
                        Paid to partners in 2022
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-10 w-full md:w-4/12 px-4">
                  <div className="relative flex items-center justify-center min-w-0 break-words py-8  bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="ms-5 h-20 w-20 rounded-full bg-blue-300">
                    </div>
                    <div className="px-4 ">
                      <h6 className="text-3xl font-semibold">12Lakh +</h6>
                      <p className="text-blueGray-500">
                        services delivered last month globally
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center mt-10">
                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                  <h3 className="text-3xl mb-2 font-semibold leading-normal text-blue-900">
                    Working with us is a pleasure
                  </h3>
                  <p className="text-lg  leading-relaxed mt-4 mb-4 ">
                    Welcome to QuickServe team, where your expertise and skills are highly valued! We take immense pride in fostering a partnership that not only benefits our esteemed professionals but also delivers a truly pleasurable experience. Join our growing network of exceptional providers and unlock an array of opportunities tailored to your unique talents.
                  </p>

                </div>

                <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                    <img
                      alt="..."
                      src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                      className="w-full align-middle rounded-t-lg"
                    />

                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative py-20">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blue-900 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>

            <div className="container mx-auto px-4">
              <div className="items-center flex flex-wrap">
                <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                  <img
                    alt="..."
                    className="max-w-full rounded-lg shadow-lg"
                    src="https://plus.unsplash.com/premium_photo-1661270438246-51c54f87b204?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">

                    <h3 className="text-3xl font-semibold text-blue-900">A growing company</h3>
                    <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                      Quickserve is a dynamic and thriving company, where growth lies at the heart of everything we do. Join us on a journey filled with boundless opportunities to expand your professional horizons, elevate your skills, and achieve unparalleled success.
                    </p>
                    <ul className="list-none mt-6 px-4">
                      <li className="py-2 list-disc">
                        <div className="flex items-center">
                          <div>
                            <h4 className="text-blueGray-500">
                              Expanding Cities, Connecting Professionals.
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2 list-disc">
                        <div className="flex items-center">
                          <div>
                            <h4 className="text-blueGray-500">
                              Timely Service Delivery for Customer Satisfaction.
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2 list-disc">
                        <div className="flex items-center">
                          <div>
                            <h4 className="text-blueGray-500">
                              10,000+ Users and Growing: Access Exceptional Services.
                            </h4>
                          </div>
                        </div>
                      </li>
                    </ul>

                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-20 pb-48">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center text-center mb-24">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold text-blue-900">Join us in following categories</h2>
                </div>
              </div>
              <div className="flex flex-wrap">
                {category?.map((item) => (<div key={item._id} className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt={item.categoryName}
                      src={`${BASE_URL}/public/images/${item.image}`}
                      className="shadow-lg rounded-full mx-auto max-w-[130px]"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">{item.categoryName}</h5>
                    </div>
                  </div>
                </div>))}

              </div>
            </div>
          </section>

          <section className="pb-20 relative block bg-blueGray-800">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blue-900 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>

            <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
              <div className="flex flex-wrap text-center justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold text-blue-900">
                    Join QuickServe in 3 easy steps
                  </h2>
                </div>
              </div>
              <div className="flex flex-wrap mt-12 justify-center">
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-blue-900 inline-flex items-center justify-center">
                    <h2 className="text-xl font-bold text-white ">1</h2>
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-blue-900">
                    Apply Online
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-400">
                    Click on register as profession and fill the form, then we will shedule a interview with our team
                  </p>
                  <button
                    className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={toggleModal}
                  >
                    Register Now
                  </button>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-blue-900 inline-flex items-center justify-center">
                    <h2 className="text-xl font-bold text-white ">2</h2>
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-blue-900">
                    Meet Our trainer
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-400">
                    Keep your identity documents and a police check. We can help you get one as well.
                  </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-blue-900 inline-flex items-center justify-center">
                    <h2 className="text-xl font-bold text-white ">3</h2>
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-blue-900">
                    Practical Training
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-400">
                    Successful candidates will be invited to our office so that they can complete the process.
                  </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-green-600 inline-flex items-center justify-center">
                    <GiCheckMark color="white" className="font-bold" size={20} />
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-blue-900">
                    GO live and start earning
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-400">
                    It's showtime! You start receiving leads as soon as you create your profile on our partner app.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">

                  </div>
                </div>
              </div>
            </div>

            {showModal && (
              <div className="modal-overlay">
                <ProviderRegister title="Add Service" onClose={toggleModal}>
                </ProviderRegister>
              </div>


            )}
          </section>
          <Footer />
        </main >}
    </>
  );
}
