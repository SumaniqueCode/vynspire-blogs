import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@mui/material";

const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
});

const Login = () => {
    const { login, isAuthenticated, loading } = useAuth();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: LoginSchema,
        onSubmit: (values) => login(values.email, values.password),
    });
    if (isAuthenticated) return <Navigate to="/posts" />;

    return (
        <Container component="main" maxWidth="xs" sx={{ bgcolor: "white", py: 4, mt: 6, borderRadius: 3, boxShadow: 6, }} >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}            >
                <Avatar sx={{ m: 1, bgcolor: "primary.dark" }} />
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ width: 1, display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
                    <TextField required fullWidth label="Email" size="small" {...formik.getFieldProps("email")} error={!!formik.errors.email && formik.touched.email} helperText={formik.touched.email && formik.errors.email} />
                    <TextField required fullWidth label="Password" type="password" size="small" {...formik.getFieldProps("password")} error={!!formik.errors.password && formik.touched.password} helperText={formik.touched.password && formik.errors.password} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: "25px", textTransform: "none" }} disabled={loading} >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                    </Button>

                    <Link to="/register" style={{ textDecoration: "none" }}>
                        Don't have an account? Sign Up
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
