import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const Layout = () => {
    return (
        <>
            <Navbar />
            <Box sx={{ minHeight: '90vh', px: 2, pt: 8, pb:2, background: 'linear-gradient(270deg, rgba(154, 184, 255, 0.06) 0%, #5d8dfd1e 90%)' }}>
                <Outlet />
            </Box>
            <Footer />
        </>
    )
}

export default Layout