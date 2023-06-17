import React, { useEffect, useState } from 'react';
import { getCategories, getCity } from '../../../Api/AdminAPI';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { HiOutlineMail } from 'react-icons/hi';
import { TbLetterQ } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([])
  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
    getCity().then((res) => {
      setCities(res.data);
    })
  }, []);

  return (
    <footer className="bg-[#394867] mt-10 text-center text-neutral-200 lg:text-left">
      <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
        <div className="mr-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex justify-center">
          <a href="/" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <FaFacebook className="h-4 w-4" />
          </a>
          <a href="/" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <FaTwitter className="h-4 w-4" />
          </a>
          <a href="/" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <FaInstagram className="h-5 w-5" />
          </a>
          <a href="/" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <FaLinkedin className="h-4 w-4" />
          </a>
          <a href="/" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <FaGithub className="h-4 w-4" />
          </a>
          <a href="/" className="text-neutral-600 dark:text-neutral-200">
            <IoLogoYoutube className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4 justify-center">
          <div className="">
            <h6 className="mb-4 flex items-center justify-center font-semibold text-lg md:justify-start">
              <TbLetterQ size={25} className="mr-1 font-bold" />
              QuickServe
            </h6>
            <p>
              Quickserve is your go-to local service provider app. We connect you with trusted professionals for all your needs.
              From home services to event planning, our platform offers convenience and reliability. Find the best service providers
              in your area, hassle-free, with Quickserve.
            </p>
          </div>
          <div className="md:justify-center flex ">
            <div className="">

              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">Categories</h6>
              {categories.length > 0 && categories.map((items) => (
                <Link to={`/services/${items.categoryName}`}>
                  <p className="mb-4">
                    <p className="text-neutral-600 dark:text-neutral-200">
                      {items.categoryName}
                    </p>
                  </p>
                </Link>
              ))}

            </div>
          </div>
          <div className="md:justify-center flex ">

            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">Cities</h6>
              {cities && cities.length > 0 ? (
                cities.map((item) => (
                  <p className="mb-4" key={item._id}>
                    <p className="text-neutral-600 dark:text-neutral-200">
                      {item.cityName}
                    </p>
                  </p>
                ))
              ) : (
                <p>No cities found.</p>
              )}



            </div>
          </div>


          <div className="md:justify-center flex ">
            <div>
              <h6 className="mb-4 flex justify-start font-semibold uppercase ">Contact</h6>
              <p className="mb-4">
                <a href="/" className="text-neutral-600 flex items-center dark:text-neutral-200">
                  <HiOutlineMail className="mr-2 h-4 w-4" />
                  <p>info@QuickServe.com</p>
                </a>
              </p>
              <p>
                <span className="text-neutral-600 dark:text-neutral-200">Bangalore, Karnataka, India</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-950 py-4">
        <div className="text-center text-sm text-neutral-600 dark:text-neutral-200">
          © 2023 QuickServe. All rights reserved.
        </div>
      </div>
    </footer >
  );
};

export default Footer;
