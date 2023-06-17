import { Routes, Route, useLocation } from "react-router-dom";
import ProviderNavbar from "../components/Provider/Navbar";
import ProviderDashboard from "../components/Provider/dashboard";
import Profile from "../components/Provider/Profile/Profile";
import Requests from "../components/Provider/Bookings/Requests";
import Upcoming from "../components/Provider/Bookings/Upcoming";
import Completed from "../components/Provider/Bookings/Completed";
import ProviderLanding from "../components/Provider/home";
import ProviderLogin from "../components/Provider/login";
import ProviderAuth from "../Auth/providerAuth";
import Error from "../components/404/404";

function ProviderRoute() {
    const location = useLocation();
    const excludeNavbarRoutes = ["/provider/login", "/provider/register"];
    const shouldRenderNavbar = !excludeNavbarRoutes.includes(location.pathname);

    return (
        <>
            {shouldRenderNavbar && <ProviderNavbar />}
            <div className={shouldRenderNavbar ? "ml-0 lg:ml-[300px]" : ""}>
                <Routes>
                    <Route path="/register" element={<ProviderLanding />} />
                    <Route path="/login" element={<ProviderLogin />} />
                    <Route element={<ProviderAuth />}>
                    <Route path="/" element={<ProviderDashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/upcoming" element={<Upcoming />} />
                    <Route path="/completed" element={<Completed />} />
                    </Route>
                    <Route path="/*" element={<Error />} />
                    
                </Routes>
            </div>
        </>
    );
}

export default ProviderRoute;
