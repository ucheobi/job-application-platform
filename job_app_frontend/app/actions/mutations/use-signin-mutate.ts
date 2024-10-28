
import { useMutation } from "@tanstack/react-query";
import { UserLogin } from "../../types";
import axiosInstance from "@/app/config/axios";

const signInUser = async (loginData: UserLogin) => {
    const userData = new FormData();
    userData.append("username", loginData.username)
    userData.append("password", loginData.password)

    const response = await axiosInstance.post("/login", userData, {
        headers: {
            "Content-Type": "multi-part/form-data"
        }
    })

    console.log(response.data)

    return response.data
}


export const useSignInMutate = () => {
    const {isPending, isSuccess, error, data, mutate } = useMutation({
        mutationFn: signInUser
    })

    return {
        loginError: error,
        loginPending: isPending,
        loginSuccess: isSuccess,
        loginToken: data,
        loginMutate: mutate
    }
}