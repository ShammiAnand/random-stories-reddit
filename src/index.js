import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import { ThemeProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = {
  palette: {
    primary: {
      main: "#f44336",
    },
    secondary: {
      main: "#3ea6ff",
    },
  },
};

root.render(
  //   <ThemeProvider theme={theme}>
  <App />
  //   </ThemeProvider>
);
