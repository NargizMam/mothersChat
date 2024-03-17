import React, { useState } from 'react';
import { LoginMutation } from '../../types';
import { Alert, Avatar, Box, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { googleLogin, loginUser } from './usersThunk';
import { selectLoginError, selectLoginLoading } from './usersSlice.ts';
import { GoogleLogin } from '@react-oauth/google';
import LoadingButton from '@mui/lab/LoadingButton';

const Login = () => {
  const dispatch = useAppDispatch();
  const logining = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();
  const error = useAppSelector(selectLoginError);
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: ''
  });
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(loginUser(state)).unwrap();
    navigate('/chat');
  };
  const googleLoginHandler = async (credential: string) => {
    try {
      await dispatch(googleLogin(credential)).unwrap();
      navigate('/chat');
    } catch (e) {
      navigate('/');
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOpenIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {error && (
          <Alert severity="error" sx={{mt: 3, width: '100%'}}>
            {error.error}
          </Alert>
        )}
        <Box>
          <GoogleLogin onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              void googleLoginHandler(credentialResponse.credential);
            }
          }}
                       onError={() => {
                         console.log('Login failed!');
                       }}
          />
        </Box>

        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="E-mail"
                name="email"
                fullWidth
                value={state.email}
                onChange={inputChangeHandler}
                autoComplete="current-email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="password"
                label="Пароль"
                type="password"
                fullWidth
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={logining}
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Войти
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Еще не зарегистрированы
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;