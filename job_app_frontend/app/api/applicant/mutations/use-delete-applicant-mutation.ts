import axiosInstance from "@/app/config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteProfile = async () => {
    try {
        const response = await axiosInstance.delete("/applicant");

        return response.data;
    } catch(error) {
        throw new Error(`User does not have a profile details: ${error}`)
    }   
}

export const useDeleteApplicantProfile = () => {
    const queryClient = useQueryClient()

    const { error, status, mutateAsync, isSuccess } = useMutation({
        mutationKey: ["profile-delete"],
        mutationFn: deleteProfile,
        onSuccess: () => {
            queryClient.resetQueries({queryKey: ['profile'], exact: true})
        }
    })

    return {
        deleteProfileError: error,
        deleteProfileMutate: mutateAsync,
        deleteProfileStatus: status,
        deleteSuccessful: isSuccess
    }
}