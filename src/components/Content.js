import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import LinkIcon from "@mui/icons-material/Link";

function Content({ post }) {
  const [expanded, setExpanded] = useState(false);
  const [truncatedText, setTruncatedText] = useState("");

  useEffect(() => {
    console.log("from Content", post);
    const words = post.text.split(" ");
    if (words.length > 151) {
      setTruncatedText(words.slice(0, 150).join(" ") + "...");
    } else {
      setTruncatedText(post.text);
    }
  }, [post]);

  const handleReadMore = () => {
    setExpanded(!expanded);
  };

  // Remove links from post.text using regex
  const cleanText = post.text.replace(/(https?:\/\/[^\s]+)/g, "");

  return (
    <Box sx={{ px: [2, 3], py: 2 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
        }}
      >
        {post.title}
      </Typography>
      <Box
        sx={{
          mb: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">{post.author}</Typography>
        <a
          href={post.url}
          style={{
            textDecoration: "none",
            padding: "0",
          }}
        >
          <LinkIcon
            sx={{
              ml: 1,
              color: "text.secondary",
              fontSize: "3rem",
              pointer: "cursor",
            }}
          />
        </a>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1" color="text.secondary">
          {new Date(post.created).toDateString()}
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography>{expanded ? post.text : cleanText}</Typography>
      </Box>
      {post.text.split(" ").length > 150 && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleReadMore}
            sx={{ borderRadius: "15px" }}
          >
            {expanded ? "Read Less" : "Read More"}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Content;
