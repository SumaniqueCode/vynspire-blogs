import { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Typography, Grid, Pagination, TextField, InputAdornment, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import type { Post } from "../../interface/Post";
import { Add, Search } from "@mui/icons-material";
import BlogCard from "./BlogCard";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const { posts, loading, error, fetchPosts } = usePosts();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [paginatedPosts, setPaginatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const filtered = posts.filter(
      (post: Post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.body).toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
    setPage(1);
  }, [searchQuery, posts]);

  useEffect(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    setPaginatedPosts(filteredPosts.slice(start, end));
  }, [page, filteredPosts]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error" sx={{ maxWidth: 600, mx: "auto" }}>
          {error}
        </Alert>
      </Box>
    );
  }

  const pageCount = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  const handleClearSearch = (): void => {
    setSearchQuery("");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1400, mx: "auto" }}>
      <Grid container spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
        {/* <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Blog Dashboard
          </Typography>
        </Grid> */}
        <Grid size={{ xs: 12, md: 10, }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search posts by title or content..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/posts/create")}
            sx={{ textTransform: "none", px: 3 }}
          >
            Create New Post
          </Button>
        </Grid>
      </Grid>

      {filteredPosts.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchQuery ? "No posts found matching your search" : "No posts available"}
          </Typography>
          {searchQuery && (
            <Button
              variant="text"
              onClick={handleClearSearch}
              sx={{ mt: 2, textTransform: "none" }}
            >
              Clear Search
            </Button>
          )}
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedPosts.map((post: Post) => (
              <Grid size={{ xs: 12, md: 6 }} key={post.id}>
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>

          {pageCount > 1 && (
            <Box mt={6} display="flex" justifyContent="center">
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Blog;
