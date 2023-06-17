import { Routes, Route, useLocation } from "react-router-dom";
import Services from "../components/admin/Services/Services";
import AdminNavbar from "../components/admin/AdminNavbar/AdminNavbar";
import Dashboard from "../components/admin/Dashboard/dashboard";
import ProviderCard from "../components/admin/Providers/ProviderList";
import Category from "../components/admin/category/Category";
import UserList from "../components/admin/users/users";
import City from "../components/admin/City/city";
import AdminLogin from '../components/admin/Login/login'
import Bookings from "../components/admin/Bookings/bookings";
import Media from "../components/admin/Media/Media";
import AdminChat from "../components/admin/Support/chat";
import AdminAuth from "../Auth/adminAuth";
import Error from "../components/404/404";

function AdminRoute() {
  const location = useLocation();
  const excludeNavbarRoutes = ["/admin/chat", "/admin/*", "/admin/login"];

  const shouldRenderNavbar = !excludeNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldRenderNavbar && <AdminNavbar />}
      <div className={shouldRenderNavbar ? "ml-0 lg:ml-[300px]" : ""}>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route element={<AdminAuth />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/service" element={<Services />} />
            <Route path="/category" element={<Category />} />
            <Route path="/provider" element={<ProviderCard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/city" element={<City />} />
            <Route path="/media" element={<Media />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/chat" element={<AdminChat />} />
          </Route>
          <Route path="/*" element={<Error />} />

        </Routes>
      </div>
    </>
  );
}

export default AdminRoute;
