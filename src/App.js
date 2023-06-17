import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import ProviderRoute from "./Routes/providerRoute";
import UserRoute from "./Routes/userRoute";
import AdminRoute from "./Routes/adminRoute";
import { Toaster } from "react-hot-toast";
import Error from "./components/404/404";

function App() {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/*" element={<UserRoute />} />
          <Route path="/provider/*" element={<ProviderRoute />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
