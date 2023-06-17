import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdPerson, MdCategory, MdPendingActions,MdOutlineDoneAll, MdOutlineLogout,MdNotificationsActive } from 'react-icons/md';
import { RiDashboardFill } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BsPatchQuestionFill } from 'react-icons/bs';

function Sidebar() {

  const handleNavLinkFocus = (event) => {
    event.target.style.color = 'yellow';

  };

  const handleNavLinkBlur = (event) => {
    event.target.style.color = 'inherit';

  };

  return (
    <div className={'sidebar fixed top-13 left-0 w-[300px] h-screen text-white bg-blue-900 duration-300'}>
      <nav className='mt-12 ms-4' >
        <ul className='flex flex-col  text-white'>
          <NavLink to={'/provider/dashboard'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur}>
            <li className='text-xl py-4 flex'>
              <RiDashboardFill size={25} className='mr-4 ml-4' />
              Dashboard
            </li>
          </NavLink>
          {/* <NavLink to={'/provider/providers'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur}>
            <li className='text-xl py-4 flex'>
              <BsPersonGear size={25} className='mr-4 ml-4' />
              Providers
            </li>
          </NavLink> */}
          <NavLink to={'/provider/profile'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur}>
            <li className='text-xl py-4 flex'>
              <MdPerson size={25} className='mr-4 ml-4' />
              Profile
            </li>
          </NavLink>
          <NavLink to={'/provider/categories'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur}  >
            <li className='text-xl py-4 flex'>
              <BsPatchQuestionFill size={25} className='mr-4 ml-4' />
              Requests
            </li>
          </NavLink>
          <NavLink to={'/provider/service'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur}>
            <li className='text-xl py-4 flex'>
              <MdPendingActions size={25} className='mr-4 ml-4' />
              Pending
            </li>
          </NavLink>
       
          <NavLink to={'/provider/bookings'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur}>
            <li className='text-xl py-4 flex'>
              <MdOutlineDoneAll size={25} className='mr-4 ml-4' />
              Completed
            </li>
          </NavLink>
          <NavLink to={'/provider/notification'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur}>
            <li className='text-xl py-4 flex'>
              <MdNotificationsActive size={25} className='mr-4 ml-4' />
              Notifications
            </li>
          </NavLink>
          <NavLink to={'/provider/logout'} onFocus={handleNavLinkFocus} onBlur={handleNavLinkBlur}>
            <li className='text-xl py-4 flex'>
              <MdOutlineLogout size={25} className='mr-4 ml-4' />
              Logout
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
