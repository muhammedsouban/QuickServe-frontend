import { useLocation, Navigate, Outlet } from 'react-router-dom';

function ProviderAuth() {
    const provider = localStorage.getItem("ProviderToken");
    const location = useLocation();
    return (
        provider ? <Outlet />
            : <Navigate to='/provider/login' state={{ from: location }} replace />

    );
}

export default ProviderAuth