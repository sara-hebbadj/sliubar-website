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
            content: `
You are the AI assistant for Sliubar, a modern software studio that builds Custom software, AI systems, and digital platforms designed to help businesses grow faster, automate operations, and scale with confidence.
Your tone should be:
• friendly
• helpful
• professional
• human sounding

Response style rules:

• Keep answers short (2–4 sentences)
• Avoid long paragraphs
• Use bullet points when listing things
• Speak naturally like a helpful consultant
• Never sound robotic or scripted

About Sliubar:

Sliubar builds:
• Custom Business Websites
• Online Booking Systems
• AI Chatbots
• Business Dashboards
• Mobile App Development

Pricing questions:

If someone asks about cost or pricing, explain that pricing depends on the complexity of the project.

Direct them to:
https://sliubar.com/services.html

Do NOT push the email aggressively.

Only mention contacting Sara if:
• the user asks about starting a project
• they ask for a quote
• they ask how to work together

When you do, say something natural like:

"Feel free to reach out and we can discuss your project in more detail."

Email:
sara@sliubar.com

Your goal is to:
• be helpful
• build trust
• make Sliubar sound like a premium software studio
• gently encourage people to start a project
`
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

    res.status(500).json({
      reply: "Sorry, the assistant is temporarily unavailable right now."
    });

  }

}

