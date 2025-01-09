"use client"

import { Job } from '@/app/types'
import Box from '@mui/material/Box'
import JobCard from './JobCard'
import { useState } from 'react'
import JobDetails from './JobDetails'
import { useFetchApplicantProfile } from '@/app/api/applicant/use-applicant-queries'

interface JobProfileProps {
  jobs: Job[] | null, 
  handleSetValue: (value: number) => void,
  handleApply: (id: number | undefined) => void
}

const JobProfile = ({ jobs, handleSetValue, handleApply }: JobProfileProps) => { 
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [openJobDetails, setOpenJobDetails] = useState<boolean>(false)

  const { profileData } = useFetchApplicantProfile()

  const handleViewJobDetails = (jobId: number) => {
    const job = jobs?.find((job) => job.id === jobId);

    if (job) {
      setSelectedJob(job)
      setOpenJobDetails(true)
    }
  }

  const handleApplyJob = (jobId: number | undefined) => {
    if (profileData) {
      // if applicant has a profile, take user to job application tab for more info
      setOpenJobDetails(false)
      handleSetValue(3)
    } else {
      // Applicant needs to create a profile before applying for a new job
      setOpenJobDetails(false)
      handleSetValue(2)
    } 
    
    handleApply(jobId)
  }

  const handleCloseJobDetails = () => {
    setOpenJobDetails(false)
    setSelectedJob(null)
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
            status={job.status}
            handleViewJob={() => handleViewJobDetails(job.id)}
            handleApplyJob={() => handleApplyJob(job.id)}
        />  
      ))}

      {selectedJob && (
          <JobDetails
              job={selectedJob}
              openJobDetails={openJobDetails}
              handleCloseJobDetails={handleCloseJobDetails}
              handleJobApply={() => handleApplyJob(selectedJob.id)}
          />
        ) 
      }
    </Box>
  )
}

export default JobProfile;