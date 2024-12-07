import axiosInstance from "@/app/config/axios"
import { JobProfileType } from "@/app/types"
import { useMutation } from "@tanstack/react-query"
import { useFetchApplicantProfile } from "../queries/use-fetch-applicant-profile"

const createJobProfileFetch = async ({applicantData, resumeFile }: { applicantData: JobProfileType, resumeFile: File }) => {
    const formData = new FormData()

    formData.append("applicantData", JSON.stringify(applicantData))
    formData.append("resumeFile", resumeFile)

    const response = await axiosInstance.post("/applicant", formData, {
        headers: {
            "Content-Type": "multi-part/form-data"
        }
    })

    if (response.statusText == "error") {
        throw new Error("Error creating job profile!")
    }

    return response.data;
}


export const useCreateApplicantMutation = () => {
    const { profileRefetch } = useFetchApplicantProfile()

    const { mutate, status, error, isPending, isSuccess, data} = useMutation({
        mutationKey: ['job-profile'],
        mutationFn: createJobProfileFetch,
        onSuccess: () => {
            profileRefetch()
        }
    })

    return {
        createJobStatus: status,
        createJobSuccess: isSuccess,
        createJobError: error,
        createJobPending: isPending,
        createJobData: data,
        createJobProfileMutate: mutate
    }
}