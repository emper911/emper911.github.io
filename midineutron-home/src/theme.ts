import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5', // Customize primary color
    },
    secondary: {
      main: '#ff4081', // Customize secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Customize font
  },
});

export default theme;