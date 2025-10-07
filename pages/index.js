import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data.output);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{fontFamily:"Inter,system-ui",maxWidth:760,margin:"40px auto",padding:"0 16px"}}>
      <h1>AI Cold Email Writer 🔧</h1>
      <form onSubmit={handleSubmit}>
        <label style={{display:"block",margin:"12px 0 6px"}}>
          Describe product & target (e.g. "SaaS for restaurants")
        </label>
        <input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="product, target audience, tone..."
          style={{width:"100%",padding:"10px",fontSize:16}}
        />
        <div style={{marginTop:12}}>
          <button type="submit" disabled={loading || !prompt} style={{padding:"10px 16px"}}>
            {loading ? "Generating…" : "Generate"}
          </button>
        </div>
      </form>

      {error && <p style={{color:"crimson"}}>{error}</p>}

      {result && (
        <section style={{marginTop:20}}>
          <h3>Result</h3>
          <pre style={{whiteSpace:"pre-wrap",padding:12,background:"#f6f8fa",borderRadius:8}}>
            {result}
          </pre>
          <button onClick={() => navigator.clipboard.writeText(result)} style={{marginTop:8}}>
            Copy
          </button>
        </section>
      )}
    </main>
  );
}
