import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './categorylist.css'
import { getCategories } from '../../Api/AdminAPI';
import BASE_URL from '../../config/config';
const CategorySlider = () => {
  const [category, setCategory] = useState([])

  useEffect(() => {
    getCategories().then((data) => {
      setCategory(data);
    });
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          arrows: true, 
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          arrows: true, 
        },
      },
    ],
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="w-[70%]">
        <Slider {...settings}>
          {category.map((category) => (
            <div key={category._id} className="flex justify-center">
               <Link to={`/services/${category.categoryName}`}> 
              <div className="flex flex-col items-center mx-2">
                <img
                  src={`${BASE_URL}/public/images/${category.image}`}
                  alt={category.categoryName}
                  className="max-w-40 max-h-40 object-cover rounded-full"
                />
                <p className="mt-2 text-center">{category.categoryName}</p>
              </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategorySlider;
