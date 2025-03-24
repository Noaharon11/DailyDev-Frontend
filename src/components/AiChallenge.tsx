// src/components/AiChallenge.tsx
import React, { useState } from "react";
import { getAiChallenge } from "../services/ai-service";
import "./AiChallenge.css";

const AiChallenge: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [challenge, setChallenge] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetChallenge = async () => {
    if (!topic.trim()) return;
    try {
      setLoading(true);
      const result = await getAiChallenge(topic);
      setChallenge(result);
    } catch (err) {
      console.error("AI Error:", err);
      setChallenge("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-challenge-container">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g., async JavaScript)"
        className="ai-input"
      />
      <button
        onClick={handleGetChallenge}
        className="challenge-btn"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Get Challenge"}
      </button>

      {challenge && (
        <div className="ai-challenge-result">
          <h4>AI Challenge:</h4>
          <pre>{challenge}</pre>
        </div>
      )}
    </div>
  );
};

export default AiChallenge;
