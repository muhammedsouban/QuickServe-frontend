import { useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader';

function UserAuth() {
  const user = localStorage.getItem("userToken");
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      user ? <Outlet />
        : <Navigate to='/login' state={{ from: location }} replace />
    );
  }
}

export default UserAuth