import React, {MouseEventHandler} from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { ChatPostApi } from '../../types';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { apiURL } from "../../constants.ts";

interface Props {
    message: ChatPostApi;
    onDeleteMessage: MouseEventHandler;
}

const Post: React.FC<Props> = ({ message, onDeleteMessage }) => {
    const user = useAppSelector(selectUser);

    let avatar = message.user.displayName;
    if (message.user.avatar) {
        avatar = apiURL + '/' + message.user.avatar;
    }

    return (
        <Paper elevation={3} sx={{ padding: '10px', marginBottom: '5px' }}>
            <Typography variant="subtitle1" gutterBottom>
                {message.text}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {new Date(message.createdAt).toLocaleString()}
            </Typography>
            <Grid container justifyContent='space-between' alignItems='center'>
                <Grid item>
                    <Typography variant="body2" color="textSecondary">
                        {message.user.displayName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar sx={{ bgcolor: 'green', width: '20px', height: '20px' }}>
                        {message.user.avatar ?
                            (<img src={avatar} alt={message.user.displayName} />) :
                            (<PersonIcon />)}
                    </Avatar>
                </Grid>
            </Grid>
            {user?.role === 'moderator' && (<LoadingButton onClick={onDeleteMessage}>Delete</LoadingButton>)}
        </Paper>
    );
};

export default Post;
