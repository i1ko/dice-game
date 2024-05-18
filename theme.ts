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
});

export default theme;
