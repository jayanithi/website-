import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import "./styles.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#635BFF", dark: "#5148E5" },
    secondary: { main: "#12B8A6" },
    background: { default: "#F6F7FB", paper: "#FFFFFF" },
    text: { primary: "#172033", secondary: "#697386" }
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    button: { textTransform: "none", fontWeight: 700 }
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 10, boxShadow: "none" } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } }
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);