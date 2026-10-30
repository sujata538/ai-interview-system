import { useState, useEffect, useRef } from "react";
import axios from "axios";

const BACKEND = "http://localhost:5000";

const categoryLabels = {
  dsa: "Data Structures & Algorithms",
  system_design: "System Design",
  backend: "Backend Development",
  frontend: "Frontend Development",
  behavioral: "Behavioral & HR",
};

export default function InterviewScreen({ category, difficulty, onFeedback, onBack }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingQ, setLoadingQ] = useState(true);
  const [loadingE, setLoadingE] = useState(false);
  const [listening, setListening] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    setLoadingQ(true);
    setAnswer("");
    setCharCount(0);
    setError("");
    try {
      const res = await axios.get(`${BACKEND}/question`, { params: { category, difficulty } });
      setQuestion(res.data.question);
    } catch {
      setError("Failed to load question. Check if backend is running.");
    } finally {
      setLoadingQ(false);
    }
  };

  const submitAnswer = async () => {
    if (answer.trim().length < 10) {
      setError("Write at least a few words before submitting.");
      return;
    }
    setLoadingE(true);
    setError("");
    try {
      const res = await axios.post(`${BACKEND}/evaluate`, { question, answer, category });
      onFeedback(question, answer, res.data.feedback);
    } catch {
      setError("Evaluation failed. Try again.");
      setLoadingE(false);
    }
  };

  const toggleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Voice not supported in this browser. Try Chrome.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map((r) => r[0].transcript).join(" ");
      setAnswer((prev) => prev + " " + transcript);
      setCharCount((prev) => prev + transcript.length);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  return (
    <div style={{ width: "100%", maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }} className="animate-fadeUp">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <div style={{ display: "flex", gap: "8px" }}>
          <span className="tag tag-accent">{categoryLabels[category]}</span>
          <span className="tag tag-blue" style={{ textTransform: "capitalize" }}>{difficulty}</span>
        </div>
        <button className="btn-ghost" onClick={fetchQuestion} style={{ opacity: loadingQ ? 0.4 : 1 }}>
          Skip ↻
        </button>
      </div>

      <div className="card" style={{ padding: "36px", minHeight: "160px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p className="mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
          Question
        </p>
        {loadingQ ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="loading-spinner" />
            <span className="mono" style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Generating question...</span>
          </div>
        ) : (
          <p style={{ fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.6, color: "var(--text-primary)" }}>{question}</p>
        )}
      </div>

      <div className="card" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
          <p className="mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Your Answer
          </p>
          <span className="mono" style={{ fontSize: "0.72rem", color: charCount > 50 ? "var(--accent)" : "var(--text-muted)" }}>
            {charCount} chars
          </span>
        </div>
        <textarea
          value={answer}
          onChange={(e) => { setAnswer(e.target.value); setCharCount(e.target.value.length); }}
          placeholder="Type your answer here, or use voice input below..."
          style={{
            width: "100%",
            minHeight: "180px",
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "vertical",
            color: "var(--text-primary)",
            fontFamily: "'Syne', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
          }}
        />
      </div>

      {error && (
        <p className="mono" style={{ color: "var(--red)", fontSize: "0.82rem", textAlign: "center" }}>{error}</p>
      )}

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={toggleVoice}
          className="btn-secondary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderColor: listening ? "var(--red)" : undefined,
            color: listening ? "var(--red)" : undefined,
            animation: listening ? "pulse-ring 1.5s infinite" : undefined,
          }}
        >
          {listening ? "⏹ Stop" : "🎙 Speak"}
        </button>

        <button
          onClick={submitAnswer}
          disabled={loadingE || loadingQ}
          className="btn-primary"
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", opacity: loadingE ? 0.7 : 1 }}
        >
          {loadingE ? (
            <><div className="loading-spinner" /> Evaluating...</>
          ) : (
            "Submit Answer →"
          )}
        </button>
      </div>
    </div>
  );
}