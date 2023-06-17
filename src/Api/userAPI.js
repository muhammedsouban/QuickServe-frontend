import { Axiosuser } from "../axios";


export const userLogin = async (email, password) => {
    const res = await Axiosuser.post("/login", { email, password })
    return res;
}
export const userSignup = async (formData) => {
    const res = await Axiosuser.post("/register", formData)
    return res;
}

export const addToCart = async (serviceId, headers) => {
    const res = await Axiosuser.post(`/cart/${serviceId}`, {}, { headers })
    return res
}

export const getServicesbycategory = async (categoryname) => {
    const res = await Axiosuser.get(`/services/:${categoryname}`)
    return res
}

export const RemoveCart = async (serviceId, headers) => {
    const res = await Axiosuser.delete(`/cart/${serviceId}`, { headers })
    return res
}

export const getCart = async (headers) => {
    const res = await Axiosuser.get('/cart', { headers })
    return res.data
}

export const addAddress = async (data, headers) => {
    const res = await Axiosuser.post('/address', data, { headers })
    return res
}

export const getAddress = async (headers) => {
    const res = await Axiosuser.get('/address', { headers })
    return res
}
export const deleteAddress = async (Id, headers) => {
    const res = await Axiosuser.delete(`/address/${Id}`, { headers })
    return res
}
export const AddBooking = async (data, headers) => {
    const res = await Axiosuser.post('/booking', data, { headers })
    return res
}

export const getProfile = async (headers) => {
    const res = await Axiosuser.get('/profile', { headers })
    return res
}

export const getBookings = async (headers) => {
    const res = await Axiosuser.get('/bookings', { headers })
    return res
}

//chat

export const sendMessage = async (data, headers) => {
    const res = await Axiosuser.post('/chat', { data }, { headers })
    return res
}
export const startConversation = async (data, headers) => {
    const res = await Axiosuser.post('/conversation', { user: data }, { headers })
    return res
}

export const getChat = async (headers) => {
    const res = await Axiosuser.get('/chat', { headers })
    return res
}

export const getMedia = async () => {
    const res = await Axiosuser.get('/media')
    return res
}

export const AddReview = async (data, headers) => {
    const res = await Axiosuser.post('/review', { data }, { headers })
    return res
}

export const getServiceDetails = async (serviceId) => {
    const res = await Axiosuser.get(`/service/${serviceId}`)
    return res
}

export const getReviews = async (serviceId) => {
    const res = await Axiosuser.get(`/review/${serviceId}`)
    return res
}