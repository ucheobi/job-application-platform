"use client"

import { useFetchApplicantProfile } from "@/app/api/queries/use-fetch-applicant-profile"
import JobPanelTab from "@/app/components/job-seeker/JobPanelTab"
import Stack from "@mui/material/Stack"

  
 const Page = () => {
   const { profileData, profileStatus, profileError, profilePending } = useFetchApplicantProfile()
   return (
    <Stack className="py-4 px-10">
      <JobPanelTab
        profileData={profileData}
        profileStatus={profileStatus}
        profileError={profileError}
        profilePending={profilePending}
      />
    </Stack>
   )
 }
 
 export default Page
 