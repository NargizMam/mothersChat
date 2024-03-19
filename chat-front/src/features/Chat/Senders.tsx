import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { UserClient } from '../../types';
import React from 'react';

interface Props {
  userClient: UserClient;
}
const Senders: React.FC<Props> = ({userClient}) => {
  return (
    <>
      <Grid item >
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Avatar sx={{bgcolor: 'green'}}>
              {userClient.avatar ?
                  (<img src={userClient.avatar} alt={userClient.displayName}/>) :
                  (<PersonIcon/>)}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="body1">{userClient.displayName}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Senders;