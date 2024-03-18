import { useEffect, useRef, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Senders from './Senders';
import { ChatPost, IncomingPost } from '../../types';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';


const Chat = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<ChatPost[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const token = user?.token;

  useEffect(() => {
    const sendMessage = (message: string) => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        console.log(message, 'отправка сообщ');
        ws.current.send(message);
      } else {
        console.error('WebSocket is not open or not initialized.');
      }
    };

    ws.current = new WebSocket('ws://localhost:8000/posts');

    ws.current.onopen = () => {
      console.log('WebSocket connection');
      if (token) {
        sendMessage(JSON.stringify({ type: 'LOGIN', payload: token }));
      } else {
        navigate('/');
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.current.onmessage = (event) => {
      const decodedMessage = JSON.parse(event.data) as IncomingPost;
      console.log(decodedMessage, 'incoming message');

      switch (decodedMessage.type) {
        case 'WELCOME':
          setMessages((prevMessages) => [...prevMessages, ...decodedMessage.payload]);
          break;
        case 'LAST_MESSAGES':
          setMessages(decodedMessage.payload);
          break;
        case 'NEW_MESSAGE':
          setMessages((prevMessages) => [...prevMessages, ...decodedMessage.payload]);
          break;
        default:
          console.log('Неподдерживаемый тип сообщения:', decodedMessage.type);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [navigate, token]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const outgoingMessage = {
        type: 'NEW_MESSAGE',
        payload: { text: newMessage , user: token },
      };
      console.log(outgoingMessage, 'newMessage');
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(outgoingMessage));
      } else {
        console.error('WebSocket connection is not open');
      }
      setNewMessage('');
    }
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography variant="h2">Участники</Typography>
        <Senders />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h2">Чат</Typography>
        {messages.map((message, index) => (
          <Post key={message.id}
                message={message}
          />
        ))}
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
  );
};

export default Chat;
