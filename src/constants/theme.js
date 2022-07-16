import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d3006c',
    },
    secondary: {
      main: '#f5ca04',
    },
  },
});

export default darkTheme;