import React, {MouseEventHandler} from 'react';
import {Grid, Paper, Typography} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useAppSelector} from '../../app/hooks.ts';
import {selectUser} from '../users/usersSlice.ts';
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

interface Props {
    displayName: string | null;
    text: string;
    createdAt: string;
    onDeleteMessage: MouseEventHandler;
}

const Post: React.FC<Props> = ({displayName, text, createdAt, onDeleteMessage}) => {
    const user = useAppSelector(selectUser);


    return (
        <Paper elevation={3} sx={{padding: '10px', marginBottom: '5px'}}>
            <Typography variant="subtitle1" gutterBottom>
                {text}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {new Date(createdAt).toLocaleString()}
            </Typography>
            <Grid container justifyContent='space-between' alignItems='center'>
                <Grid item>
                    <Typography variant="body2" color="textSecondary">
                        {displayName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar sx={{bgcolor: 'green', width: '20px', height: '20px'}}>
                        <PersonIcon/>
                    </Avatar>
                </Grid>
            </Grid>
            {user?.role === 'moderator' && (<LoadingButton onClick={onDeleteMessage}>Delete</LoadingButton>)}
        </Paper>
    );
};

export default Post;
