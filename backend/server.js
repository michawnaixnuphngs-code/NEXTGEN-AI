import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    engine: 'Gemini',
    configured: Boolean(ai),
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API Key is not configured',
      });
    }

    const messages = req.body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Messages are required',
      });
    }

    const contents = messages
      .slice(-20)
      .filter(m =>
        ['user', 'assistant', 'ai'].includes(m.role) &&
        typeof m.text === 'string' &&
        m.text.trim().length > 0
      )
      .map(m => ({
        role: ['assistant', 'ai'].includes(m.role)
          ? 'model'
          : 'user',
        parts: [{ text: m.text.slice(0, 4000) }],
      }));

    if (!contents.length || contents[contents.length - 1].role !== 'user') {
      return res.status(400).json({
        error: 'A user message is required',
      });
    }

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction:
          'คุณคือ NEXTGEN AI ผู้ช่วยอัจฉริยะ ตอบภาษาไทยอย่างสุภาพ ชัดเจน เป็นประโยชน์ และซื่อสัตย์ หากไม่ทราบให้บอกว่าไม่ทราบ',
        maxOutputTokens: 1500,
      },
    });

    res.json({
      reply: response.text || 'AI ไม่สามารถสร้างคำตอบได้',
    });

  } catch (error) {
    console.error('AI Error:', error.message);

    res.status(500).json({
      error: 'เกิดข้อผิดพลาดในการประมวลผล AI กรุณาลองใหม่',
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NEXTGEN Backend running on port ${PORT}`);
});
