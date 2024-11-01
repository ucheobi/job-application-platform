import axiosInstance from "@/app/config/axios"
import { UserRegister } from "@/app/types"
import { useMutation } from "@tanstack/react-query"

const registerUser = async (userData: UserRegister) => {
    const response = await axiosInstance.post("/users", userData)

    if (response.statusText == "error") {
        throw new Error("Error creating account!")
    }

    return response.data;
}


export const useRegisterMutation = () => {
    const { mutate, status, error, isPending, isSuccess, data} = useMutation({
        mutationKey: ['register'],
        mutationFn: registerUser
    })

    return {
        registerStatus: status,
        registerSuccess: isSuccess,
        registerError: error,
        registerPending: isPending,
        registerData: data,
        registerMutate: mutate
    }
}