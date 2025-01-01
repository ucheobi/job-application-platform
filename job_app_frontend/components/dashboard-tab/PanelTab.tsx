"use client"

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useState } from 'react';
import CreateApplicantProfile from '../job-seeker/CreateApplicantProfile';
import { a11yProps, PanelTabContent } from './PanelTabContent';
import { PanelProps } from '@/types';
import JobProfile from '../jobs/JobProfile';
import ProfileDetails from '../job-seeker/ProfileDetails';
import { useDeleteApplicantProfile } from '@/app/api/applicant/use-applicant-queries';


const firstTabReference = 0;

export default function PanelTab({ jobsData, applicant: profileData, applicantStatus }: PanelProps) {
  const [value, setValue] = useState(firstTabReference);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { deleteProfileMutate } = useDeleteApplicantProfile()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()

    setValue(newValue);
  };

  const handleProfileEdit = () => {
    setIsEditing(!isEditing)
    setValue(1)
  }

  const handleCancelEditing = () => {
    setIsEditing(!isEditing)
    setValue(2)
  }

  const handleProfileDelete = async () => {
    await deleteProfileMutate()
    setValue(1)
  }

  const handleOpenModal = () => setOpenDeleteModal(true)
  const handleCloseModal = () => setOpenDeleteModal(false)
 
  // if (updateApplicantStatus === "success") {
  //     setIsEditing(false)
  //     setValue(2)
  // }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          variant="scrollable"
          scrollButtons="auto" 
          onChange={handleChange}
        >
          <Tab className="text-xs font-bold" label="Home" {...a11yProps(0)} />
          <Tab className="text-xs font-bold" disabled={profileData && !isEditing} label="Create Profile" {...a11yProps(1)} />
          <Tab className="text-xs font-bold" label="Profile Details" {...a11yProps(2)} />
          <Tab className="text-xs font-bold" label="Job Details" {...a11yProps(3)} />
          <Tab className="text-xs font-bold" label="Apply for Jobs" {...a11yProps(4)} />
        </Tabs>
      </Box>

  {/* Tab contents */}
      <PanelTabContent value={value} index={0}>
        <JobProfile jobs={jobsData} />
      </PanelTabContent>
      <PanelTabContent value={value} index={1}>
        <CreateApplicantProfile 
          profileData={profileData}
          profileStatus={applicantStatus}
          isEditing={isEditing}
          handleCancelEditing={handleCancelEditing}
        />
      </PanelTabContent>
      <PanelTabContent value={value} index={2}>
        { profileData && (
            <ProfileDetails
              owner={profileData.owner}
              title={profileData.title} 
              current_location={profileData.current_location} 
              resume_url={profileData.resume_url}
              portfolio_url={profileData.portfolio_url} 
              skills={profileData.skills} 
              education={profileData.education} 
              work_experience={profileData.work_experience}
              handleProfileEdit={handleProfileEdit}
              handleProfileDelete={handleProfileDelete}
              openDeleteModal={openDeleteModal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
            />
          )
        }
      </PanelTabContent>
      <PanelTabContent value={value} index={3}>
        Job details component
      </PanelTabContent>
      <PanelTabContent value={value} index={4}>
        Apply for Job component
      </PanelTabContent>
    </Box>
  );
}
