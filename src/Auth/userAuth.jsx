import { useLocation, Navigate, Outlet } from 'react-router-dom';

function UserAuth() {
    const user = localStorage.getItem("userToken");
    const location = useLocation();
    return (
        user ? <Outlet/>
        :<Navigate to='/login' state={{from :location }} replace/>

  );
}

export default UserAuth