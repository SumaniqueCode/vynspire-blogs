import { Box, Button, TextField, Typography, Container, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Post } from "../../interface/Post";
import { Cancel } from "@mui/icons-material";
import { toast } from "react-toastify";

const PostSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body is required"),
});

const PostEdit = () => {
  const { posts, updatePost, fetchPosts, loading } = usePosts();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setAuthor(user.id);
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    const found = posts.find((p) => p.id === id);
    setPost(found || null);
  }, [id, posts]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: post?.title || "",
      body: post?.body || "",
      tags: post?.tags?.join(", ") || "",
      image: post?.image || "picsum.photos/400"
    },
    validationSchema: PostSchema,
    onSubmit: async (values) => {
      if (!post || !author) return;

      await updatePost(post.id, {
        title: values.title,
        body: values.body,
        tags: values.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        updatedAt: new Date().toISOString(),
        image: values.image
      });
        toast.success("Blog Added successfully!")
      navigate(`/posts/view/${post.id}`);
    },
  });

  if (!post) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={48} />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 4, boxShadow: 2, borderBottom: 2, borderLeft: 2, borderRadius: 6, py: 6, px: 2, bgcolor: "white" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" mb={2}>
          Edit Post
        </Typography>
        <Link to={`/posts/view/${post.id}`}><Cancel /></Link>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, }} component="form" onSubmit={formik.handleSubmit}>
        <TextField fullWidth label="Title" margin="normal" {...formik.getFieldProps("title")} />
        <TextField fullWidth label="Image url" placeholder="Leave blank for random image." {...formik.getFieldProps("image")} error={!!formik.errors.title && formik.touched.title} helperText={formik.touched.title && formik.errors.title} />
        <TextField fullWidth label="Body" margin="normal" multiline rows={5} {...formik.getFieldProps("body")} />
        <TextField fullWidth label="Tags (comma separated)" margin="normal" {...formik.getFieldProps("tags")} />
        <Box sx={{ display: 'flex' }}>
          <Button type="submit" variant="contained" sx={{ mx: 'auto', background: 'linear-gradient(45deg, #0247e7ff 0%, #002884 90%)', mt: 2, px: { xs: 1, md: 3, lg: 8 } }} disabled={loading}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Edit Post"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PostEdit