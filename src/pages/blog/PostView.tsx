import { Box, Typography, Button, Paper, Chip, Divider, Alert, Stack, Avatar, Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../../hooks/usePosts";
import type { Post } from "../../interface/Post";
import { ArrowBack, Delete, Edit, Person, CalendarToday } from "@mui/icons-material";

const stripHtmlTags = (html: string): string => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};

const formatDate = (dateString?: string): string => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const PostView: React.FC = () => {
    const { posts, removePost, fetchPosts, loading } = usePosts();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);
    
    useEffect(() => {
        setError("");

        if (!id) {
            setError("Invalid post ID");
            return;
        }

        const found = posts.find((p) => p.id === id);
        if (!found) {
            setError("Post not found");
            setPost(null);
        } else {
            setPost(found);
        }

    }, [id, posts]);

    const handleDelete = async (): Promise<void> => {
        if (!post) return;

        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await removePost(post.id);
                navigate("/posts");
            } catch (err) {
                setError("Failed to delete post");
            }
        }
    };

    const handleEdit = (): void => {
        if (post) {
            navigate(`/posts/edit/${post.id}`);
        }
    };

    const handleBack = (): void => {
        navigate("/posts");
    };

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
                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                    action={
                        <Button color="inherit" size="small" onClick={handleBack}>
                            Go Back
                        </Button>
                    }
                >
                    {error || "Post not found"}
                </Alert>
                <Button
                    variant="contained"
                    startIcon={<ArrowBack />}
                    onClick={handleBack}
                    sx={{ textTransform: "none" }}
                >
                    Back to Dashboard
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: { xs: 4, md: 8 }, px: { xs: 2, sm: 3 }, pb: 6 }}>
            {/* Action Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={handleBack}
                    sx={{ textTransform: "none" }}
                >
                    Back
                </Button>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={handleEdit}
                        sx={{ textTransform: "none" }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={handleDelete}
                        sx={{ textTransform: "none" }}
                    >
                        Delete
                    </Button>
                </Stack>
            </Box>

            {/* Main Content */}
            <Paper elevation={3} sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
                {/* Title */}
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                        fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                        lineHeight: 1.2,
                        mb: 3,
                    }}
                >
                    {post.title}
                </Typography>

                {/* Metadata */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    divider={<Divider orientation="vertical" flexItem />}
                    sx={{ mb: 3, flexWrap: "wrap" }}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                            <Person sx={{ fontSize: 18 }} />
                        </Avatar>
                        <Typography variant="body2" color="text.secondary">
                            {post.author}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday sx={{ fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                            {formatDate(post.createdAt)}
                        </Typography>
                    </Box>
                </Stack>

                <Divider sx={{ mb: 4 }} />

                {/* Post Body */}
                <Typography
                    variant="body1"
                    component="div"
                    sx={{
                        fontSize: { xs: "1rem", md: "1.125rem" },
                        lineHeight: 1.8,
                        color: "text.primary",
                        "& p": { mb: 2 },
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    }}
                >
                    {stripHtmlTags(post.body)}
                </Typography>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <>
                        <Divider sx={{ my: 4 }} />
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Tags
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {post.tags.map((tag: string, index: number) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        variant="outlined"
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </>
                )}

                {/* Update Info */}
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
