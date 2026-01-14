import { useNavigate } from "react-router-dom";
import { usePosts } from "../../../hooks/usePosts";
import type { Post } from "../../../interface/Post";
import { toast } from "react-toastify";
import { Button, Card, CardActions, CardContent, Modal, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";

interface PostProps {
    post: Post;
}

const DeleteBlog = ({ post }: PostProps) => {
    const { removePost, loading } = usePosts();
    const navigate = useNavigate();
    const [openDeleteCard, setOpenDeleteCard] = useState(false);

    const handleDelete = async () => {
        try {
            await removePost(post.id);
            toast.success("Post deleted successfully");
            navigate("/posts");
        } catch {
            toast.error("Failed to delete post");
        }
    };

    return (
        <>
            <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => setOpenDeleteCard(true)}
                sx={{ background: 'linear-gradient(45deg, rgb(231, 2, 2) 0%, #840000 90%)', color: 'white', textTransform: "none",
                    '&:hover': { background: 'linear-gradient(45deg, #840000 0%, #5a0000 90%)', }
                }}  >
                Delete
            </Button>

            <Modal sx={{ maxWidth: 'sm', top: '40%', left: '30%' }} open={openDeleteCard} onClose={() => setOpenDeleteCard(false)}>
                <Card sx={{ borderRadius: 3, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Delete Post
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Are you sure you want to delete this post?
                            This action cannot be undone.
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                        <Button onClick={() => setOpenDeleteCard(false)} disabled={loading} sx={{ textTransform: "none" }}>
                            Cancel
                        </Button>

                        <Button onClick={handleDelete} color="error" variant="contained" disabled={loading}
                            sx={{ background: 'linear-gradient(45deg, rgb(231, 2, 2) 0%, #840000 90%)', color: 'white', textTransform: "none",
                                '&:hover': { background: 'linear-gradient(45deg, #840000 0%, #5a0000 90%)' }}}  >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </>
    );
};

export default DeleteBlog;
