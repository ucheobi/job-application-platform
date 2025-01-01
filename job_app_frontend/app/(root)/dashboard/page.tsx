"use server"

import PanelTab from '@/components/dashboard-tab/PanelTab';
import { fetchApplicantProfile } from '@/lib/actions/applicant.actions';
import { fetchJobs } from '@/lib/actions/job.actions';
import Stack from '@mui/material/Stack';


const Home = async () => {

  const jobsData = await fetchJobs()
  const applicant = await fetchApplicantProfile()

  return (
    <Stack className="py-4 px-10">
      { 
        jobsData && (
          <PanelTab
            jobsData={jobsData}
            applicant={applicant}
            applicantStatus="success"
          />
        )
     }
    </Stack>
  )
}

export default Home;
