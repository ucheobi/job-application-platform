"use server"

import PanelTab from '@/components/dashboard-tab/PanelTab';
import { fetchJobs } from '@/lib/actions/job.actions';
import Stack from '@mui/material/Stack';


const Home = async () => {
  const jobsData = await fetchJobs()

  return (
    <Stack className="py-4 px-10">
      { 
        jobsData && (
          <PanelTab
            jobsData={jobsData}
          />
        )
     }
    </Stack>
  )
}

export default Home;
