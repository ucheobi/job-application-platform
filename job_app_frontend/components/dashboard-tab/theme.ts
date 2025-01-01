import { createTheme } from '@mui/material';

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

export default theme