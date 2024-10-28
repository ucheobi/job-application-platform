import axios from "axios"

// Axios instance with predefined base URL
const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
})

axiosInstance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error)
})

export default axiosInstance;