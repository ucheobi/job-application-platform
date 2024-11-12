"use client"

import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import Person2Icon from '@mui/icons-material/Person2'
import { createTheme } from '@mui/material'
import { AppProvider } from "@toolpad/core/AppProvider"
import { DashboardLayout } from '@toolpad/core/DashboardLayout'


const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: {
      main: "#800000"
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#404040"
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "#ffffff",
        }
      }
    },
    MuiList: {
      styleOverrides: {
        
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          marginBottom: "0.6rem",
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  }
});

export default function Dashboard({ children }: {
  children: React.ReactNode
}) {

    return (
    <AppProvider
      navigation={[
        {
          segment: 'home',
          title: 'Home',
          icon: <HomeIcon />,
        },
        {
          segment: 'dashboard',
          title: 'Dashboard',
          icon: <DashboardIcon />,
        },
        {
          segment: "jobs",
          title: "Jobs",
          icon: <WorkHistoryIcon />
        },
        {
          segment: "my-jobs",
          title: "My Jobs",
          icon: <WorkHistoryIcon />
        },
        {
          segment: "dashboard/applicant",
          title: "My Profile",
          icon: <Person2Icon />
        }
      ]}
      theme={theme}
      branding={{
        title: "Job Query Platform",
      }}
    >
      <DashboardLayout>
       {children}
      </DashboardLayout>
  </AppProvider>
  )
}