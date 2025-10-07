// pages/index.js
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 600, margin: "50px auto", textAlign: "center" }}>
      <h1>🤖 AI Microservice</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          style={{ width: "100%", padding: "10px" }}
          placeholder="Type your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <br />
        <button type="submit" disabled={loading || !prompt}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0", borderRadius: "8px" }}>
          <strong>AI says:</strong>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
