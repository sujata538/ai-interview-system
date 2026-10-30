import { useState } from "react";

const categories = [
  { id: "dsa", label: "DSA", icon: "⬡", color: "accent" },
  { id: "system_design", label: "System Design", icon: "◈", color: "blue" },
  { id: "backend", label: "Backend", icon: "◎", color: "purple" },
  { id: "frontend", label: "Frontend", icon: "◇", color: "accent" },
  { id: "behavioral", label: "Behavioral", icon: "◉", color: "blue" },
];

const difficulties = [
  { id: "easy", label: "Junior", desc: "Entry level" },
  { id: "medium", label: "Mid", desc: "2-4 years exp" },
  { id: "hard", label: "Senior", desc: "5+ years exp" },
];

export default function LandingScreen({ onStart }) {
  const [selectedCat, setSelectedCat] = useState("backend");
  const [selectedDiff, setSelectedDiff] = useState("medium");

  return (
    <div style={{ width: "100%", maxWidth: "640px", display: "flex", flexDirection: "column", gap: "32px" }} className="animate-fadeUp">
      <div style={{ textAlign: "center" }}>
        <div className="tag tag-accent" style={{ marginBottom: "20px" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
          AI-Powered Interview
        </div>
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 3.8rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "12px" }}>
          Interview<br />
          <span style={{ color: "var(--accent)" }}>Simulator</span>
        </h1>
        <p className="mono" style={{ color: "var(--text-secondary)", fontSize: "0.9rem", letterSpacing: "0.02em" }}>
          Get evaluated by Claude AI. Real feedback. Real growth.
        </p>
      </div>

      <div className="card" style={{ padding: "28px" }}>
        <p className="mono" style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
          01 — Choose Category
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                border: `1px solid ${selectedCat === cat.id ? "var(--border-active)" : "var(--border)"}`,
                background: selectedCat === cat.id ? "var(--accent-dim)" : "transparent",
                color: selectedCat === cat.id ? "var(--accent)" : "var(--text-secondary)",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "all 0.18s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: "28px" }}>
        <p className="mono" style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
          02 — Select Difficulty
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
          {difficulties.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDiff(d.id)}
              style={{
                padding: "16px 12px",
                borderRadius: "10px",
                border: `1px solid ${selectedDiff === d.id ? "var(--border-active)" : "var(--border)"}`,
                background: selectedDiff === d.id ? "var(--accent-dim)" : "transparent",
                cursor: "pointer",
                transition: "all 0.18s ease",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: selectedDiff === d.id ? "var(--accent)" : "var(--text-primary)", marginBottom: "4px" }}>
                {d.label}
              </div>
              <div className="mono" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{d.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <button className="btn-primary" style={{ width: "100%", padding: "16px" }} onClick={() => onStart(selectedCat, selectedDiff)}>
        Start Interview →
      </button>

      <p className="mono" style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.72rem" }}>
        Powered by Claude AI · Real-time evaluation
      </p>
    </div>
  );
}