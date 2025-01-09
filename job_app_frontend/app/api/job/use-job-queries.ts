import { Job } from "@/app/types"
import { applyJob, fetchJobs } from "@/lib/actions/job.actions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useFetchJobs = () => {
    const queryClient = useQueryClient()

    const { isPending, data, error, status } = useQuery<Job[]>({
        queryKey: ["jobs"],
        queryFn: fetchJobs, 
        initialData: queryClient.getQueryData(["jobs"])
    })

    return {
        jobsPending: isPending,
        jobsError: error,
        jobsData: data,
        jobsStatus: status,
    }
}

export const useApplyJob = () => {
    const applicationResult = useMutation({
        mutationKey: ["application"],
        mutationFn: applyJob
    })

    return applicationResult
}