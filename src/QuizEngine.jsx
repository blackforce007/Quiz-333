import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Snackbar, LinearProgress } from "@mui/material";

/**
 * Generate 50 smart questions. Here, sample random generator.
 * Replace with API or smarter logic as needed.
 */
function generateQuestions() {
  const topics = ["Math", "Science", "History", "Geography", "Sports"];
  return Array.from({ length: 50 }, (_, i) => {
    const num1 = Math.floor(Math.random() * 50);
    const num2 = Math.floor(Math.random() * 50);
    const correct = num1 + num2;
    let choices = [
      correct,
      correct + Math.floor(Math.random() * 10 + 1),
      correct - Math.floor(Math.random() * 10 + 1),
      correct + Math.floor(Math.random() * 2 + 2),
    ];
    choices = [...new Set(choices)].slice(0, 4).sort(() => Math.random() - 0.5);

    return {
      id: i + 1,
      topic: topics[Math.floor(Math.random() * topics.length)],
      question: `Q${i + 1}: What is ${num1} + ${num2}?`,
      choices,
      answer: correct,
      hint: `It's between ${correct - 3} and ${correct + 3}`,
    };
  });
}

export default function QuizEngine() {
  const [questions] = useState(generateQuestions());
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: "" });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
    setShowHint(false);
  }, [index]);

  const current = questions[index];

  function handleAnswer(choice) {
    setSelected(choice);
    if (choice === current.answer) {
      setScore((s) => s + 1);
      setSnack({ open: true, msg: "✅ Correct!" });
    } else {
      setSnack({ open: true, msg: `❌ Wrong! Correct: ${current.answer}` });
    }
    setTimeout(() => {
      setSnack({ open: false, msg: "" });
      setIndex((idx) => Math.min(idx + 1, questions.length - 1));
    }, 800);
  }

  return (
    <Card sx={{ maxWidth: 480, mx: "auto", mt: 4, p: 3, boxShadow: 5 }}>
      <Typography variant="h5" fontWeight={700}>
        Modern Smart Quiz Engine
      </Typography>
      <LinearProgress
        variant="determinate"
        value={((index + 1) / questions.length) * 100}
        sx={{ my: 2 }}
      />
      <Typography variant="subtitle1" color="text.secondary">
        {current.topic} | Question {index + 1} / {questions.length}
      </Typography>
      <Typography variant="h6" my={2}>
        {current.question}
      </Typography>
      {current.choices.map((ch) => (
        <Button
          key={ch}
          fullWidth
          variant={selected === ch ? "contained" : "outlined"}
          color={selected === ch ? (ch === current.answer ? "success" : "error") : "primary"}
          sx={{ my: 1 }}
          disabled={selected !== null}
          onClick={() => handleAnswer(ch)}
        >
          {ch}
        </Button>
      ))}
      <Button onClick={() => setShowHint((h) => !h)} sx={{ mt: 2 }}>
        {showHint ? "Hide Hint" : "Show Hint"}
      </Button>
      {showHint && (
        <Typography variant="body2" color="info.main" sx={{ mt: 1 }}>
          💡 Hint: {current.hint}
        </Typography>
      )}
      <Typography sx={{ mt: 2 }} color="text.secondary">
        Score: {score}
      </Typography>
      <Snackbar
        open={snack.open}
        autoHideDuration={1000}
        message={snack.msg}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Card>
  );
}
