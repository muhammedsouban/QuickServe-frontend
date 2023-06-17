import { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsSearch, BsGeoAlt, BsCheck } from 'react-icons/bs';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import toast from 'react-hot-toast'
import { addAddress } from '../../../Api/userAPI';
const Map = ({ address, map }) => {
    const [position, setPosition] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [house, setHouse] = useState('');
    const [landmark, setLandmark] = useState('');

    const handleGoBack = () => {
        map();
        address();
    };
    const data = {
        house: house,
        landmark: landmark,
        address: selectedAddress
    }
    const headers = { Authorization: `Bearer ${localStorage.getItem('userToken')}` };

    const handleSubmit = () => {
        if (house && landmark) {
            addAddress(data, headers)
            map();
            address();
        } else {
            toast.error('please fill all fields')
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition([latitude, longitude]);
                getAddressFromCoordinates(latitude, longitude);
            },
            (err) => {
                console.log(err);
            }
        );
    }, []);

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setPosition([latitude, longitude]);
            getAddressFromCoordinates(latitude, longitude);
        });
    };

    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            console.log(data);
            const address = data?.display_name;
            setSelectedAddress(address);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        if (value) {
            fetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    const fetchSuggestions = async (query) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const { lat, lon } = suggestion;
        setPosition([lat, lon]);
        getAddressFromCoordinates(lat, lon);
        setSuggestions([]);
        setSearchValue('');
    };

    const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: markerIconShadow,
        shadowSize: [41, 41],
    });

    return (
        <div>
           <div className='flex justify-center items-center absolute left-0 right-0 bottom-0 top-0'>
          <div className="  bg-[#E8F5FF] max-w-[600px] rounded-lg shadow-lg">
                <div className="grid lg:grid-cols-2 sm:grid-cols-1">
                    <div className="h-full relative">
                        <button className="absolute left-3 top-3 z-20" onClick={handleGoBack}>
                            <BiArrowBack size={20} />
                        </button>
                            <h1 className="text-2xl flex sm:hidden justify-center items-center mt-2 text-center">Add Address</h1>
                            <div></div>

                        <div className="h-full sm:flex hidden relative z-10">
                            {position && (
                                <MapContainer center={position} zoom={13} zoomControl={false} className="w-full h-full rounded-s-xl">
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={position} icon={customIcon} />
                                    <ZoomControl position="bottomright" />
                                </MapContainer>
                            )}
                        </div>
                    </div>

                    <div className="m-5">
                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchValue}
                                onChange={handleSearchChange}
                                className="mr-2 p-2 bg-white border border-gray-300 rounded-lg w-full"
                            />
                            <button className="p-2 bg-white border border-gray-300 rounded-full">
                                <BsSearch size={20} />
                            </button>
                        </div>
                        {suggestions.length > 0 && (
                            <div className="bg-white border min-w-[300px] max-w-[400px] border-gray-300 p-2 rounded-lg absolute left-1/2 transform -translate-x-1/2 w-full max-h-60 overflow-y-auto z-30 mt-2">
                                {suggestions.map((suggestion) => (
                                    <div
                                        key={suggestion.place_id}
                                        className="cursor-pointer py-  px-2 hover:bg-gray-100"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion.display_name}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div onClick={getCurrentLocation} className="flex items-center mb-4 cursor-pointer">
                            <button className="p-2 bg-white border border-gray-300 rounded-full">
                                <BsGeoAlt size={20} />
                            </button>
                            <span className="ml-2">Use Current Location</span>
                        </div>

                        <div className="mb-4 h-24">
                            <h2>{selectedAddress}</h2>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="House or Flat Number"
                                className="p-2 bg-white border border-gray-300 rounded-lg w-full"
                                required
                                value={house}
                                onChange={(e) => setHouse(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Landmark and City"
                                className="p-2 bg-white border border-gray-300 rounded-lg w-full"
                                value={landmark}
                                onChange={(e) => setLandmark(e.target.value)}
                            />
                        </div>
                        <hr className="border-gray-400 mb-4" />
                        <button
                            type="submit"
                            className="w-full py-2.5 bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-white"
                            onClick={handleSubmit}
                        >
                            <BsCheck className="inline-block mr-2" size={18} />
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>

    );
};

export default Map;
