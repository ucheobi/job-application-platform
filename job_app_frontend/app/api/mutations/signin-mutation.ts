import { useAuth } from "@/app/(pages)/layout";
import axiosInstance from "@/app/config/axios";
import { ErrorResponse, UserLoginType } from "@/app/types";
import { useMutation } from "@tanstack/react-query";


const signInUser = async (loginData: UserLoginType) => {
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

export const signInMutation = () => {
    const { handleAuthetication } = useAuth()
    

    const {isPending, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ["signin"],
        mutationFn: signInUser,
        onSuccess: (data) => {
            const token = data.access_token
            
            handleAuthetication(token)
        },
        onError: (error) => {
            console.error("Login failed", error)
        }
    })

    const errorMessage = error as ErrorResponse
    const errorDetails = errorMessage?.response?.data?.detail

    return {
        loginError: errorDetails,
        loginPending: isPending,
        loginSuccess: isSuccess,
        loginToken: data,
        loginMutate: mutate
    }
}