import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      }
    }
  }
});

export default theme;