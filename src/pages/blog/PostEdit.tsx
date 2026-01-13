import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Post } from "../../interface/Post";

const PostSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body is required"),
});

const PostEdit = () => {
  const { posts, updatePost } = usePosts();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<number | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setAuthor(Number(user.id));
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    const found = posts.find((p) => p.id === id);
    if (found) setPost(found);
  }, [id, posts]);

  if (!post) return <Typography mt={8}>Loading post...</Typography>;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: post.title,
      body: post.body,
      tags: post.tags.join(", "),
    },
    validationSchema: PostSchema,
    onSubmit: async (values) => {
      if (author === null) {
        alert("Author not found. Please login again.");
        return;
      }

      await updatePost(post.id, {
        title: values.title,
        body: values.body,
        tags: values.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        author,
        updatedAt: new Date().toISOString(),
      });

      navigate("/posts");
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" mb={2}>
        Edit Post
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit}>
        {/* Title */}
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          {...formik.getFieldProps("title")}
          error={!!formik.errors.title && formik.touched.title}
          helperText={formik.touched.title && formik.errors.title}
        />

        {/* Body */}
        <TextField
          fullWidth
          label="Body"
          margin="normal"
          multiline
          rows={5}
          {...formik.getFieldProps("body")}
          error={!!formik.errors.body && formik.touched.body}
          helperText={formik.touched.body && formik.errors.body}
        />

        {/* Tags */}
        <TextField
          fullWidth
          label="Tags (comma separated)"
          margin="normal"
          {...formik.getFieldProps("tags")}
        />

        {/* Author ID read-only */}
        <TextField
          fullWidth
          label="Author ID"
          margin="normal"
          value={author || ""}
          InputProps={{ readOnly: true }}
        />

        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          Update Post
        </Button>
      </Box>
    </Container>
  );
};

export default PostEdit;
