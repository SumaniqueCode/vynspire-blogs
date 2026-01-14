import { Avatar, Box, Button, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { LogoutOutlined, Menu as MenuIcon } from "@mui/icons-material"
import { useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "../../../hooks/useAuth"

const NavComponents = () => {
const { logoutUser, isAuthenticated, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = useState<boolean>(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logoutUser()
    toast.success("Logged out successfully!")
    navigate('/login');
  };
  console.log(user)
  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 'auto' }}>
        {isAuthenticated ? (
          <Box sx={{display: 'flex', gap:4, alignItems: 'center'}}>
            <Link to="/posts" > <Button variant="contained" size='medium' sx={{ color: 'black', fontWeight: "bold", borderBottom: 2, px: 5, borderRadius: '8px', backgroundColor: 'white' }}>Blogs</Button></Link>
            <Paper onClick={() => setAnchorE2(!anchorE2)} elevation={0} sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 220, }}  >
              <Avatar src={user?.avatar} sx={{ background: 'linear-gradient(45deg, #0247e7ff 0%, #002884 90%)', width: 48, height: 48, fontSize: 18, }} />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Suman Regmi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  @regmisuman
                </Typography>
              </Box>
              <Menu sx={{ top: 50 }} open={anchorE2} onClose={() => setAnchorE2(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{ elevation: 4, sx: { mt: 1, minWidth: 180, borderRadius: 2, overflow: "hidden", }, }} >
                <MenuItem onClick={handleLogout} sx={{ gap: 1.5, py: 1.2, fontWeight: 500, "&:hover": { bgcolor: "error.light", color: "white", }, }}>
                  <LogoutOutlined fontSize="small" />
                  Logout
                </MenuItem>
              </Menu>
            </Paper>
          </Box>
        ) : (
          <>
            <Link to="/login" >
              <Button variant="contained" size='medium' sx={{ color: 'black', fontWeight: "bold", borderBottom: 2, px: 5, borderRadius: '8px', backgroundColor: 'white' }}>Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="contained" size='medium' sx={{ fontWeight: "bold", borderBottom: 2, px: 3, borderRadius: '8px', background: 'linear-gradient(45deg, #0247e7ff 0%, #002884 90%)', "&:hover": { background: 'linear-gradient(45deg, #002884 0%, #0247e7ff 90%)' }, }} >Register</Button>
            </Link>
          </>
        )}
      </Box>
      <IconButton sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }} onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu PaperProps={{ elevation: 4, sx: { mt: 1, minWidth: 180, borderRadius: 2, overflow: "hidden", }, }} anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }} >
        <MenuItem sx={{ borderTop: '2px solid' }}><Link to="/posts" style={{ textDecoration: 'none', color: 'black', paddingInline: '6px', fontWeight: 500 }}> Home</Link></MenuItem>
        {!isAuthenticated ? (
          <Box>
            <MenuItem sx={{ borderTop: '2px solid' }}><Link to="/login" style={{ textDecoration: 'none', color: 'black', paddingInline: '6px', fontWeight: 500, }}>  Login</Link></MenuItem>
            <MenuItem sx={{ borderTop: '2px solid' }}><Link to="/register" style={{ textDecoration: 'none', color: 'black', paddingInline: '6px', fontWeight: 500 }}>Register</Link></MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem sx={{ borderTop: '2px solid' }}><Link to="/posts" style={{ textDecoration: 'none', color: 'black', paddingInline: '6px', fontWeight: 500, }}>  Blogs</Link></MenuItem>
            <MenuItem onClick={handleLogout} sx={{ gap: 1.5, py: 1.2, fontWeight: 500, "&:hover": { bgcolor: "error.light", color: "white", }, }}>
              <LogoutOutlined fontSize="small" />
              Logout
            </MenuItem>
          </Box>
        )}
      </Menu>
    </>
  )
}

export default NavComponents