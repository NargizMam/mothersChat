import { Box, Button, Grid, Typography } from '@mui/material';
import openImage from './../assets/image/angel1.png';
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <Box sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#F8F8F8', // Нежно-серый фон
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
            p: 4,
            maxWidth: 800,
            width: '90%',
            borderRadius: 4,
            textAlign: 'center'
        }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#424242' }}> {/* Нежно-серый цвет текста */}
                Поделитесь своей болью... Расскажите другим, как Вы справились...
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#616161' }}> {/* Светло-серый цвет текста */}
                Похоже, вы еще не зарегистрированы.
            </Typography>
            <img src={openImage} alt="Image" style={{ maxWidth: '100%', marginBottom: 20, borderRadius: 100 }} />
            <Typography variant="h4" gutterBottom sx={{ color: '#212121' }}> {/* Черный цвет текста */}
                Добро пожаловать!
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Button component={NavLink} to='/register' color='primary' variant="contained">
                        Присоединиться
                    </Button>
                </Grid>
                <Grid item>
                    <Typography component={NavLink} to='/login' color="secondary">
                        Уже есть аккаунт, войти
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
