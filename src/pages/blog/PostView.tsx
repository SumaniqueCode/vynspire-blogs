import { Box, Typography, Button, Paper, Chip, Divider, Alert, Stack, Avatar, Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import { usePosts } from "../../hooks/usePosts";
import type { Post } from "../../interface/Post";
import type { User } from "../../interface/User";
import { ArrowBack, Edit, Person, CalendarToday} from "@mui/icons-material";
import { formatDate } from "../../global/utilities/DateFormatter";
import { getUsers } from "../../apis/users";
import DeleteBlog from "./components/DeleteBlog";
import BlogShare from "./components/BlogShare";
import { useAuth } from "../../hooks/useAuth";
import BlogBody from "./components/BlogBody";

const PostView = () => {
    const { posts, fetchPosts, loading } = usePosts();
    const {isAuthenticated, user} = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const res = await getUsers();
                setUsers(res);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        getUsersData();
    }, []);

    useEffect(() => {
        setError("");
        if (!id) {
            setError("Invalid post ID");
            return;
        }

        const found = posts.find((p) => p.id === id);
        if (!found && !loading) {
            setError("Post not found");
            setPost(null);
        } else if (found) {
            setPost(found);
        }
    }, [id, posts, loading]);

    const author = useMemo(() =>
        users?.find((u) => u.id == post?.author),
        [users, post?.author]
    );

    const handleEdit = useCallback(() => {
        if (post) navigate(`/posts/edit/${post.id}`);
    }, [post, navigate]);

    const handleBack = useCallback(() => {
        navigate("/posts");
    }, [navigate]);

    if (loading) {
        return (
            <Box sx={{ maxWidth: 900, mx: "auto", mt: { xs: 4, md: 8 }, px: { xs: 2, sm: 3 } }}>
                <Paper elevation={3} sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
                    <Skeleton variant="text" width="60%" height={60} />
                    <Skeleton variant="text" width="40%" height={30} sx={{ mt: 2 }} />
                    <Divider sx={{ my: 3 }} />
                    <Skeleton variant="rectangular" height={300} />
                </Paper>
            </Box>
        );
    }

    if (error || !post) {
        return (
            <Box sx={{ maxWidth: 900, mx: "auto", mt: { xs: 4, md: 8 }, px: { xs: 2, sm: 3 } }}>
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error || "Post not found"}
                </Alert>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={handleBack} sx={{ textTransform: "none" }}>
                    Back to Posts
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: { xs: 3, md: 6 }, px: { xs: 2, sm: 3 }, pb: 6 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={handleBack}
                    sx={{ background: 'linear-gradient(45deg, #0247e7ff 0%, #002884 90%)', color: 'white', textTransform: "none",
                        '&:hover': {
                            background: 'linear-gradient(45deg, #002884 0%, #001654 90%)',
                        }}}>
                    Back
                </Button>
                {isAuthenticated && post.author==user?.id&&
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" startIcon={<Edit />} onClick={handleEdit}
                            sx={{ background: 'linear-gradient(45deg, #0247e7ff 0%, #002884 90%)', color: 'white', textTransform: "none",
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #002884 0%, #001654 90%)',
                                }}}>
                            Edit
                        </Button>
                        <DeleteBlog post={post} />
                    </Stack>
                }
            </Box>
            <Paper elevation={3} sx={{ px: { xs: 3, sm: 4, md: 5 }, py: { xs: 2, md: 3, lg: 4 } }}>
                <Typography variant="h3" component="h1" fontWeight={700} gutterBottom sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" }, lineHeight: 1.2, mb: 2, }}>
                    {post.title}
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} divider={<Divider orientation="vertical" flexItem />} sx={{ mb: 3, ml: { xs: 0, sm: 2 }, flexWrap: "wrap" }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Avatar src={author?.avatar || ""} sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                            {author?.name?.[0]?.toUpperCase() || <Person sx={{ fontSize: 18 }} />}
                        </Avatar>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            {author?.name || `User ${post.author}`}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday sx={{ fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                            {formatDate(post.createdAt)}
                        </Typography>
                    </Box>
                </Stack>
                <Divider sx={{ mb: 3 }} />
                {post.image && (
                    <Box sx={{ display: 'flex', mb: 3 }}>
                        <Box component="img" src={post.image} alt={post.title}
                         sx={{ mx: 'auto', width: '100%', maxWidth: 800, height: { xs: 250, sm: 300, lg: 400 }, objectFit: "cover", borderRadius: 2, border: "1px solid", borderColor: "divider"}}
                         loading="lazy" />
                    </Box>
                )}
<BlogBody html={post.body} />



                {post.tags && post.tags.length > 0 && (
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={600}>
                            Tags
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {post.tags.map((tag: string, index: number) => (
                                <Chip  key={index}  label={tag}  size="small"
                                    sx={{ background: 'linear-gradient(45deg, #0247e7ff 0%, #002884 90%)', color: 'white', fontWeight: 500,
                                        '&:hover': {  background: 'linear-gradient(45deg, #002884 0%, #001654 90%)',
                                    } }} />  
                            ))}
                        </Stack>
                    </Box>
                )}
                <Divider sx={{ my: 4 }} />
                <BlogShare post={post} />
                {post.updatedAt && post.updatedAt !== post.createdAt && (
                    <Box mt={4} pt={3} borderTop="1px solid" borderColor="divider">
                        <Typography variant="caption" color="text.secondary">
                            Last updated: {formatDate(post.updatedAt)}
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default PostView;