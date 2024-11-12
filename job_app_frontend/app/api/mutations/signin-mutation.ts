
import axiosInstance from "@/app/config/axios";
import { ErrorResponse, UserLoginType } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


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
    const router = useRouter()
    const {isPending, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ["signin"],
        mutationFn: signInUser,
        onSuccess: (data) => {
            const token = data.access_token
            sessionStorage.setItem("token", token)

            router.push("/dashboard/applicant")
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