import axiosInstance from "@/app/config/axios"
import { JobProfileType } from "@/app/types"
import { useMutation } from "@tanstack/react-query"
import { useFetchApplicantProfile } from "../queries/use-fetch-applicant-profile"

const updateJobProfile = async ({applicantData, resumeFile }: { applicantData: JobProfileType, resumeFile: File | null}) => {
    const formData = new FormData()

    if (resumeFile) {   
        formData.append("resumeFile", resumeFile)
    }

    formData.append("applicantData", JSON.stringify(applicantData))

    const response = await axiosInstance.put("/applicant", formData, {
        headers: {
            "Content-Type": "multi-part/form-data"
        }
    })

    if (response.statusText == "error") {
        throw new Error("Error updating job profile!")
    }

    return response.data;
}


export const useUpdateApplicantMutation = () => {
   const { profileRefetch } = useFetchApplicantProfile()

    const { mutate, status, error, isPending, isSuccess, data} = useMutation({
        mutationKey: ['profile-update'],
        mutationFn: updateJobProfile,
        onSuccess: () => {
            // Refetches applicant profile after successful update
            // I dont want to use the returned data from this mutation
            profileRefetch() 
        }
    })

    return {
        updateApplicantStatus: status,
        updateApplicantSuccess: isSuccess,
        updateApplicantError: error,
        updateApplicantPending: isPending,
        updateApplicantData: data,
        updateApplicantMutate: mutate
    }
}