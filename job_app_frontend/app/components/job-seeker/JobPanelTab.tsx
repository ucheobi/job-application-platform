import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CreateApplicantProfile from './CreateApplicantProfile';

interface JobPanelTabProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function JobPanelTabContent(props: JobPanelTabProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function JobPanelTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
            value={value} 
            variant="scrollable"
            scrollButtons="auto" 
            onChange={handleChange}
        >
          <Tab className="text-xs font-bold" label="Create Profile" {...a11yProps(0)} />
          <Tab className="text-xs font-bold" label="Profile Details" {...a11yProps(1)} />
          <Tab className="text-xs font-bold" label="Job Details" {...a11yProps(2)} />
          <Tab className="text-xs font-bold" label="Apply for Jobs" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <JobPanelTabContent value={value} index={0}>
        <CreateApplicantProfile />
      </JobPanelTabContent>
      <JobPanelTabContent value={value} index={1}>
        Item Two
      </JobPanelTabContent>
      <JobPanelTabContent value={value} index={2}>
        Item Three
      </JobPanelTabContent>
      <JobPanelTabContent value={value} index={3}>
        Item Four
      </JobPanelTabContent>
    </Box>
  );
}
