import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";

function Content({ post }) {
  useEffect(() => {
    console.log("from Content", post);
  }, [post]);

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
      }}
    >
      <Typography variant="h3">{post.title}</Typography>
      <Typography variant="h4">{post.author}</Typography>
      <Typography>{post.text}</Typography>
    </Box>
  );
}

export default Content;
