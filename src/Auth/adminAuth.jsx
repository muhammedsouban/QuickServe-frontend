import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';


function AdminAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const admin = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
    if (isLoading) {
      return <Loader/>;
    }else{
      return (
        admin ? <Outlet/>
        :<Navigate to='/admin/login' state={{from :location }} replace/>

  );
    }
   
}

export default AdminAuth