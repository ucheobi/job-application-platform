"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const baseURL = "http://127.0.0.1:8000"

export const getToken = async ():Promise<string | null> => {
    const cookieStore = await cookies() 
    const token = cookieStore.get("user")?.value || null

    return token
}

// Wrapper for fetch requests
export const customRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = await getToken(); 

    const headers = new Headers(options.headers || {})

    if (token) {
        headers.append("Authorization", `Bearer ${token}`)
    }

    if (!(options.body instanceof FormData)) {
        headers.append("Content-Type", "application/json; charset=utf-8");
    }

    const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers
    })

    if (response.status === 401) {
        redirect("/account/auth")
    }

    if (!response.ok) {
        console.error(`Http Error: ${response.status} ${response.statusText}`)
    }

    return response
};


export default customRequest;
