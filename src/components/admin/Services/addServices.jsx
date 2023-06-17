import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addService } from "../../../redux/Slice/serviceSlice";
import { BiArrowBack } from 'react-icons/bi';
import './addservice.css';
import { AddService, getCategories } from '../../../Api/AdminAPI';

const AddServiceModel = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categoryName, setCategoryName] = useState([])
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategoryName(data.map((item) => item.categoryName));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleGoBack = () => {
    onClose();
  };

  const onChange = (e) => {
    dispatch(addService({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { servicename, category, description, serviceincludes, price } = service;

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('servicename', servicename);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('serviceincludes', serviceincludes);
      formData.append('price', price);
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      AddService(formData, headers).then((data) => {
        if (data) {
          onClose();
        } else {
          alert(data.message);
        }

      })
    } catch (error) {
      console.log(error);
      alert(error.data.message);
    }
  };

  return (
    <div>
      <div className=' flex justify-center items-center'>

        <div className="bg-[#E8F5FF] w-full z-50 px-8 py-2 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <button className='top-0 relative left-5' onClick={handleGoBack}><BiArrowBack size={20} /></button>
            <h1 className='text-2xl text-center'>Add Services</h1>
            <div></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="profile flex justify-center">
              <img src={previewImage} className="profile_img" alt="Service" />
            </div>

            <div className="txt_field">
              <input
                type="text"
                title="Please enter Service Name"
                name="servicename"
                value={service.servicename}
                onChange={onChange}
                required
              />
              <label>Service Name</label>
            </div>
            <div className="txt_field">
              <select className='select-field' value={service.category} name='category' onChange={onChange}>
                <option value="">Choose Category</option>
                {categoryName.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {/* <label>Category</label> */}
            </div>
            <div className="txt_field">
              <textarea
                title="Please enter description"
                name="description"
                value={service.description}
                onChange={onChange}
                required
              ></textarea>
              <label>Description</label>
            </div>
            <div className="txt_field">
              <textarea
                id="includes"
                name="serviceincludes"
                value={service.serviceincludes}
                onChange={onChange}
                required
              ></textarea>
              <label>Service Includes</label>
            </div>

            <div className="txt_field">
              <input
                type="number"
                id="price"
                name="price"
                value={service.price}
                onChange={onChange}
                required
              />
              <label>Price</label>
            </div>
            <div className="txt_field">
              <input type="file" className='mt-3' id="image" name="image" onChange={handleImageChange} required />
            </div>
            <button type="submit" className="w-full text-white bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm mb-5 py-2.5 text-center ">ADD SERVICE</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default AddServiceModel;
