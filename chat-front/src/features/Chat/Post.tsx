import React from 'react';
import { Typography, Paper, makeStyles } from '@mui/material';
import { ChatPost } from '../../types';

interface Props {
  message: ChatPost;
}



const Post: React.FC<Props> = ({ message }) => {

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
    </Paper>
  );
};

export default Post;
