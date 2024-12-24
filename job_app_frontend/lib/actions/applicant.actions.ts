"use server"

import customRequest from "@/config/custom-config"
import { ApplicantProfileType } from "@/types"

//Create job profile
export const createApplicantProfile = async ({applicantData, resumeFile }: { applicantData: ApplicantProfileType, resumeFile: File }) => {
    const formData = new FormData()

    formData.append("applicantData", JSON.stringify(applicantData))
    formData.append("resumeFile", resumeFile)

    const response = await customRequest("/applicant",{
        method: "POST",
        body: formData,
    })

    const data = await response.json()


    if (response.statusText == "error") {
        throw new Error("Error creating job profile!")
    }

    return data;
}

//Fetch job profile
export const fetchApplicantProfile = async () => {
    try {
        const response = await customRequest("/applicant");

        const data = await response.json();

        if (response.statusText == "error") {
            console.error("Error fetching job profile!")
        }

        return data;
    } catch(error) {
        console.error(`User does not have a profile details: ${error}`)
    }   
}

//Update job profile
export const updateApplicantProfile = async ({applicantData, resumeFile }: { applicantData: ApplicantProfileType, resumeFile: File | null}) => {
    const formData = new FormData()

    if (resumeFile) {   
        formData.append("resumeFile", resumeFile)
    }

    formData.append("applicantData", JSON.stringify(applicantData))

    const response = await customRequest("/applicant", {
        method: "PUT",
        body: formData
    })

    const data = await response.json()

    if (response.statusText == "error") {
        throw new Error("Error updating job profile!")
    }

    return data;
}

//Delete job profile
export const deleteApplicantProfile = async () => {
    try {
        const response = await customRequest("/applicant",{
            method: "DELETE",
        });

        const data = await response.json();

        if (response.statusText == "error") {
            throw new Error("Error deleting job profile!")
        }

        return data;
    } catch(error) {
        throw new Error(`User does not have a profile details: ${error}`)
    }   
}