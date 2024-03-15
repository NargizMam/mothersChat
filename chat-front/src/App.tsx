import AppToolbar from "./components/AppToolbar/AppToolbar/AppToolbar.tsx";
import Container from "@mui/material/Container";
import {CssBaseline} from "@mui/material";

const App = () => {

return(
    <>
        <CssBaseline/>
        <header>
            <AppToolbar/>
        </header>
        <Container
            sx={{
            height: '100vh',
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory',
            '& > div': {
                scrollSnapAlign: 'start',
            },
        }}>


        </Container>

    </>
)
        };

export default App
