import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post('/register', {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        calgEmail: formData.get('calgEmail'), 
      calgPass: formData.get('calgPass'),
      });

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error status:', error.response.status);
        console.error('Error response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from server:', error.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error setting up the request:', error.message);
      }
  }
}

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
    <TextField
      autoComplete="given-name"
      name="firstName"
      required
      fullWidth
      id="firstName"
      label="First Name"
      autoFocus
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      required
      fullWidth
      id="lastName"
      label="Last Name"
      name="lastName"
      autoComplete="family-name"
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="new-password"
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      required
      fullWidth
      id="calgEmail"
      label="Calgary Golf Email Address"
      name="calgEmail"
      autoComplete="city-email"
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      required
      fullWidth
      name="calgPass"
      label="Calgary Golf Password"
      type="password"
      id="calgPass"
      autoComplete="city-password"
    />
  </Grid>
</Grid>

  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
  >
    Sign Up
  </Button>
  <Grid container justifyContent="flex-end">
    <Grid item>
      <Link href="http://localhost:5173/login" variant="body2">
        Already have an account? Sign in
      </Link>
    </Grid>
  </Grid>
</Box>

        </Box>
      </Container>
    </ThemeProvider>
  );
}
