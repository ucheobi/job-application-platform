"use client"

import { useDeleteApplicantProfile, useFetchApplicantProfile } from '@/app/api/applicant/use-applicant-queries';
import { PanelProps } from '@/app/types';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useMutationState } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import CreateApplicant from '../job-seeker/CreateApplicant';
import ProfileDetails from '../job-seeker/ProfileDetails';
import JobProfile from '../jobs/JobProfile';
import { a11yProps, PanelTabContent } from './PanelTabContent';

const firstTabReference = 0;

export default function PanelTab({ jobsData }: PanelProps) {
  const [value, setValue] = useState(firstTabReference);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { deleteProfileMutate } = useDeleteApplicantProfile()
  const { profileData, profileStatus } = useFetchApplicantProfile()

  const status = useMutationState({
    filters: { mutationKey: ["profile"] },
    select: (mutation) => mutation.state.status,
  })

  useEffect(() => {
  if (status.includes("success")) {
    setValue(2)
  }
  }, [status])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()

    setValue(newValue);
  };

  const handleProfileUpdate = () => {
    setIsEditing(!isEditing)
    setValue(1)
  }

  const handleCancelUpdate = () => {
    setIsEditing(!isEditing)
    setValue(2)
  }

  const handleProfileDelete = async () => {
    await deleteProfileMutate()
    handleCloseModal()
  }

  const handleOpenModal = () => setOpenDeleteModal(true)
  const handleCloseModal = () => setOpenDeleteModal(false)

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
        <CreateApplicant
          profileData={profileData}
          profileStatus={profileStatus}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleCancelUpdate={handleCancelUpdate}
        />
      </PanelTabContent>
      <PanelTabContent value={value} index={2}>
        { profileData ? (
            <ProfileDetails
              owner={profileData.owner}
              title={profileData.title} 
              current_location={profileData.current_location} 
              resume_url={profileData.resume_url}
              portfolio_url={profileData.portfolio_url} 
              skills={profileData.skills} 
              education={profileData.education} 
              work_experience={profileData.work_experience}
              handleProfileUpdate={handleProfileUpdate}
              handleProfileDelete={handleProfileDelete}
              openDeleteModal={openDeleteModal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
            />
          ) : (
            <>
              <Typography>You don't have a profile. Click the button below to create a profile...</Typography>
              <Button className='mt-2 font-bold' variant='contained' onClick={() => setValue(1)}>Create profile</Button>
            </>
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
