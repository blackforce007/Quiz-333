import React from "react";
import QuizEngine from "./QuizEngine";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({ palette: { mode: "light" } });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QuizEngine />
    </ThemeProvider>
  );
}
