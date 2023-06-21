import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../admin/Login/login.css'
import { toast } from 'react-hot-toast';
import { Login } from '../../Api/providerAPI';

function ProviderLogin() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Login(email, password)
      if (response && response.data.email) {
        localStorage.setItem('ProviderToken', response.data.token);
        toast.success(response.data.message);

        navigate('/provider/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className='navbar flex justify-between items-center p-4 text-white'>
    <div className='flex  items-center'>
    <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
        Quick <span className='font-bold'>Serve</span>
      </h1>
    </div>
      <h1 className= 'text-yellow-400 text-2xl sm:text-2xl lg:text-4xl px-2'>
        Provider <span className='font-bold'>PANEL</span>
      </h1>
    </div>
      <div className="center1 max-w-[500px] w-full">
          <h1 className='text-2xl text-center'>Provider Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field1">
            <input
              type="text"
              title="Please enter a valid email address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
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
              required
            />
            <label>Password</label>
          </div>

          <button type="submit" className="w-full text-white bg-blue-900 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-xl mb-5 py-2.5 text-center ">LOGIN</button>
        </form>
      </div>
    </>

  );
}

export default ProviderLogin;
