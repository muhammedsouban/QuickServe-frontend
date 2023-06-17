import BASE_URL from "./config/config";

import Axios from "axios";

const Axiosuser = Axios.create({
    baseURL: BASE_URL,
});

const Axiosadmin = Axios.create({
    baseURL: `${BASE_URL}/admin/`,
});

const AxiosProvider = Axios.create({
    baseURL: `${BASE_URL}/provider/`
})

export { Axiosuser, Axiosadmin, AxiosProvider };