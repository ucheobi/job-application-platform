"use server"

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
