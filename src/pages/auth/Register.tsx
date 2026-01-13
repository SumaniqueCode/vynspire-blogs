import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import api from "../../apis/axios";
import { Avatar, Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";

const RegisterSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
});

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.post("/users", values);
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push({ ...values, id: res.data.id || Date.now() });
        localStorage.setItem("users", JSON.stringify(users));

        toast.success("Registration successful");
        navigate("/login");
      } catch {
        toast.error("Registration failed");
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = formik;

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        bgcolor: "white",
        py: 4,
        mt:6,
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
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            size="small"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && touched.name && (
            <Typography color="error" variant="body2">{errors.name}</Typography>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            size="small"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <Typography color="error" variant="body2">{errors.email}</Typography>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            size="small"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && touched.password && (
            <Typography color="error" variant="body2">{errors.password}</Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "25px", textTransform: "none" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>

          <Link to="/login" style={{ textDecoration: "none" }}>
            Already have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
