import axios from "axios"

// Axios instance with predefined base URL
const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
})

axiosInstance.interceptors.request.use((config) => {
//     const token = sessionStorage.getItem("token")

//    if (token) {
//      config.headers.Authorization = `Bearer ${token}`
//    } 

    return config;
}, (error: any) => {
    return Promise.reject(error)
})

export default axiosInstance;