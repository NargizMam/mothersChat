import { useEffect, useRef, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Senders from './Senders';
import { ChatPostApi, IncomingPost, UserClient } from '../../types';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import Post from './Post.tsx';

const Chat = () => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<ChatPostApi[]>([]);
    const [userClient, setUserClient] = useState<UserClient[]>([]);
    const [isConnected, setIsConnected] = useState(false); // Состояние соединения
    const ws = useRef<WebSocket | null>(null);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const token = user?.token;

    useEffect(() => {
        const connectWebSocket = () => {
            ws.current = new WebSocket('ws://localhost:8000/posts');

            ws.current.onopen = () => {
                if (token) {
                    sendMessage(JSON.stringify({ type: 'LOGIN', payload: token }));
                } else {
                    navigate('/');
                }
                setIsConnected(true);
            };

            ws.current.onmessage = (event) => {
                const decodedMessage = JSON.parse(event.data) as IncomingPost;
                switch (decodedMessage.type) {
                    case 'LAST_MESSAGES':
                        setUserClient(decodedMessage.payload.users);
                        setMessages(decodedMessage.payload.messages);
                        break;
                    case 'SEND_MESSAGE':
                        setMessages(prev => [...prev, decodedMessage.payload.message]);
                        break;
                    case 'SEND_WITHOUT_DELETED_MESSAGE':
                        setMessages(decodedMessage.payload.messages);
                        break;
                    default:
                        console.log('Неподдерживаемый тип сообщения:', decodedMessage.type);
                }
            };

            ws.current.onclose = () => {
                console.error('WebSocket connection closed unexpectedly. Reconnecting...');
                setIsConnected(false);
                setTimeout(connectWebSocket, 3000);
            };

            ws.current.onerror = (error) => {
                console.error('WebSocket encountered error:', error);
                ws.current?.close();
            };
        };

        connectWebSocket();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [navigate, token]);

    const sendMessage = (message: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        } else {
            console.error('WebSocket is not open or not initialized.');
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const outgoingMessage = {
                type: 'NEW_MESSAGE',
                payload: { text: newMessage },
            };
            sendMessage(JSON.stringify(outgoingMessage));
            setNewMessage('');
        }
    };

    const deletedMessage = (id: string) => {
        const outgoingMessage = {
            type: 'DELETE_MESSAGE',
            payload: { text: id },
        };
        sendMessage(JSON.stringify(outgoingMessage));
    };

    return (
        <Grid container spacing={2} sx={{ overflow: 'auto', mb: 30 }}>
            <Grid item xs={4}>
                <Typography variant="h2">Участники</Typography>
                {userClient.length > 0 && userClient.map(user => (
                    <Senders key={user._id} userClient={user} />
                ))}
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h2">Чат</Typography>
                {messages && messages.length > 0 && messages.map((message) => (
                    <Post key={message._id}
                          message={message}
                          onDeleteMessage={() => deletedMessage(message._id)}
                    />
                ))}
                <Grid container item alignItems="center" spacing={4}>
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
                        <IconButton color="primary" onClick={handleSendMessage} disabled={!isConnected}>
                            <SendIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Chat;
