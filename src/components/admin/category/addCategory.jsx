import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { addCategory } from '../../../Api/AdminAPI';
import toast from 'react-hot-toast';

const AddCategoryModel = ({ onClose, category }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };

  const handleGoBack = () => {
    onClose();

  };

  const onChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const existingCategory = category.find((category) => category.categoryName.toLowerCase() === categoryName.toLowerCase());
      if (existingCategory) {
        toast.error('category already exists!');
        return;
      }
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('categoryName', categoryName);
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      const response = await addCategory(formData, headers)
      if (response) {
        toast.success('category added successfully');
        onClose();

      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.message);
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center'>

        <div className="  bg-[#E8F5FF]  z-50 px-8 py-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <button className="top-0 relative left-5" onClick={handleGoBack}>
              <BiArrowBack size={20} />
            </button>
            <h1 className="text-2xl text-center">Add Category</h1>
            <div></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="profile flex justify-center">
              <img src={previewImage} className="profile_img" alt="Service" />
            </div>

            <div className="txt_field">
              <input
                type="text"
                title="Please enter Category Name"
                name="categoryName"
                value={categoryName}
                onChange={onChange}
                required
              />
              <label>Category Name</label>
            </div>

            <div className="txt_field">
              <input
                type="file"
                id="image"
                name="image"
                className='mt-3'
                onChange={handleImageChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm py-2.5 text-center "
            >
              ADD CATEGORY
            </button>
          </form>
        </div>
      </div>
      </div>

      );
};

      export default AddCategoryModel;
