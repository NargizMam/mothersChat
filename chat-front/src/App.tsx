import AppToolbar from "./components/AppToolbar/AppToolbar/AppToolbar.tsx";
import Container from "@mui/material/Container";
import {CssBaseline} from "@mui/material";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSlice.ts";
import {Route, Routes} from "react-router-dom";
import WarningMessage from "./features/WarningMessage/WarningMessages.tsx";
import Home from "./features/Home.tsx";
import Footer from './components/Footer/Footer.tsx';
import Chat from './features/Chat/Chat.tsx';
const App = () => {
    const user = useAppSelector(selectUser);

return(
    <>
        <CssBaseline/>
        <header>
            <AppToolbar/>
        </header>
        <Container sx={{overflow: 'hidden'}}>
            <WarningMessage/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            <Route path="/chat"  element={(
                <ProtectedRoute isAllowed={!!user}>
                  <Chat/>
                </ProtectedRoute>)}/>
            </Routes>
        </Container>
      <Footer/>
    </>
)
};

export default App
