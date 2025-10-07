// pages/api/generate.js

import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Missing 'prompt' in request body" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
    });

    const message = response.choices[0].message.content;
    res.status(200).json({ message });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
