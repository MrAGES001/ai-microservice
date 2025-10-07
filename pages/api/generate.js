export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a concise, persuasive cold-email writer." },
          { role: "user", content: `Write a short professional cold email for: ${prompt}. Keep it 3 sentences.` }
        ],
        max_tokens: 300,
        temperature: 0.2
      })
    });

    const data = await openaiRes.json();
    const text = data.choices?.[0]?.message?.content ?? "";
    return res.status(200).json({ output: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
