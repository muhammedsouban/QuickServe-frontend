import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import './login.css'
import { validateEmail } from '../../../validateForm';
import { useDispatch } from 'react-redux';
import { userData } from '../../../redux/Slice/userSlice'
import { userLogin } from '../../../Api/userAPI';
import toast from 'react-hot-toast';

function UserLogin() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill all the blanks')
      return
    }
    if (!validateEmail(email)) {
      toast.error('Invalid Email , Please enter valid Email ID.')
      return;
    }

    await userLogin(email, password).then((res) => {
      if (res.data.error) {
        toast.error(res.data.error)
      } else {
        localStorage.setItem("userToken", res.data.token)
        dispatch(userData({ field: 'data', value: res.data.userData }))
        navigate('/')
      }
    })
  }

  return (
    <>
      <div className="center1 max-w-[500px] w-full">
        <h1 className='text-2xl text-center'>Login</h1>
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
          <button type="submit" className="w-full text-white bg-blue-900 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-xl py-2.5 text-center ">LOGIN</button>
        </form>
        <div className="signup_link">
          Not a member? <Link to="/register">Register</Link>
        </div>
      </div>
    </>

  );
}

export default UserLogin;
