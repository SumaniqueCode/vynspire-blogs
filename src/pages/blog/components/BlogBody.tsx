import { Box } from "@mui/material";
import { renderHtml } from "../../../global/utilities/htmlUtilities";

interface BlogBodyProps {
  html: string;
}

const BlogBody = ({ html }: BlogBodyProps) => {
  return (
    <Box
      component="article"
      sx={{
        color: "text.primary", fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" }, lineHeight: 1.8, mb: 8, wordBreak: "break-word",
        "& h1": { fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" }, lineHeight: 1.25, fontWeight: 700, mt: 4, mb: 2, letterSpacing: "-0.5px" },
        "& h2": { fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.1rem" }, lineHeight: 1.3, fontWeight: 600, mt: 3, mb: 2, borderBottom: "2px solid", borderColor: "divider", pb: 1 },
        "& h3": { fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.8rem" }, lineHeight: 1.25, fontWeight: 600, mt: 2.5, mb: 1.5 },
        "& p": { mb: 2.5, fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" }, lineHeight: 1.75, color: "text.primary" },
        "& strong, & b": { fontWeight: 700 },
        "& em, & i": { fontStyle: "italic" },
        "& a": { color: "primary.main", textDecoration: "underline", "&:hover": { textDecoration: "none" } },
        "& ul, & ol": { pl: { xs: 3, sm: 4 }, mb: 3 },
        "& li": { mb: 1.5 },
        "& img": { display: "flex", mx:'auto', maxHeight:400, borderRadius: 3, mb: 4, boxShadow: "0px 4px 12px rgba(0,0,0,0.08)" },
        "& blockquote": { borderLeft: "4px solid", borderColor: "divider", pl: 3, color: "text.secondary", fontStyle: "italic", mb: 4, backgroundColor: "action.hover", borderRadius: 1, py: 1.5 },
        "& hr": { my: 5, border: "none", borderTop: "1px solid", borderColor: "divider" },
        "& table": { width: "100%", borderCollapse: "collapse", mb: 4 },
        "& th, & td": { border: "1px solid", borderColor: "divider", px: 2, py: 1 },
        "& th": { backgroundColor: "action.hover", fontWeight: 600 },
      }}
    >
      {renderHtml(html)}
    </Box>
  );
};

export default BlogBody;
