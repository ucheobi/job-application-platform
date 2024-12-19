"use server"

import axiosInstance from "@/app/config/axios";
import { UserLoginType, UserRegisterType, UserResponseType } from "@/app/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const signInUser = async (loginData: UserLoginType) => {
    const userData = new FormData();
    userData.append("username", loginData.username)
    userData.append("password", loginData.password)

    const response = await axiosInstance.post("/login", userData, {
        headers: {
            "Content-Type": "multi-part/form-data"
        },
    })

    return response.data
}

export const createUser = async (userData: UserRegisterType) => {
    const response = await axiosInstance.post("/users", userData)

    if (response.statusText == "error") {
        throw new Error("Error creating account!")
    }

    return response.data;
}

export const getUserCookie = async () => {
     const cookieStore = await cookies() 
      const userData = cookieStore.get("user_id")
    
      const sessionData = decryptToken(userData?.value as string)
    
      console.log(sessionData)

      return sessionData;
}

export const decryptToken = async (token: string): Promise<UserResponseType> => {
    return jwtDecode(token)
}