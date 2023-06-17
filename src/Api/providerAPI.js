import { AxiosProvider } from "../axios";

export const bookingRequests = async (headers) => {
    const res = await AxiosProvider.get('/bookingRequests', { headers })
    return res
}

export const getProviderprofile = async (headers) => {
    const res = await AxiosProvider.get('/profile', { headers })
    return res
}
export const acceptRequest = async (data, headers) => {
    const res = await AxiosProvider.put('/acceptBooking', { data }, { headers })
    return res
}

export const upcoming = async (headers) => {
    const res = await AxiosProvider.get('/upcoming', { headers })
    return res
}

export const completed = async (headers) => {
    const res = await AxiosProvider.get('/completed', { headers })
    return res
}

export const startJob = async (data, headers) => {
    const res = await AxiosProvider.post('/start-job', { data }, { headers })
    return res
}

export const providerDashboard = async (headers) => {
    const res = await AxiosProvider.get('/dashboard', { headers })
    return res
}