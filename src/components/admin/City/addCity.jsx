import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { addCity} from '../../../Api/AdminAPI';
import toast from 'react-hot-toast'

const AddCityModel = ({ onClose, City }) => {
    const [cityName, setCityName] = useState('');
    const handleGoBack = () => {
        onClose();
    };
    const onChange = (e) => {
        setCityName(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
            const existingCity = City.find((city) => city.cityName.toLowerCase() === cityName.toLowerCase());
            if (existingCity) {
                toast.error('City already exists!');
                return;
            }

            const response = await addCity(cityName, headers);
            if (response) {
                toast.success('city added succesfully')
                onClose();
            } else {
                toast(response.message);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };


    return (
        <div>
            <div className="center bg-white max-w-[400px] sm:w-1/2 z-50">
                <div className="flex justify-between ">
                    <button className="top-0 relative left-5" onClick={handleGoBack}>
                        <BiArrowBack size={20} />
                    </button>
                    <h1 className="text-2xl text-center">Add City</h1>
                    <div></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input
                            type="text"
                            title="Please enter Category Name"
                            name="categoryName"
                            value={cityName}
                            onChange={onChange}
                            required
                        />
                        <label>City Name</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm mb-5 py-2.5 text-center "
                    >
                        ADD CITY
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCityModel;
