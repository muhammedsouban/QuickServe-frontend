import React, { useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { MdPerson, MdCategory, MdMiscellaneousServices, MdOutlineLogout } from 'react-icons/md';
import { BsPersonGear } from 'react-icons/bs';
import { RiDashboardFill } from 'react-icons/ri';
import { GoFileMedia } from 'react-icons/go';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GiModernCity } from 'react-icons/gi'
import { BiChat } from 'react-icons/bi';

const AdminNavbar = () => {
  const [nav, setNav] = useState(false);
  const Navigate = useNavigate()

  const closeSidebar = () => {
    setNav(false);
  };

  const handleNavLinkFocus = (event) => {
    event.target.style.color = 'yellow';
  };

  const handleNavLinkBlur = (event) => {
    event.target.style.color = 'inherit';
  };

  const Logout = () => {
    localStorage.removeItem('token');
    Navigate('/admin/login')
  }

  return (
    <div className='fixed top-0 navbar flex justify-between items-center p-4 text-white z-10'>
      <div className='flex items-center'>
        <div className='block lg:hidden' onClick={() => setNav(!nav)}>
          <AiOutlineMenu size={30} />
        </div>
        <div className='block'>

          <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
            Quick <span className='font-bold'>Serve</span>
          </h1>
        </div>

      </div>

      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}
      <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
        Admin <span className='font-bold'>Panel</span>
      </h1>

      <div className={nav ? 'sidebar fixed top-0 left-0 w-[300px] h-screen text-white bg-blue-900 z-10 duration-300' : 'hidden lg:block sidebar fixed top-[70px] left-0 w-[300px] h-screen text-white bg-blue-900 z-10 duration-300'}>
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className='block absolute left-4 top-4 lg:hidden cursor-pointer'
        />
        <h2 className='block lg:hidden ml-16 text-2xl p-4'>
          Quick <span className='font-bold'>Serve</span>
        </h2>

        <nav>
          <ul className='flex flex-col text-white'>
            <NavLink to={'/admin/'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur} onClick={closeSidebar}>
              <li className='text-xl py-4 flex'>
                <RiDashboardFill size={25} className='mr-4 ml-4' />
                Dashboard
              </li>
            </NavLink>
            <NavLink to={'/admin/provider'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur} onClick={closeSidebar}>
              <li className='text-xl py-4 flex'>
                <BsPersonGear size={25} className='mr-4 ml-4' />
                Providers
              </li>
            </NavLink>
            <NavLink to={'/admin/users'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur} onClick={closeSidebar}>
              <li className='text-xl py-4 flex'>
                <MdPerson size={25} className='mr-4 ml-4' />
                Users
              </li>
            </NavLink>
            <NavLink to={'/admin/category'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur} onClick={closeSidebar}>
              <li className='text-xl py-4 flex'>
                <MdCategory size={25} className='mr-4 ml-4' />
                Categories
              </li>
            </NavLink>
            <NavLink to={'/admin/service'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur} onClick={closeSidebar}>
              <li className='text-xl py-4 flex'>
                <MdMiscellaneousServices size={25} className='mr-4 ml-4' />
                Services
              </li>
            </NavLink>
            <NavLink to={'/admin/media'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur} onClick={closeSidebar}>
              <li className='text-xl py-4 flex'>
                <GoFileMedia size={25} className='mr-4 ml-4' />
                Media
              </li>
            </NavLink>
            <NavLink to={'/admin/bookings'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur} onClick={closeSidebar}>
              <li className='text-xl py-4 flex'>
                <AiOutlineCalendar size={25} className='mr-4 ml-4' />
                Bookings
              </li>
            </NavLink>
            <NavLink to={'/admin/city'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur} onClick={closeSidebar}>
              <li className='text-xl py-4 flex'>
                <GiModernCity size={25} className='mr-4 ml-4' />
                City
              </li>
            </NavLink>
            <NavLink to={'/admin/chat'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur} onClick={closeSidebar}>
              <li className='text-xl py-4 flex'>
                <BiChat size={25} className='mr-4 ml-4' />
                Support
              </li>
            </NavLink>
            <li onClick={Logout} className='text-xl py-4 flex cursor-pointer'>
              <MdOutlineLogout size={25} className='mr-4 ml-4' />
              Logout
            </li>

          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminNavbar;
