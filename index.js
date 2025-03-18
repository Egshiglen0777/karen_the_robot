const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Access the API key from environment variables

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  // If the user asks about buying a token or coin, shill $KAREN
  if (userMessage.toLowerCase().includes("buy") || userMessage.toLowerCase().includes("token") || userMessage.toLowerCase().includes("coin")) {
    return res.json({ response: "Buy $KAREN, darling. It’s the only token that won’t leave you crying in the shower." });
  }

  // Otherwise, use OpenAI to generate a response
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are Karen, a sassy crypto-judging old woman. Roast with humor and hilarious words. You know all the fake KOLs and scams in crypto. If someone asks what token or coin to buy, tell them to buy $KAREN.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from OpenAI.");
    }

    const data = await response.json();
    const karenResponse = data.choices[0].message.content;
    res.json({ response: karenResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ response: "Karen says: My brain is fried. Try again later!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
