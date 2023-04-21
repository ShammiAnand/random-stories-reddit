import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Paper, Typography } from "@mui/material";
import Content from "./Content";
import RedditIcon from "@mui/icons-material/Reddit";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // choose one post from the array of posts
  const [randomPost, setRandomPost] = useState({
    author: "Shammi Anand",
    title: "A Random Reddit Post from /r/nosleep",
    text: "Click on the NEW button to get a new post",
    url: "",
    subreddit: "",
    created: "4/20/2023",
  });

  const getPostsFromReddit = async () => {
    const res = await axios.get(
      "https://www.reddit.com/r/nosleep/.json?&limit=75&raw_json=1"
    );

    const data = await res.data.data.children;
    setLoading(false);
    data.forEach((item) => {
      if (item.data.selftext && item.data.selftext !== "") {
        setPosts((posts) => [
          ...posts,
          {
            author: item.data.author,
            title: item.data.title,
            text: item.data.selftext,
            url: item.data.url,
            subreddit: item.data.subreddit,
            created: item.data.created,
          },
        ]);
      }
    });
  };

  const getRandomPost = () => {
    let randomIndex = Math.floor(Math.random() * posts.length);
    while (posts[randomIndex] === randomPost || posts[randomIndex] === {}) {
      randomIndex = Math.floor(Math.random() * posts.length);
    }
    setRandomPost(posts[randomIndex]);
  };

  useEffect(() => {
    getPostsFromReddit();
  }, []);

  useEffect(() => {
    console.log(randomPost);
  }, [randomPost]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "fit-content",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        bgcolor: "#FFE5CA",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          my: "2rem",
          bgcolor: "#E74646",
          width: "80vw",
          height: "10vh",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "40vw",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RedditIcon
            sx={{
              // mt: "0.5rem",
              color: "white",
              fontSize: "4rem",
            }}
          />
          <Typography
            sx={{
              // mt: "1rem",
              color: "white",
            }}
          >
            <b>/r/nosleep</b>
          </Typography>
        </Box>
        <Box
          sx={{
            width: "40vw",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              width: "15vw",
            }}
            onClick={getRandomPost}
            disabled={loading}
          >
            <Typography>{loading ? "Loading..." : "NEW"}</Typography>
          </Button>
        </Box>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          bgcolor: "#FA9884",
          width: "80vw",
          height: "auto",
          minHeight: "65vh",
          borderRadius: "20px",
          mb: "2rem",
        }}
      >
        <Content post={randomPost} loading={loading} />
      </Paper>
    </Box>
  );
};

export default App;
