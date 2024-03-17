import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';

const Senders = () => {
  return (
    <>
      <Grid item >
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Avatar sx={{ bgcolor: 'green'}}>
              <PersonIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="body1">AUthor1</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Senders;