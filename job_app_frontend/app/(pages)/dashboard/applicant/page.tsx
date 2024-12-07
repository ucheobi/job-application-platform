"use client"

import { useUpdateApplicantMutation } from "@/app/api/mutations/use-update-applicant-mutation"
import { useFetchApplicantProfile } from "@/app/api/queries/use-fetch-applicant-profile"
import JobPanelTab from "@/app/components/job-seeker/JobPanelTab"
import Stack from "@mui/material/Stack"

  
 const Page = () => {
   const { profileData, profileStatus, profileError, profilePending } = useFetchApplicantProfile()
   const { updateApplicantStatus } = useUpdateApplicantMutation()

   return (
    <Stack className="py-4 px-10">
      <JobPanelTab
        profileData={profileData}
        profileStatus={profileStatus}
        profileError={profileError}
        profilePending={profilePending}
        updateApplicantStatus={updateApplicantStatus}
      />
    </Stack>
   )
 }
 
 export default Page
 