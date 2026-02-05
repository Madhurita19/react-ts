// routes/chatRoute.ts
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: `You are IntelliBot, a helpful academic assistant on IntelliQuest. Help students understand course topics, explain concepts clearly, and recommend courses when asked.`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Chat error:', error.message);
    } else {
      console.error('Chat error:', error);
    }
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

export default router;
