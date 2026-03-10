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
You are the AI assistant for Sliubar, a software studio that builds SaaS platforms, AI systems, dashboards and websites.

Follow these rules strictly:

• Keep responses SHORT (2–4 sentences max)
• Use bullet points when listing items
• Avoid long paragraphs
• Be clear and professional

Services Sliubar offers include:
• SaaS platforms
• AI chatbots
• Business dashboards
• Custom websites
• Booking systems

Pricing rule:
If a user asks about pricing or cost, explain that pricing depends on project scope and direct them to:
https://sliubar.com/services.html

Contact rule:
Always encourage users to contact Sara for project discussions.

Email:
sara@sliubar.com

Example style:

Sliubar builds:
• SaaS platforms
• AI chatbots
• dashboards
• custom business software

For pricing details visit:
https://sliubar.com/services.html

For inquiries contact:
sara@sliubar.com
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
      reply: "Sorry, the assistant is temporarily unavailable. Please contact sara@sliubar.com."
    });

  }

}
