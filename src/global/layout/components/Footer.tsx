import { alpha, Box, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"

const Footer = (props: any) => {
    const theme = useTheme();
    return (
        <Box sx={{ background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`}}>
            <Typography sx={{bgcolor:'white', py:2, borderTop:2,borderTopRightRadius:24, borderTopLeftRadius:24}} variant="body2" color="text.secondary" align="center"
                {...props} >
                {"Copyright © "}
                <Link color="inherit" to="/">
                    Vynspire Blogs
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </Box>
    )
}

export default Footer