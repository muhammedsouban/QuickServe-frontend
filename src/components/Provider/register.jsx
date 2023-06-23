import axios from 'axios';
import { useState, useEffect } from 'react';
import { BiArrowBack, BiCamera } from 'react-icons/bi';
import './register.css';
import { getCategories, getCity } from '../../Api/AdminAPI';
import { toast } from 'react-hot-toast';
import { Register } from '../../Api/providerAPI';

const ProviderRegister = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [passwordError, setPasswordError] = useState('');

  const [Category, setCategory] = useState([])
  const [city, setCity] = useState([])

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };
  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategory(res.map((item) => item.categoryName));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
    getCity()
      .then((res) => setCity(res.data))
      .catch((error) => {
        console.error("Error fetching Cities:", error);
      });
  }, []);
  const [provider, setProvider] = useState({
    username: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    pincode: '',
    category: '',
    experience: '',
    availability: '',
    languages: '',
    description: '',
    password: '',
    CPassword: ''
  });

  const handleGoBack = () => {
    onClose();
  };

  const onChange = (e) => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (provider.password !== provider.CPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('username', provider.username);
      formData.append('email', provider.email);
      formData.append('phone', provider.phone);
      formData.append('location', provider.location);
      formData.append('address', provider.address);
      formData.append('pincode', provider.pincode);
      formData.append('category', provider.category);
      formData.append('experience', provider.experience);
      formData.append('availability', provider.availability);
      formData.append('languages', provider.languages);
      formData.append('description', provider.description);
      formData.append('password', provider.password);

      await Register(formData).then((res) => {
        if (res.data.email) {
          toast.success('Registered Successfully we will get you soon')
          onClose()
        } else {
          toast.error(res.data.message);
        }
      })

    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    }
  };

  return (
    <div className="Register-container">
      <div className="Register-center rounded-sm max-w-[800px] z-50 px-4 sm:px-0">
        <div className="flex justify-between items-center mb-5">
          <button className="top-0 obsolute left-3" onClick={handleGoBack}>
            <BiArrowBack size={20} />
          </button>
          <h1 className="text-lg  text-center">Provider Registration</h1>
          <div></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">Personal Details</div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={onChange}
                value={provider.username}
                type="text"
                name="username"

                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                pattern="^(?!\\s)[^\s]+$"
                title='Please enter a valid username'
                required
              />
              <label
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-85 top-3 z-10 ms-2 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6"
              >
                Username
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input onChange={onChange} value={provider.email} type="email" name="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                title="Please enter a valid email address" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-85 top-3 z-10 ms-2 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6">Email</label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input onChange={onChange} value={provider.phone} pattern="[0-9]{10}"
                title="Please enter a 10-digit number"
                type="text" name="phone" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-85 top-3 z-10 ms-2 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6">Mobile No.</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <select onChange={onChange} value={provider.location} name="location" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                <option value="">Choose City</option>
                {city?.map((item) => (
                  <option key={item._id} value={item.cityName}>{item.cityName}</option>
                ))}
              </select>
            </div>

          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input onChange={onChange} value={provider.address} type="text" name="address" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-85 top-3 z-10 ms-2 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6">Permenent Address</label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input onChange={onChange} value={provider.password} minLength={6} type="password" name="password" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-85 top-3 z-10 ms-2 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6">Password</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input onChange={onChange} value={provider.CPassword} type="password" name="CPassword" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-85 top-3 z-10 ms-2 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6">Confirm password</label>
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
          </div>

          <div className='mb-4'>job Details</div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full group mb-4">
              <select onChange={onChange} value={provider.category} name="category" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                <option value="">Choose Category</option>
                {Category?.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

            </div>
            <div className="relative z-0 w-full group mb-4">
              <input onChange={onChange} value={provider.experience} type="text" name="experience" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-85 top-3 z-10 ms-2 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6">Experience</label>
            </div>

            <div className="relative z-0 w-full  group mb-4">
              <input onChange={onChange} value={provider.availability} type="text" name="availability" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-85 top-3 z-10 ms-2 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6">Availability</label>
            </div>
            <div className="relative z-0 w-full  group mb-4">
              <input onChange={onChange} value={provider.languages} type="text" name="languages" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-85 top-3 z-10 ms-2 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6">Known Language</label>
            </div>

            <div className="relative z-0 w-full  group mb-4">
              <input onChange={onChange} value={provider.description} type="text" name="description" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-white rounded border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-85 top-3 z-10 ms-2 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6">Job Description</label>
            </div>
            <div className="relative z-0 w-full  group mb-4">

              <div className="mb-5 flex items-center">
                <label className="cursor-pointer">
                  <input
                    onChange={handleImageChange}
                    type="file"
                    className="sr-only"
                    required
                  />
                  <div className="flex items-center">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500">
                          <BiCamera size={20} />
                        </span>
                      </div>
                    )}
                    <span className="ml-3">Upload Image</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full px-6 py-2 rounded bg-blue-950 text-white hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderRegister;
