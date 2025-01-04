import { ApplicantProfileType } from "@/app/types"
import { createApplicantProfile, deleteApplicantProfile, fetchApplicantProfile, updateApplicantProfile } from "@/lib/actions/applicant.actions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useCreateApplicantMutation = () => {
    const queryClient = useQueryClient()

    const applicantMutation = useMutation({
        mutationKey: ['profile'],
        mutationFn: createApplicantProfile,
        onSuccess: (data) => {
            queryClient.setQueryData(["profile"], data)
        }
    })

    return applicantMutation
}

export const useFetchApplicantProfile = () => { 

    const { isPending, data, error, status, refetch, } = useQuery<ApplicantProfileType | undefined>({
        queryKey: ["profile"],
        queryFn: fetchApplicantProfile,  
    })

    return {
        profilePending: isPending,
        profileError: error,
        profileData: data,
        profileStatus: status,
        profileRefetch: refetch
    }
}

export const useUpdateApplicantMutation = () => {
    const queryClient = useQueryClient()
 
     const { mutate, status, error, isPending, isSuccess, data} = useMutation({
         mutationKey: ['profile'],
         mutationFn: updateApplicantProfile,
         onSuccess: (data) => {
            queryClient.setQueryData(["profile"], data)
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

export const useDeleteApplicantProfile = () => {
    const queryClient = useQueryClient()

    const { error, status, mutateAsync } = useMutation({
        mutationKey: ["profile"],
        mutationFn: deleteApplicantProfile,
        onSuccess: () => { 
            queryClient.resetQueries({queryKey: ['profile'], exact: true})
         }
    })

    return {
        deleteProfileError: error,
        deleteProfileMutate: mutateAsync,
        deleteProfileStatus: status,
    }
}