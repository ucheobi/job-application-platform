import axiosInstance from "@/app/config/axios"
import { useMutation } from "@tanstack/react-query";
import { useFetchApplicantProfile } from "../queries/use-fetch-applicant-profile";


const deleteProfile = async () => {
    try {
        const response = await axiosInstance.delete("/applicant");

        return response.data;
    } catch(error) {
        throw new Error(`User does not have a profile details: ${error}`)
    }   
}


export const useDeleteApplicantProfile = () => {
    const { profileRefetch } = useFetchApplicantProfile()

    const { error, status, mutate } = useMutation({
        mutationKey: ["profile-delete"],
        mutationFn: deleteProfile,
        onSuccess: () => [
            profileRefetch()
        ]
    })

    return {
        deleteProfileError: error,
        deleteProfileMutate: mutate,
        deleteProfileStatus: status
    }
}