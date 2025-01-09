"use server"

import { JobApplicationProps } from "@/app/types";
import customRequest from "@/config/custom-config";

// Fetch Job profile
export const fetchJobs = async () => {
    try {
        const response = await customRequest("/jobs");

        const data = await response.json();

        return data;
    } catch(error) {
        throw new Error(`Something went wrong: ${error}`)
    }
}   

export const getServerSideProps = async () => {
    const jobs = await fetchJobs();

    return {
        props: {
            jobs
        }
    }
}

export const applyJob = async (job_id: JobApplicationProps) => {
    const response = await customRequest("/jobs/apply", {
        method: "POST",
        body: JSON.stringify(job_id)
    })

    const data = await response.json()

    return data
}
