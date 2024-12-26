"use client"

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { AppProvider } from "@toolpad/core/nextjs";

import { getCurrentUser, signOutUser } from '@/lib/actions/user.actions';
import { UserSession } from '@/types';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { createTheme } from '@mui/material';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { DashboardLayout as MuiDashboardLayout } from '@toolpad/core/DashboardLayout';
import JobLogo from '@/components/JobLogo';

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

export default function DashboardLayout({ 
  children 
}: { children: React.ReactNode }) {
  const query = useQueryClient()
  const router = useRouter()
  const [session, setSession] = useState<UserSession | null>(null);
  const [ lastActivity, setLastActivity ] = useState<number>(Date.now());

  const timeoutMs = 60 * 1000;
  const checkInterval = 1000

  const handleActivity = () => {
    setLastActivity(Date.now())
  }

  const checkInactivity = () => {
    const now = Date.now()

    if (session && now - lastActivity > timeoutMs) {
      authentication.signOut()
    }
  }

  const authentication = useMemo(() => {
    return {
      signIn: async () => { 
        const user = await getCurrentUser()
      },
      signOut: async () => {
        await signOutUser()
        query.clear()
        setSession(null)
        
        router.push("/account/auth")
      }
    };
  }, [query, router]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser()
        setSession(user)
      } catch (error) {
          console.error("Error fetching user data: ", error)
      }
    }

    if (!session) {
      getUser() 
    }
  }, [session])

  useEffect(() => {
      // on mount we will listen to several possible "interactive" events
      const events = [
          "focus",
          "scroll",
          "click",
          "mousemove",
          "keydown",
          "touchstart"
      ];

      events.forEach(event => {
          window.addEventListener(event, handleActivity);
      });

      // Set up interval for inactivity check
      const intervalId = setInterval(checkInactivity, checkInterval);

      return () => {
        // cleanup listeners and interval on onmount
        events.forEach(event => {
            window.removeEventListener(event, handleActivity);
        });

        // clear the interval
        clearInterval(intervalId);
      }
  },[ lastActivity ]);

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
      session={session}
    >
      <AuthenticationContext.Provider value={authentication}>
        <SessionContext.Provider value={session}>
          <MuiDashboardLayout>
            {children}
          </MuiDashboardLayout>
        </SessionContext.Provider>
      </AuthenticationContext.Provider>
    </AppProvider>
  )
}
