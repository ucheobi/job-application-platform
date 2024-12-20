import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CreateApplicantProfile from './CreateApplicantProfile';
import ProfileDetails from './ProfileDetails';
import { JobProfileType } from '@/app/types';
import { getCurrentUser } from '@/app/utils/get-current-user';
import { useDeleteApplicantProfile } from '@/app/api/applicant/mutations/use-delete-applicant-mutation';


interface JobPanelTabProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type JobProfileStatus = "success" | "error" | "pending"

interface JobPanelProps {
    profileData: JobProfileType | undefined;
    profileError: Error | null;
    profilePending: boolean;
    profileStatus: JobProfileStatus;
    updateApplicantStatus: JobProfileStatus | "idle"
}

function JobPanelTabContent(props: JobPanelTabProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const firstTabReference = 0;

export default function JobPanelTab({ profileData, profileStatus, updateApplicantStatus }: JobPanelProps) {
  const [value, setValue] = useState(firstTabReference);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { deleteProfileMutate } = useDeleteApplicantProfile()

  React.useEffect(() => { 
    // Automatically move the tab to profile details tab if user already exist
    if (profileData) {
        setValue(1) 
    }
  }, [profileData])

  const currentUser = getCurrentUser();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()

    setValue(newValue);
  };

  const handleProfileEdit = () => {
    setIsEditing(!isEditing)
    setValue(0)
  }

  const handleCancelEditing = () => {
    setIsEditing(!isEditing)
    setValue(1)
  }

  const handleProfileDelete = async () => {
    await deleteProfileMutate()
    setValue(0)
  }

  const handleOpenModal = () => setOpenDeleteModal(true)
  const handleCloseModal = () => setOpenDeleteModal(false)
 
  if (updateApplicantStatus === "success") {
      setIsEditing(false)
      setValue(1)
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
            value={value} 
            variant="scrollable"
            scrollButtons="auto" 
            onChange={handleChange}
        >
          <Tab className="text-xs font-bold" disabled={!!profileData && isEditing} label="Create Profile" {...a11yProps(0)} />
          <Tab className="text-xs font-bold" label="Profile Details" {...a11yProps(1)} />
          <Tab className="text-xs font-bold" label="Job Details" {...a11yProps(2)} />
          <Tab className="text-xs font-bold" label="Apply for Jobs" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <JobPanelTabContent value={value} index={0}>
        {
            <CreateApplicantProfile 
                profileData={profileData}
                profileStatus={profileStatus}
                isEditing={isEditing}
                handleCancelEditing={handleCancelEditing}
            />
        }
      </JobPanelTabContent>
      <JobPanelTabContent value={value} index={1}>
        { profileStatus === "success" && profileData && (
                <ProfileDetails
                    first_name={currentUser?.user?.first_name}
                    last_name={currentUser?.user?.last_name}
                    email={currentUser?.user?.email} 
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
      </JobPanelTabContent>
      <JobPanelTabContent value={value} index={2}>
        Job details component
      </JobPanelTabContent>
      <JobPanelTabContent value={value} index={3}>
        Apply for Job component
      </JobPanelTabContent>
    </Box>
  );
}
