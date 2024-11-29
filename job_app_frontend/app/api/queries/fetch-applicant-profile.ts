import axiosInstance from "@/app/config/axios"
import { JobProfileType } from "@/app/types";
import { useQuery } from "@tanstack/react-query";


const fetchProfile = async () => {
    try {
        const response = await axiosInstance.get("/applicant");

        return response.data;
    } catch(error) {
        throw new Error("User does not have a profile details")
    }   
}


export const fetchApplicantProfile = () => {
    const { isPending, data, error, status, refetch } = useQuery<JobProfileType>({
        queryKey: ["profile"],
        queryFn: fetchProfile,  
        //enabled: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true
    })

    return {
        profilePending: isPending,
        profileError: error,
        profileData: data,
        profileStatus: status,
        profileRefetch: refetch
    }
}