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
    initialValues: { name: "", email: "", password: "", avatar: "https://picsum.photos/400" },
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

  return (
    <Container component="main" maxWidth="xs" sx={{ bgcolor: "white", py: 4, mt: 6, borderRadius: 3, boxShadow: 6, }}  >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}      >
        <Avatar sx={{ m: 1, bgcolor: "primary.dark" }} />
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{width:1, display:'flex', flexDirection:'column', gap:2, mt: 4 }}>
          <TextField required fullWidth label="Name" size="small" {...formik.getFieldProps("name")} error={!!formik.errors.name && formik.touched.name} helperText={formik.touched.name && formik.errors.name} />
          <TextField required fullWidth label="Email" size="small" {...formik.getFieldProps("email")} error={!!formik.errors.email && formik.touched.email} helperText={formik.touched.email && formik.errors.email} />
          <TextField required fullWidth label="Password" type="password" size="small" {...formik.getFieldProps("password")} error={!!formik.errors.password && formik.touched.password} helperText={formik.touched.password && formik.errors.password} />
          <TextField fullWidth size="small" label="Image url" placeholder="Enter image url." {...formik.getFieldProps("avatar")} error={!!formik.errors.avatar && formik.touched.avatar} helperText={formik.touched.avatar && formik.errors.avatar} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: "25px", textTransform: "none" }} disabled={formik.isSubmitting} >
            {formik.isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Register"}
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
