import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Handle AI prompt
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setResponse(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 💳 Stripe Payment Handler
  const handlePayment = async () => {
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        alert("Payment service temporarily unavailable.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-gray-100">
        <div className="w-full max-w-xl p-8 bg-white shadow-2xl rounded-2xl mt-8 border border-gray-100">
          <h1 className="text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            AGES AI
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Your personal AI-powered microservice assistant.
          </p>

          {/* AI Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Ask AGES AI anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading || !prompt}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg disabled:opacity-50 transition"
            >
              {loading ? "Thinking..." : "Ask AGES AI"}
            </button>
          </form>

          {/* AI Response Display */}
          {error && (
            <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
          )}

          {response && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
              <h2 className="font-semibold text-gray-700 mb-2">AGES AI says:</h2>
              <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
            </div>
          )}

          {/* 💳 Stripe Payment Section */}
          <div className="mt-8 text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Support AGES AI 💙
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Get premium access and help keep this AI running.
            </p>

            <button
              onClick={handlePayment}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg transition"
            >
              Subscribe – $5/month
            </button>
          </div>
        </div>
      </main>

      {/* ✅ Footer Section */}
      <footer className="text-center py-6 bg-white border-t mt-12">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} AGES AI — Powered by OpenAI |
          Designed by <span className="font-semibold text-blue-600">Elite Brothers Hub</span>
        </p>
      </footer>
    </>
  );
}
