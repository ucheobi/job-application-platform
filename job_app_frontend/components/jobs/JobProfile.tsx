"use client"

import { Job } from '@/types'
import JobCard from './JobCard'
import Box from '@mui/material/Box'

const JobProfile = ({ jobs }: { jobs: Job[] | null }) => { 
  const handleViewJob = () => {
      console.log("View Job")
  }

  const handleApplyJob = () => {
      console.log("Apply Job")
  }

  return (
    <Box className="flex flex-wrap justify-stretch">
      {jobs && jobs.map((job: Job) => (
        <JobCard 
            key={job.id}
            jobTitle={job.title}
            companyName={job.company.company_name}
            techStack={job.technologies.join(", ")}
            location={job.location}
            jobType={job.job_type}
            handleViewJob={handleViewJob}
            handleApplyJob={handleApplyJob}
        />  
        ))}
    </Box>
  )
}

export default JobProfile;