import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Container, CircularProgress } from "@mui/material";

const PostCreate = () => {
  const { addPost } = usePosts();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Get author ID from localStorage
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
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      body: Yup.string().required("Body is required"),
    }),
    onSubmit: async (values) => {
      if (author === null) {
        alert("Author not found. Please login again.");
        return;
      }

      const sanitizedBody = values.body.replace(/<br\s*\/?>/gi, "").trim();
      if (!sanitizedBody) {
        alert("Body cannot be empty");
        return;
      }

      setLoading(true); // start loading
      try {
        await addPost({
          title: values.title,
          body: sanitizedBody,
          tags: values.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t),
          author,
        });
        navigate("/posts");
      } finally {
        setLoading(false); // stop loading
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" mb={2}>
        Create Post
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit}>
        {/* Title */}
        <Box mb={2}>
          <TextField
            fullWidth
            label="Title"
            {...formik.getFieldProps("title")}
            error={!!formik.errors.title && formik.touched.title}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Box>

        {/* Body */}
        <Box mb={2}>
          <TextField
            fullWidth
            label="Body"
            multiline
            minRows={5}
            {...formik.getFieldProps("body")}
            error={!!formik.errors.body && formik.touched.body}
            helperText={formik.touched.body && formik.errors.body}
          />
        </Box>

        {/* Tags */}
        <Box mb={2}>
          <TextField
            fullWidth
            label="Tags (comma separated)"
            {...formik.getFieldProps("tags")}
          />
        </Box>

        {/* Author ID */}
        <Box mb={2}>
          <TextField
            fullWidth
            label="Author ID"
            value={author || ""}
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Button fullWidth type="submit" variant="contained" disabled={loading}>
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Create Post"
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default PostCreate;
