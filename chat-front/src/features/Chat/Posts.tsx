import { Grid, Typography } from '@mui/material';

const Posts = () => {
  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item>
        <Typography variant="body1">message</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">time</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">author</Typography>
      </Grid>
    </Grid>
  );
};

export default Posts;
