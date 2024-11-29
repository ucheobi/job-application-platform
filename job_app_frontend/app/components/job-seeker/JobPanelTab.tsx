import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CreateApplicantProfile from './CreateApplicantProfile';
import ProfileDetails from './ProfileDetails';
import { JobProfileType } from '@/app/types';
import { getCurrentUser } from '@/app/utils/get-current-user';


interface JobPanelTabProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface JobPanelProps {
    profileData: JobProfileType | undefined;
    profileError: Error | null;
    profilePending: boolean;
    profileStatus: "success" | "error" | "pending"
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

export default function JobPanelTab({ profileData, profileStatus}: JobPanelProps) {
  const [value, setValue] = useState(firstTabReference);
  const [isEditing, setIsEditing] = useState(true)

  React.useEffect(() => {
    if (profileData) {
        setValue(1) // Automatically move the tab to profile details tab if user already exist
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
                title={profileData?.title} 
                current_location={profileData?.current_location} 
                portfolio_url={profileData?.portfolio_url} 
                skills={profileData?.skills} 
                education={profileData?.education} 
                work_experience={profileData?.work_experience}  
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
                    portfolio_url={profileData.portfolio_url} 
                    skills={profileData.skills} 
                    education={profileData.education} 
                    work_experience={profileData.work_experience}
                    handleProfileEdit={handleProfileEdit}
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
