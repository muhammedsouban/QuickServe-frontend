import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
function ProviderAuth() {
    const provider = localStorage.getItem("ProviderToken");
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
            provider ? <Outlet />
                : <Navigate to='/provider/login' state={{ from: location }} replace />

        );
    }
}

export default ProviderAuth