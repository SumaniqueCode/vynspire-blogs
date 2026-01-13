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
    const { login, isAuthenticated, loading, error } = useAuth();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: LoginSchema,
        onSubmit: (values) => login(values.email, values.password),
    });
    if (isAuthenticated) return <Navigate to="/posts" />;
    const { values, errors, touched, handleChange, handleSubmit } = formik;

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                bgcolor: "white",
                py: 4,
                mt: 6,
                borderRadius: 3,
                boxShadow: 6,
            }}
        >
            <Box
                sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.dark" }} />
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        size="small"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                        <Typography color="error" variant="body2">
                            {errors.email}
                        </Typography>
                    )}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        size="small"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                        <Typography color="error" variant="body2">
                            {errors.password}
                        </Typography>
                    )}

                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: "25px", textTransform: "none" }}
                        disabled={loading}
                    >
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
