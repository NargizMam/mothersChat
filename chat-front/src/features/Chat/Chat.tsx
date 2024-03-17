import { Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Senders from './Senders.tsx';
import Posts from './Posts.tsx';

const Chat= () => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setNewMessage('');
    }
  };
  return (
    <Grid container spacing={2}>
      {/* Колонка участников */}
      <Grid item xs={4}>
        {/* Здесь рендерятся участники */}
        <Typography variant="h2">Участники</Typography>
        <Senders/>
      </Grid>
      {/* Колонка чата */}
      <Grid item xs={8}>
        {/* Здесь рендерятся сообщения чата */}
        <Typography variant="h2">Чат</Typography>
        <Grid container direction="column" spacing={1} sx={{minWidth: '500px'}}>
          все сообщения
          <Posts/>
          <Grid container item alignItems="center" spacing={1}>
            <Grid item xs>
              <TextField
                label="Напишите сообщение"
                variant="outlined"
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Grid>
            <Grid item>
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
      </Grid>
    </Grid>
    </Grid>
  );
};

export default Chat;
