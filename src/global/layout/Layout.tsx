import { Outlet } from 'react-router-dom'
import { alpha, Box, useTheme } from '@mui/material'
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const Layout = () => {
    const theme = useTheme();

    return (
        <>
            <Navbar />
            <Box sx={{ minHeight: '90vh', px: 2, pt: 8, background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)` }}>
                <Outlet />
            </Box>
            <Footer />
        </>
    )
}

export default Layout