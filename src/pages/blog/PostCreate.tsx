import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Container, CircularProgress } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { toast } from "react-toastify";

const PostCreate = () => {
  const { addPost } = usePosts();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setAuthor(Number(user.id));
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      tags: "",
      image: "https://picsum.photos/400",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      body: Yup.string().required("Body is required"),
    }),
    onSubmit: async (values) => {
      if (author === null) {
        toast.error("Author not found. Please login again.");
        return;
      }

      const sanitizedBody = values.body.replace(/<br\s*\/?>/gi, "").trim();
      if (!sanitizedBody) {
        toast.error("Body cannot be empty");
        return;
      }

      setLoading(true); 
      try {
        await addPost({
          title: values.title,
          body: sanitizedBody,
          tags: values.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t),
          author,
          image: values.image
        });
        toast.success("Blog Added successfully!")
        navigate("/posts");
      } finally {
        setLoading(false); 
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 4, boxShadow: 2, borderBottom: 2, borderLeft: 2, borderRadius: 6, py: 6, px: 2, bgcolor: "white" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" mb={2}>
          Create Post
        </Typography>
        <Link to='/posts/'><Cancel sx={{ color: 'red' }} /></Link>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }} component="form" onSubmit={formik.handleSubmit}>
        <TextField fullWidth size="small" label="Title" {...formik.getFieldProps("title")} error={!!formik.errors.title && formik.touched.title} helperText={formik.touched.title && formik.errors.title} />
        <TextField fullWidth size="small" label="Image url" placeholder="Enter image url." {...formik.getFieldProps("image")} error={!!formik.errors.image && formik.touched.image} helperText={formik.touched.image && formik.errors.image} />
        <TextField fullWidth label="Blog details" placeholder="Enter the blog body details." multiline minRows={5} {...formik.getFieldProps("body")} error={!!formik.errors.body && formik.touched.body} helperText={formik.touched.body && formik.errors.body} />
        <TextField fullWidth size="small" label="Tags (comma separated)" {...formik.getFieldProps("tags")} />
        <Box sx={{ display: 'flex' }}>
          <Button type="submit" variant="contained" sx={{ mx: 'auto', background: 'linear-gradient(45deg, #0247e7ff 0%, #002884 90%)', mt: 2, px: { xs: 1, md: 3, lg: 8 } }} disabled={loading}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Post"
            )}
          </Button>
        </Box>
      </Box>
    </Container >
  );
};

export default PostCreate;
