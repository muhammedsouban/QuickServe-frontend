import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaWallet } from 'react-icons/fa';
import { BiCurrentLocation, BiLogOut } from 'react-icons/bi';
import { MdFavorite, MdHelp, MdLocationOn, MdPerson, MdShoppingCart, MdSearch, MdLogin } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateCity, Location } from '../../../redux/Slice/locationSlice';
import { BsChevronDown, BsPersonGear } from 'react-icons/bs'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getCity } from '../../../Api/AdminAPI';

const Navbar = ({ role }) => {
  const [nav, setNav] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [showAddress, setShowAddress] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const location = useSelector((state) => state.location);

  const dispatch = useDispatch();
  const [city, setCity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCity().then((res) => {
      setCity(res.data);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          axios
            .get(url)
            .then((response) => {
              const data = response.data.address;
              const matchedCity = res.data?.find((item) => item.cityName === data.city);
              if (matchedCity) {
                dispatch(Location({ field: "data", value: data }));
                dispatch(UpdateCity(data.city));
              } else {
                dispatch(UpdateCity('we will back soon..'));
                dispatch(Location({ field: "data", value: '' }));
              }
            })
            .catch((error) => {
              console.error(error);
            });
        },
        (error) => {
          console.error('An error occurred while getting geolocation:', error);
        }
      );
    });
  }, []);

  const toggleNav = () => {
    setNav(!nav);
  };

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        axios.get(url).then((res) => {
          const data = res.data.address;
          const selectedCity = data.city || data.town || data.village || '';
          handleSelectedLocation(selectedCity, data);
          toast.success(`Location Detected: ${selectedCity}`);
        });
      });
    } else {
      console.error('Location is not supported by this browser.');
    }
  };

  const handleSelectedLocation = (selectedLocation, data) => {
    const cityItem = city.find((cityItem) =>
      selectedLocation.toLowerCase().includes(cityItem.cityName.toLowerCase())
    );

    if (cityItem) {
      setShowSearch(false);
      dispatch(UpdateCity(cityItem.cityName));
      if (data) {
        dispatch(Location({ field: 'data', value: data }))
      } else {
        dispatch(Location({ field: 'data', value: selectedLocation }))
      }
      toast.success(`selected : ${cityItem.cityName}`)
    } else {
      dispatch(UpdateCity('Sorry we are not here'))
      dispatch(Location({ field: 'data', value: '' }))
      toast.error('Sorry, we are not in your city');
      setShowSearch(false);

    }
  };


  const handlePlaceSuggestion = (predictions) => {
    const results = predictions.map((prediction) => prediction.display_name);
    setPlaceSuggestions(results);
  };

  const handlePlaceSelection = (place) => {
    setPlaceSuggestions([]);
    handleSelectedLocation(place)
  };
  const headers = { Authorization: `Bearer ${localStorage.getItem('userToken')}` };

  const fetchPlaceSuggestions = (event) => {
    setLocationInput(event);
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${event}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const predictions = response.data;
        handlePlaceSuggestion(predictions);
      })
      .catch((error) => {
        console.error('Error fetching place suggestions:', error);
      });
  };

  const handleNavLink = (path) => {
    if (headers && headers.Authorization !== 'Bearer null') {
      navigate(path);
      setNav(!nav);

    } else {
      toast('Please login');
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    navigate('/')
  };

  return (
    <div className="fixed top-0 navbar flex justify-between items-center p-4 text-white z-10">
      <div className="flex items-center">
        <NavLink to={'/'}>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
            Quick <span className="font-bold">Serve</span>
          </h1></NavLink>
        <div className="hidden lg:flex items-center ms-5 p-1 text-[18px]">
          <div
            className="hidden lg:flex items-center ms-5 p-1 text-[18px] cursor-pointer"
            onClick={handleSearch}
            onMouseEnter={(() => setShowAddress(true))}
            onMouseLeave={(() => setShowAddress(false))}

          >
            <MdLocationOn color="red" size={25} />
            <p className="p-2">{location.data.city}</p>
            <BsChevronDown />
          </div>

          {showAddress && (
            <div
              className="absolute bg-white p-2 rounded-md border shadow text-black"
              style={{ top: '70px', left: '300px' }}
            >
              <div className="w-4 h-4 bg-white absolute top-[2px] left-2 -rotate-45 transform origin-top-left" />
              <p className="text-[11px] mb-2">Recent Search</p>
              {location.data.data.city ? (
                <div>
                  <p className="text-[14px]">{location.data.data.road}</p>
                  <p className="text-[14px]">{location.data.data.suburb}</p>
                  <p className="text-[14px]">{location.data.data.city_district}</p>
                  <p className="text-[14px]">{location.data.data.county}</p>
                </div>
              ) : (
                <div>
                  <p className="text-[14px] w-[180px]">{location.data.data}</p>
                </div>
              )}
            </div>
          )}
          {showSearch && (
            <div
              className="absolute bg-white p-2 rounded-md border shadow text-black"
              style={{ top: '70px', left: '300px' }}
            >
              <div className="w-4 h-4 bg-white absolute top-[2px] left-2 -rotate-45 transform origin-top-left" />
              <div className="flex justify-between">
                <div className="flex cursor-pointer" onClick={getCurrentLocation}>
                  <BiCurrentLocation className="z-10" color="blue" />
                  <p className="z-10 text-sm text-blue-800">Current location</p>
                </div>
                <AiOutlineClose color="black" size={13} onClick={handleSearch} />
              </div>
              <div className="width-[100px] h-[1px] bg-gray-300 mt-2" />
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-200 dark:text-black">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MdSearch color="grey" size={20} />
                </div>
                <input
                  type="search"
                  value={locationInput}
                  onChange={((event) => fetchPlaceSuggestions(event.target.value))}
                  id="default-search"
                  className="block w-full p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg focus:ring-blue-500 dark:bg-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
                  placeholder="Search City/Area"
                  required
                />
                {placeSuggestions.length > 0 && (
                  <ul className="absolute bg-white w-full mt-2 rounded-md border shadow">
                    {placeSuggestions.map((place, index) => (
                      <li
                        key={index}
                        className="py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={() => handlePlaceSelection(place)}
                      >
                        {place}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {nav && <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>}

      <div className="sm:flex items-center ms-5 p-1 text-[18px]">
        {role ? <NavLink to="/">
          <p className="p-2 ">Book a service</p>
        </NavLink> : <NavLink to="/provider/register">
          <p className="p-2 hidden sm:flex">Register as profession</p>
        </NavLink>}
        {headers && headers.Authorization !== 'Bearer null' ? (
          <NavLink onClick={logout} className="flex items-center">
            <MdPerson size={25} className="ms-5 hidden sm:flex" />
            <p className="p-2 hidden sm:flex">Logout</p>
          </NavLink>
        ) : (
          <NavLink to="/login" className="flex items-center">
            <MdPerson size={25} className="ms-5 hidden sm:flex" />
            <p className="p-2 hidden sm:flex">Login</p>
          </NavLink>
        )}
        {role ? '' : <div onClick={toggleNav} className="cursor-pointer ms-5">
          <AiOutlineMenu size={30} />
        </div>}
      </div>
      <div
        className={`sidebar fixed top-0 ${nav ? 'right-0' : 'left-[-100%]'} w-[300px] h-screen text-white bg-blue-900 z-10 duration-300`}
      >
        <AiOutlineClose onClick={toggleNav} size={30} className="absolute right-4 top-4 cursor-pointer" />
        <h2 className="text-2xl p-4">
          Quick <span className="font-bold">Serve</span>
        </h2>
        <nav>

          <ul className="flex flex-col p-4 text-white ">
            <div className=" lg:hidden flex items-center ms-5 p-1 text-[18px]">
              <div
                className=" lg:hidden flex items-center ms-5 p-1 text-[18px] cursor-pointer"
                onClick={handleSearch}
                onMouseEnter={(() => setShowAddress(true))}
                onMouseLeave={(() => setShowAddress(false))}

              >
                <MdLocationOn color="red" size={25} />
                <p className="p-2">{location.data.city}</p>
                <BsChevronDown />
              </div>

              {showAddress && (
                <div
                  className="absolute mt-44 ml-8 bg-white p-2 rounded-md border shadow text-black"
                >
                  <div className="w-4 h-4 bg-white absolute top-[2px] left-2 -rotate-45 transform origin-top-left" />
                  <p className="text-[11px] mb-2">Recent Search</p>
                  {location.data.data.city ? (
                    <div>
                      <p className="text-[14px]">{location.data.data.road}</p>
                      <p className="text-[14px]">{location.data.data.suburb}</p>
                      <p className="text-[14px]">{location.data.data.city_district}</p>
                      <p className="text-[14px]">{location.data.data.county}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[14px] w-[180px]">{location.data.data}</p>
                    </div>
                  )}
                </div>
              )}
              {showSearch && (
                <div
                  className="absolute mt-44 bg-white p-2 rounded-md border shadow text-black"
                >
                  <div className="w-4 h-4 bg-white absolute top-[2px] left-2 -rotate-45 transform origin-top-left" />
                  <div className="flex justify-between">
                    <div className="flex cursor-pointer" onClick={getCurrentLocation}>
                      <BiCurrentLocation className="z-10" color="blue" />
                      <p className="z-10 text-sm text-blue-800">Current location</p>
                    </div>
                    <AiOutlineClose color="black" size={13} onClick={handleSearch} />
                  </div>
                  <div className="width-[100px] h-[1px] bg-gray-300 mt-2" />
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-200 dark:text-black">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MdSearch color="grey" size={20} />
                    </div>
                    <input
                      type="search"
                      value={locationInput}
                      onChange={((event) => fetchPlaceSuggestions(event.target.value))}
                      id="default-search"
                      className="block w-full p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg focus:ring-blue-500 dark:bg-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
                      placeholder="Search City/Area"
                      required
                    />
                    {placeSuggestions.length > 0 && (
                      <ul className="absolute bg-white w-full mt-2 rounded-md border shadow">
                        {placeSuggestions.map((place, index) => (
                          <li
                            key={index}
                            className="py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => handlePlaceSelection(place)}
                          >
                            {place}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
            <NavLink to="/provider/register">
              <li className="text-xl py-4 flex cursor-pointer lg:hidden">
                <BsPersonGear size={25} className='mr-4' /> Register as profession
              </li>
            </NavLink>
            {headers && headers.Authorization !== 'Bearer null' ? (
              <NavLink onClick={logout} className="flex items-center text-xl py-4 lg:hidden ">
                <BiLogOut size={25} className="mr-4 " />
                Logout
              </NavLink>
            ) : (
              <NavLink to="/login" onClick={toggleNav} className="lg:hidden flex items-center text-xl py-4">
                <MdLogin size={25} className="mr-4 " />
                Login
              </NavLink>
            )}
            <li onClick={(() => handleNavLink('/profile'))} className="text-xl py-4 flex cursor-pointer">
              <MdPerson size={25} className="mr-4" /> Profile
            </li>
            <li onClick={(() => handleNavLink('/cart'))} className="text-xl py-4 flex cursor-pointer">
              <MdShoppingCart size={25} className="mr-4" /> Cart
            </li>
            <li onClick={(() => handleNavLink('/bookings'))} className="text-xl py-4 flex cursor-pointer">
              <TbTruckDelivery size={25} className="mr-4" /> Bookings
            </li>
            {/* <li onClick={(() => handleNavLink('/favourites'))} className="text-xl py-4 flex cursor-pointer">
              <MdFavorite size={25} className="mr-4" /> Favorites
            </li> */}
            {/* <li onClick={(() => handleNavLink('/wallet'))} className="text-xl py-4 flex cursor-pointer">
              <FaWallet size={25} className="mr-4" /> Wallet
            </li> */}
            {/* <NavLink to={'/help'}><li className="text-xl py-4 flex cursor-pointer">
              <MdHelp size={25} className="mr-4" /> Help
            </li></NavLink> */}


          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
