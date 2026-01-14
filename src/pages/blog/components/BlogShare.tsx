import { useCallback, useState } from "react";
import type { Post } from "../../../interface/Post";
import { Facebook, Twitter, LinkedIn, Link as LinkIcon, Check } from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";


interface PostProps {
    post: Post;
}

const BlogShare = ({ post }: PostProps) => {
    const [linkCopied, setLinkCopied] = useState(false);

    const handleCopyLink = useCallback(async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    }, []);

    const handleShareFacebook = useCallback(() => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }, []);

    const handleShareTwitter = useCallback(() => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(post?.title || '');
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }, [post]);

    const handleShareLinkedIn = useCallback(() => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }, []);
    return (
        <Box>
            <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
                Share this post
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                <Tooltip title="Share on Facebook">
                    <IconButton onClick={handleShareFacebook} sx={{ bgcolor: '#1877f2', color: 'white', '&:hover': { bgcolor: '#145dbf', } }}  >
                        <Facebook />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Share on Twitter">
                    <IconButton onClick={handleShareTwitter} sx={{ bgcolor: '#1da1f2', color: 'white', '&:hover': { bgcolor: '#1a8cd8', } }} >
                        <Twitter />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Share on LinkedIn">
                    <IconButton onClick={handleShareLinkedIn} sx={{ bgcolor: '#0a66c2', color: 'white', '&:hover': { bgcolor: '#084d91', } }}  >
                        <LinkedIn />
                    </IconButton>
                </Tooltip>

                <Tooltip title={linkCopied ? "Link copied!" : "Copy link"}>
                    <IconButton onClick={handleCopyLink} sx={{ bgcolor: linkCopied ? '#4caf50' : 'action.hover', color: linkCopied ? 'white' : 'text.primary', border: 1, borderColor: 'divider', '&:hover': { bgcolor: linkCopied ? '#45a049' : 'action.selected', } }}  >
                        {linkCopied ? <Check /> : <LinkIcon />}
                    </IconButton>
                </Tooltip>
            </Stack>
        </Box>
    )
}

export default BlogShare