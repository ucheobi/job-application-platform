import { fetchJobs } from "@/lib/actions/job.actions"
import { Job } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"


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