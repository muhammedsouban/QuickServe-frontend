import { Axiosadmin } from "../axios";

//services
export const getServices = async () => {
    const res = await Axiosadmin.get("/service")
    return res.data;
}
export const AddService = async (formData, headers) => {
    const res = await Axiosadmin.post("/service", formData, { headers })
    return res.data;
}
export const editService = async (serviceId, headers) => {
    const res = await Axiosadmin.get(`/service/${serviceId}`, headers)
    return res.data;
}
export const updateService = async (serviceId, headers, FormData) => {
    const res = await Axiosadmin.put(`/service/${serviceId}`, FormData, { headers })
    return res.data;
}
export const deleteService = async (serviceId, headers) => {
    const res = await Axiosadmin.delete(`/service/${serviceId}`, { headers })
    return res.data;
}


//categories

export const addCategory = async (formdata, headers) => {
    const res = await Axiosadmin.post("/category", formdata, { headers });
    return res.data;
};
export const getCategories = async () => {
    const res = await Axiosadmin.get("/category");
    return res.data;
};

export const editCategory = async (Id, headers) => {
    const res = await Axiosadmin.get(`/category/${Id}`, { headers });
    return res.data;
};
export const updateCategory = async (Id, FormData, headers) => {
    const res = await Axiosadmin.put(`/category/${Id}`, FormData, { headers });
    return res.data;
};
export const deleteCategory = async (Id, headers) => {
    const res = await Axiosadmin.delete(`/category/${Id}`, { headers });
    return res.data;
};

//providers

export const getProvider = async (headers) => {
    const res = await Axiosadmin.get(`/providers`, { headers });
    return res.data;
};
export const ApproveProvider = async (providerId, headers) => {
    const res = await Axiosadmin.put(`provider-Approve/${providerId}`, {}, { headers });
    return res.data;
};
export const blockProvider = async (providerId, headers) => {
    const res = await Axiosadmin.put(`/provider-Block/${providerId}`, {}, { headers });
    return res.data;
};

export const UnBlockProvider = async (providerId, headers) => {
    const res = await Axiosadmin.put(`/provider-Unblock/${providerId}`, {}, { headers });
    return res.data;
};

//users

export const getUsers = async (headers) => {
    const res = await Axiosadmin.get(`/users`, { headers });
    return res.data;
};

export const HandleUserblock = async (userId, block, headers) => {
    const res = await Axiosadmin.put(`/user-BlockHandle/${userId}`, { isBlock: block }, { headers });
    return res.data;
};

//City

export const addCity = async (city, headers) => {
    const res = Axiosadmin.post('/city', { city }, { headers })
    return res
}

export const deleteCity = async (cityId, headers) => {
    const res = Axiosadmin.delete(`/city/${cityId}`, { headers })
    return res
}

export const getCity = async () => {
    const res = Axiosadmin.get('/city')
    return res
}

//Bookings

export const getBookings = async (headers) => {
    const res = Axiosadmin.get('/bookings', { headers })
    return res
}

//Media

export const addMediaCards = async (FormData) => {
    const res = Axiosadmin.post('/media-card', FormData)
    return res
}
export const fetchCard=async(Id)=>{
    const res = await Axiosadmin.get(`/media-card/${Id}`)
    return res.data
}
export const updateCard=async(Id,FormData)=>{
    const res = await Axiosadmin.put(`/media-card/${Id}`,FormData)
    return res
}
export const deleteMediaCards = async (id) => {
    const res = Axiosadmin.delete(`/media-card/${id}`,)
    return res
}
export const addAdvertisement = async (FormData) => {
    const res = Axiosadmin.post('/media-add', FormData)
    return res
}
export const fetchAdvt=async(Id)=>{
    const res = await Axiosadmin.get(`/media-add/${Id}`)
    return res.data
}
export const updateAdvt=async(Id,formData)=>{
    const res = await Axiosadmin.put(`/media-add/${Id}`,formData)
    return res
}

export const deleteAdvertisement = async (id) => {
    const res = Axiosadmin.delete(`/media-add/${id}`,)
    return res
}

export const addBanner = async (FormData) => {
    const res = Axiosadmin.post('/media-banner', FormData)
    return res
}
export const fetchBanner=async(Id)=>{
    const res = await Axiosadmin.get(`/media-banner/${Id}`)
    return res.data
}
export const updateBanner=async(Id,FormData)=>{
    const res = await Axiosadmin.put(`/media-banner/${Id}`,FormData)
    return res
}
export const deleteBanner = async (id) => {
    const res = Axiosadmin.delete(`/media-banner/${id}`,)
    return res
}

export const getMedia = async () => {
    const res = Axiosadmin.get('/media')
    return res
}

export const sendMessage = async (data, headers) => {
    const res = await Axiosadmin.post('/chat', { data }, { headers })
    return res
}

export const getChat = async (headers) => {
    const res = Axiosadmin.get('/chat', { headers })
    return res
}

export const getConversation = async (userId,headers) => {
    const res = Axiosadmin.get(`/conversation/${userId}`, { headers })
    return res
}

export const AdminDashboard = async (headers) => {
    const res = await Axiosadmin.get('/dashboard', { headers })
    return res
}
