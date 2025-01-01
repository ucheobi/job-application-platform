"use client"

import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AppProvider } from "@toolpad/core/nextjs";

import { getCurrentUser, signOutUser } from '@/lib/actions/user.actions';
import { UserSession } from '@/types';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { DashboardLayout as MuiDashboardLayout } from '@toolpad/core/DashboardLayout';
import JobLogo from '@/components/JobLogo';
import theme from '@/components/dashboard-tab/theme';


export default function DashboardLayout({ 
  children 
}: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [ lastActivity, setLastActivity ] = useState<number>(Date.now());

  const query = useQueryClient()
    
  const authentication = useMemo(() => {
    return {
      signIn: async () => {
        const user = await getCurrentUser()

        if (user) {
          setSession(user)
        }
      },
      signOut: async () => {
        await signOutUser()
        query.clear()
        setSession(null)
      },
    };
  }, [query]);

  const timeoutMs = 60 * 1000;
  const checkInterval = 10 * 60 * 1000

  const handleActivity = () => {
    setLastActivity(Date.now())
  }

  const checkInactivity = () => {
    const now = Date.now()

    if (session && now - lastActivity > timeoutMs) {
      authentication.signOut()
    }
  }

  useEffect(() => {
    authentication.signIn()
    
  },[authentication])

  useEffect(() => {
      //listen to several possible "interactive" events
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[lastActivity]);

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

