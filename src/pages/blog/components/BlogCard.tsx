import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { Post } from "../../../interface/Post";
import { formatDate } from "../../../global/utilities/DateFormatter";
import { useEffect, useMemo, useState } from "react";
import { type User } from "../../../interface/User";
import { getUsers } from "../../../apis/users";
import { toast } from "react-toastify";
import { stripHtmlTags } from "../../../global/utilities/htmlUtilities";
interface BlogProps {
    post: Post;
}

const BlogCard = ({ post }: BlogProps) => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const getUsersData = async () => {
            try {
                setLoading(true);
                const res = await getUsers()
                setUsers(res)
            } catch (error) {
                toast.error("Error occured while fetching the data")
            } finally {
                setLoading(false)
            }
        }
        getUsersData()
    }, [])
    const navigate = useNavigate();
    const author = useMemo(() =>
        users?.find((u) => u.id == post?.author),
        [users, post?.author]
    );
    return (
        <Card
            onClick={() => navigate(`/posts/view/${post.id}`)}
            elevation={2}
            sx={{ height: "100%", display: "flex", flexDirection: "column", transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": { cursor: 'pointer', transform: "translateY(-4px)", boxShadow: 4 },
            }} >
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography variant="h6" component="h2" fontWeight={600}
                    sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"}}>
                    {post.title}
                </Typography>
                <Stack sx={{ mb: 1, ml: 1 }} direction={'row'} gap={2}>
                    <Typography variant="body2" color="text.secondary" >
                        by {loading ? post.author : author?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        {formatDate(post.createdAt)}
                    </Typography>
                </Stack>
                <Grid container>
                    <Grid size={{ xs: 4, md: 2 }} sx={{ display: "flex", alignItems: "center" }}>
                        <Box component="img" src={post.image} alt={post.title}
                            sx={{ mx: 1, width: "95%", height: 80, objectFit: "cover", borderRadius: 1, border: "1px solid", borderColor: "divider", backgroundColor: "grey.100" }}
                            loading="lazy"
                        />
                    </Grid>

                    <Grid size={{ xs: 8, md: 10 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ ml: 1, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", }}
                        >
                            {stripHtmlTags(post.body)}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default BlogCard