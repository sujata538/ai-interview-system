const scoreColors = {
    range: (s) => s >= 8 ? "var(--accent)" : s >= 5 ? "var(--yellow)" : "var(--red)",
  };
  
  function ScoreRing({ score }) {
    const radius = 44;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 10) * circumference;
    const color = scoreColors.range(score);
  
    return (
      <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
        <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle
            cx="60" cy="60" r={radius} fill="none"
            stroke={color} strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease", filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, color }}>{score}</span>
          <span className="mono" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>/10</span>
        </div>
      </div>
    );
  }
  
  const verdictConfig = {
    Excellent: { color: "var(--accent)", bg: "var(--accent-dim)", border: "rgba(0,255,180,0.2)" },
    Good: { color: "var(--blue)", bg: "rgba(68,136,255,0.1)", border: "rgba(68,136,255,0.2)" },
    Average: { color: "var(--yellow)", bg: "rgba(255,204,0,0.1)", border: "rgba(255,204,0,0.2)" },
    Poor: { color: "var(--red)", bg: "rgba(255,68,102,0.1)", border: "rgba(255,68,102,0.2)" },
  };
  
  export default function FeedbackScreen({ data, onRetry, onRestart }) {
    const { question, answer, feedback, category, difficulty } = data;
    const score = feedback?.score ?? 0;
    const verdict = feedback?.verdict ?? "Average";
    const vc = verdictConfig[verdict] || verdictConfig.Average;
  
    return (
      <div style={{ width: "100%", maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }} className="animate-fadeUp">
        <div style={{ textAlign: "center", paddingBottom: "8px" }}>
          <p className="mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
            Interview Result
          </p>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Your Evaluation</h2>
        </div>
  
        <div className="card" style={{ padding: "28px", display: "flex", gap: "28px", alignItems: "center" }}>
          <ScoreRing score={score} />
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 16px",
                borderRadius: "100px",
                background: vc.bg,
                border: `1px solid ${vc.border}`,
                color: vc.color,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                marginBottom: "12px",
                letterSpacing: "0.02em",
              }}
            >
              {verdict}
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
              {score >= 8 ? "Outstanding performance. You demonstrated strong depth and clarity." :
               score >= 5 ? "Solid answer with room to grow. Focus on the improvements below." :
               "Needs more depth and structure. Review the ideal points carefully."}
            </p>
          </div>
        </div>
  
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div className="card" style={{ padding: "22px" }}>
            <p className="mono" style={{ fontSize: "0.66rem", color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
              ✓ Strengths
            </p>
            <p style={{ color: "var(--text-primary)", fontSize: "0.9rem", lineHeight: 1.65 }}>{feedback?.strengths}</p>
          </div>
          <div className="card" style={{ padding: "22px" }}>
            <p className="mono" style={{ fontSize: "0.66rem", color: "var(--yellow)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
              ⚡ Improve
            </p>
            <p style={{ color: "var(--text-primary)", fontSize: "0.9rem", lineHeight: 1.65 }}>{feedback?.improvements}</p>
          </div>
        </div>
  
        <div className="card" style={{ padding: "22px" }}>
          <p className="mono" style={{ fontSize: "0.66rem", color: "var(--blue)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
            ◈ Ideal Answer Should Cover
          </p>
          <p style={{ color: "var(--text-primary)", fontSize: "0.9rem", lineHeight: 1.7 }}>{feedback?.ideal_points}</p>
        </div>
  
        <div className="card" style={{ padding: "20px" }}>
          <p className="mono" style={{ fontSize: "0.66rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
            Question
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6, fontStyle: "italic" }}>"{question}"</p>
        </div>
  
        <div style={{ display: "flex", gap: "12px", paddingTop: "4px" }}>
          <button className="btn-secondary" onClick={onRestart} style={{ flex: 1 }}>← Change Settings</button>
          <button className="btn-primary" onClick={onRetry} style={{ flex: 2 }}>Next Question →</button>
        </div>
      </div>
    );
  }