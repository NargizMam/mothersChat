import { NavLink } from 'react-router-dom';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { useAppSelector} from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';

const Link = styled(NavLink)({
  color:"secondary",
  textDecoration: 'none',
  '&:hover': {
    color: 'dark'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 2 , backgroundColor: '#EEEEEE'}} >
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Link to="/">Player like Spotify</Link>
          </Typography>
          {user ? (
            <UserMenu user={user}/>
          ) : <AnonymousMenu/>}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;