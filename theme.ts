'use client';

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({

  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontWeight: '300',
      color: '#000000DE',
      fontSize: 96
    },
  },
  shape: {
    borderRadius: 2
  },
  palette: {
    text: {
      primary: '#000000DE'
    },
    action: {
      hover: '#0000000A',
    },
    secondary: {
      main: '#9C27B0'
    },
    success: {
      main: green[500], //todo: ask designer about color or change via `declare module`
      dark: '#1B5E20'
    },
    error: {
      contrastText: '#FFFFFF',
      main: '#f44336',
      dark: '#C62828'
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          padding: "20px 0",
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        markLabel: ({_, theme}) => {
          return {
            '&': {
              position: 'relative',
              color: theme.palette.text.secondary,
            },
          };
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        markLabelActive: ({_, theme}) => ({
          '&': {
            color: theme.palette.secondary
          }
        })
      }
    },
    MuiCollapse: {
      styleOverrides: {
        wrapperInner: {
          '&': {
            display: 'flex',
            justifyContent: 'center',
          }
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        filled: {
          // '&': {
            color: 'white',
            fontSize: '14px',
            borderRadius: '4px',
          // }
        },
        message: {
          // '&': {
            fontSize: '14px',
          // }
        },

      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          fontSize: 16,
          // '&': {
          //   fontSize: 16,
          // }
        }
      }
    }
  }
});

export default theme;
