import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createApplicantProfile, fetchApplicantProfile, updateApplicantProfile, deleteApplicantProfile } from "@/lib/actions/applicant.actions"
import { ApplicantProfileType } from "@/types"


export const useCreateApplicantMutation = () => {
    //const { profileRefetch } = useFetchApplicantProfile()

    const { mutate, status, error, isPending, isSuccess, data, reset} = useMutation({
        mutationKey: ['profile'],
        mutationFn: createApplicantProfile,
        // onSuccess: () => {
        //     profileRefetch()
        // }
    })

    return {
        createJobStatus: status,
        createJobSuccess: isSuccess,
        createJobError: error,
        createJobPending: isPending,
        createJobData: data,
        createJobProfileMutate: mutate,
        createJobReset: reset
    }
}

export const useFetchApplicantProfile = () => { 

    const { isPending, data, error, status, refetch, } = useQuery<Promise<ApplicantProfileType | undefined>>({
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
    //const { profileRefetch } = useFetchApplicantProfile()
 
     const { mutate, status, error, isPending, isSuccess, data} = useMutation({
         mutationKey: ['profile-update'],
         mutationFn: updateApplicantProfile,
        //  onSuccess: () => {
        //      // Refetches applicant profile after successful update
        //      // I dont want to use the returned data from this mutation
        //      profileRefetch() 
        //  }
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

    const { error, status, mutateAsync, isSuccess } = useMutation({
        mutationKey: ["profile-delete"],
        mutationFn: deleteApplicantProfile,
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