import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {userData} from '../../../redux/Slice/userSlice'
import { userSignup } from '../../../Api/userAPI';

const Signup = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  const signup = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };
  
  const onChange = (e) => {
    dispatch(userData({ field: e.target.name, value: e.target.value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('username', signup.username);
      formData.append('email', signup.email);
      formData.append('mobile', signup.mobile);
      formData.append('password', signup.password);
      const response = await userSignup(formData);
      
      if (response.data.email) {
        navigate('/Login');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  
  return (
    <div className="center1">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="profile flex justify-center py-4">
          <img src={previewImage} className="profile_img" alt="Profile" />
        </div>
        
        <div className="txt_field1">
          <input
            type="text"
            title="Please enter a valid username"
            name="username"
            value={signup.username}
            onChange={onChange}
            required
          />
          <label>Username</label>
        </div>
        
        <div className="txt_field1">
          <input
            type="email"
            title="Please enter a valid email"
            name="email"
            value={signup.email}
            onChange={onChange}
            required
          />
          <label>Email</label>
        </div>
        
        <div className="txt_field1">
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={signup.mobile}
            onChange={onChange}
            required
          />
          <label>Mobile</label>
        </div>
        
        <div className="txt_field1">
          <input
            type="password"
            id="password"
            name="password"
            value={signup.password}
            onChange={onChange}
            required
          />
          <label>Password</label>
        </div>
        
        <div className="txt_field1">
          <input type="file" id="image" name="image" onChange={handleImageChange} required />
        </div>
        
        <input type="submit" value="Signup" />
        
        <div className="signup_link">
          Already a member? <Link to="/Login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
