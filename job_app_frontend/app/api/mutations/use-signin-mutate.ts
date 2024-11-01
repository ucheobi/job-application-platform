
import axiosInstance from "@/app/config/axios";
import { UserLogin } from "@/app/types";
import { useMutation } from "@tanstack/react-query";


const signInUser = async (loginData: UserLogin) => {
    const userData = new FormData();
    userData.append("username", loginData.username)
    userData.append("password", loginData.password)

    const response = await axiosInstance.post("/login", userData, {
        headers: {
            "Content-Type": "multi-part/form-data"
        }
    })

    return response.data
}


export const useSignInMutate = () => {
    const {isPending, isSuccess, error, data, mutate } = useMutation({
        mutationKey: ["signin"],
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