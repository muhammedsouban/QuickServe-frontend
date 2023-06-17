import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { validateEmail } from '../../../validateForm';
import BASE_URL from '../../../config/config';
import { useState } from 'react';
import './login.css'

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all the blanks')
      return
    }
    if (!validateEmail(email)) {
      toast.error('Invalid Email , Please enter valid Email ID.')
      return;
    }
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
      const response = await axios.post(`${BASE_URL}/admin/login`, { email, password }, { headers });
      if (response.data && response.data.email) {
        localStorage.setItem('token', response.data.token);
        navigate('/admin');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="center1 max-w-[500px] w-full">
          <h1 className='text-2xl text-center'>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field1">
            <input
              type="text"
              title="Please enter a valid email address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label>Email</label>
          </div>

          <div className="txt_field1">
            <input
              type="password"
              title="Password should contain at least 6 characters"
              pattern=".{6,}"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <label>Password</label>
          </div>

          <button type="submit" className="w-full text-white bg-blue-900 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-xl mb-5 py-2.5 text-center ">LOGIN</button>
        </form>
      </div>
    </>

  );
}

export default AdminLogin;
