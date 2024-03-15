import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer() {

    return (
        <Box component="footer" sx={{
            backgroundColor: '#EEEEEE',
            color:"secondary",
            py: 6 ,
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '80px'}}>
            <Container maxWidth="lg">
                <Typography variant="body2" color="secondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="#">
                        CHAT FORUM
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
}