import React from 'react';
import { Paper, Typography } from '@mui/material';
import { ChatPostApi } from '../../types';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';

interface Props {
  message: ChatPostApi;
}



const Post: React.FC<Props> = ({ message }) => {
  const user = useAppSelector(selectUser);

  return (
    <Paper elevation={3} sx={{padding: '10px', marginBottom: '5px'}}>
      <Typography variant="subtitle1" gutterBottom>
        {message.text}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {message.user.displayName}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {new Date(message.createdAt).toLocaleString()}
      </Typography>
      {user?.role === 'moderator' && (<LoadingButton>Delete</LoadingButton>)}
    </Paper>
  );
};

export default Post;
