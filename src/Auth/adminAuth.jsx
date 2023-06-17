import { useLocation, Navigate, Outlet } from 'react-router-dom';


function AdminAuth() {
    const admin = localStorage.getItem("token");
    const location = useLocation();
    return (
        admin ? <Outlet/>
        :<Navigate to='/admin/login' state={{from :location }} replace/>

  );
}

export default AdminAuth