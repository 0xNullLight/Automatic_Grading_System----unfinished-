require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Setup server
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000' // Adjust this for your frontend
}));

// endpoint for ChatGPT
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
      temperature: 0,
    });
    res.send(completion.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || "Error generating response");
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
