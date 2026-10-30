import { useState } from "react";
import LandingScreen from "./components/LandingScreen";
import InterviewScreen from "./components/InterviewScreen";
import FeedbackScreen from "./components/FeedbackScreen";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [sessionData, setSessionData] = useState({
    category: "backend",
    difficulty: "medium",
    question: "",
    answer: "",
    feedback: null,
  });

  const startInterview = (category, difficulty) => {
    setSessionData((prev) => ({ ...prev, category, difficulty }));
    setScreen("interview");
  };

  const showFeedback = (question, answer, feedback) => {
    setSessionData((prev) => ({ ...prev, question, answer, feedback }));
    setScreen("feedback");
  };

  const restart = () => {
    setSessionData({ category: "backend", difficulty: "medium", question: "", answer: "", feedback: null });
    setScreen("landing");
  };

  return (
    <div className="app-wrapper">
      <div className="noise-overlay" />
      {screen === "landing" && <LandingScreen onStart={startInterview} />}
      {screen === "interview" && (
        <InterviewScreen
          category={sessionData.category}
          difficulty={sessionData.difficulty}
          onFeedback={showFeedback}
          onBack={() => setScreen("landing")}
        />
      )}
      {screen === "feedback" && (
        <FeedbackScreen
          data={sessionData}
          onRetry={() => setScreen("interview")}
          onRestart={restart}
        />
      )}
    </div>
  );
}