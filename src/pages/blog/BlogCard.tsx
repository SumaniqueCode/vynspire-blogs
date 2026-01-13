import { Card, CardContent, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { Post } from "../../interface/Post";
import { formatDate } from "../../global/utilities/DateFormatter";
interface BlogProps{
    post: Post;
}

const BlogCard = ({post}:BlogProps) => {
    const navigate = useNavigate();
    return (
        <Card
            onClick={() => navigate(`/posts/view/${post.id}`)}
            elevation={2}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    cursor: 'pointer',
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography
                    variant="h6"
                    component="h2"
                    fontWeight={600}
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {post.title}
                </Typography>
                <Stack sx={{ mb: 1, ml: 1 }} direction={'row'} gap={2}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        by {post.author}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary" >
                        {formatDate(post.createdAt)}
                    </Typography>
                </Stack>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        ml: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {(post.body)}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BlogCard