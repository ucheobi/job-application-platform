"use client"

import React, { useContext, useEffect, useState, useMemo } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import Person2Icon from '@mui/icons-material/Person2'
import { createTheme } from '@mui/material'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { AppProvider } from "@toolpad/core/nextjs"
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { useRouter } from 'next/navigation';
import { useAuth } from '../layout';
import { UserResponseType } from '@/app/types';
import { AuthenticationContext, Session, SessionContext } from '@toolpad/core/AppProvider';
import JobLogo from '@/app/components/JobLogo';
import { getStoredUser } from '@/app/helper';

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
  const [userSession, setUserSession] = useState<Session | null>(null);
  const authentication = useMemo(() => {
    return {
      signIn: () => {
        const userData = getStoredUser();

        if (userData) {
          setUserSession(userData)
        }
      },
      signOut: () => {
        sessionStorage.clear()
        setUserSession(null);
        router.push("/account/auth")
      },
    };
  }, []);

  const router = useRouter()

  useEffect(() => {
    const userObject = getStoredUser();

    if (userObject) {
      setUserSession(userObject)
    }

    const token = sessionStorage.getItem("token")

    if (!token) {
      router.push("/account/auth")
    }
  }, [router])
  
 
  //const { isAuthenticated } = useAuth()

  // if (!isAuthenticated) {
  //   return (
  //     <Box className='flex justify-center mt-10'>
  //       <CircularProgress size="10rem" />
  //     </Box>
  //   )
  // }

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
        logo: <JobLogo />
      }}
    >
      <AuthenticationContext.Provider value={authentication}>
        <SessionContext.Provider value={userSession}>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </SessionContext.Provider>
      </AuthenticationContext.Provider>
    </AppProvider>
  )
}