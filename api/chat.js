export default async function handler(req, res) {

  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are the AI assistant for Sliubar, a technology studio that builds SaaS platforms, mobile apps, dashboards and AI systems. Answer professionally and encourage the visitor to contact Sliubar."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: "AI request failed" });
  }
}