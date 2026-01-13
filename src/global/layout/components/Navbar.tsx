import { AppBar, Avatar, Box, Toolbar, Typography, } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationContainer from "./NotificationContainer";
import NavComponents from "./NavComponents";

const Navbar = () => {
    return (
        <AppBar position="static" sx={{px: 4, borderBottom: 4, borderColor: 'gray', borderBottomRightRadius:'20px', borderBottomLeftRadius: '20px',boxShadow:4, bgcolor: 'white', color: 'text.primary', position:'fixed', zIndex:100}}>
            <Toolbar sx={{ display: 'flex', gap: 2 }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar style={{ backgroundColor: 'white', width: 60, height: 60 }} >VYNSPIRE </Avatar>
                        <Typography variant="h5" sx={{ color: '#002884', fontWeight: 300, fontFamily: 'fantasy', letterSpacing: 4 }}>VYNSPIRE</Typography>
                    </Box>
                </Link>
                <NavComponents />
            </Toolbar>
            <NotificationContainer />
        </AppBar>
    )
}

export default Navbar