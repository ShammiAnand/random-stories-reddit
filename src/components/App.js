import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Paper } from "@mui/material";

const App = () => {
  const [posts, setPosts] = useState([]);

  // choose one post from the array of posts
  const [randomPost, setRandomPost] = useState({});

  const getPostsFromReddit = async () => {
    const res = await axios.get(
      "https://www.reddit.com/r/nosleep/.json?&limit=50&raw_json=1"
    );

    const data = await res.data.data.children;

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
        height: "100vh",
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
          bgcolor: "#E74646",
          width: "80vw",
          height: "10vh",
          borderRadius: "20px",
        }}
      ></Paper>

      <Paper
        elevation={3}
        sx={{
          bgcolor: "#FA9884",
          width: "80vw",
          height: "70vh",
          borderRadius: "20px",
        }}
      ></Paper>
    </Box>
  );
};

export default App;
