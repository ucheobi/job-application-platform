import axiosInstance from "@/app/config/axios"
import { JobProfileType } from "@/app/types"
import { useMutation } from "@tanstack/react-query"

const createJobProfileFetch = async ({applicantData, resumeFile }: { applicantData: JobProfileType, resumeFile: File }) => {
    const formData = new FormData()

    formData.append("applicantData", JSON.stringify(applicantData))
    formData.append("resumeFile", resumeFile)

    const response = await axiosInstance.post("/applicants", formData, {
        headers: {
            "Content-Type": "multi-part/form-data"
        }
    })

    if (response.statusText == "error") {
        throw new Error("Error creating job profile!")
    }

    return response.data;
}


export const useApplicantProfileMutation = () => {
    const { mutate, status, error, isPending, isSuccess, data} = useMutation({
        mutationKey: ['job-profile'],
        mutationFn: createJobProfileFetch
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