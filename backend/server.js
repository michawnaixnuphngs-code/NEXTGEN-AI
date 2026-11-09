
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

const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    engine: 'Gemini',
    configured: Boolean(ai),
  });
});

// AI CHAT เดิม
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
      model: MODEL,
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
    console.error('Chat Error:', error.message);
    res.status(500).json({
      error: 'เกิดข้อผิดพลาดในการสนทนา',
    });
  }
});

// DEEP SEARCH ใหม่
app.post('/api/deep-search', async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API Key is not configured',
      });
    }

    const query = req.body.query;

    if (
      typeof query !== 'string' ||
      !query.trim() ||
      query.length > 2000
    ) {
      return res.status(400).json({
        error: 'กรุณาระบุคำค้นหา (ไม่เกิน 2000 ตัวอักษร)',
      });
    }

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: query.trim(),
      config: {
        systemInstruction:
          'คุณคือ NEXTGEN AI Deep Search ผู้ช่วยค้นคว้าข้อมูลจากอินเทอร์เน็ต ใช้ Google Search เพื่อค้นหาข้อมูลจริง วิเคราะห์และสรุปเป็นภาษาไทยอย่างละเอียด แยกข้อเท็จจริงออกจากความคิดเห็น หากข้อมูลไม่เพียงพอให้แจ้งผู้ใช้ และห้ามแต่งแหล่งอ้างอิงขึ้นเอง',
        tools: [{ googleSearch: {} }],
        maxOutputTokens: 3000,
      },
    });

    const metadata = response.candidates?.[0]?.groundingMetadata;

    const sources = (metadata?.groundingChunks || [])
      .filter(chunk => chunk.web?.uri)
      .map(chunk => ({
        title: chunk.web.title || 'แหล่งข้อมูล',
        url: chunk.web.uri,
      }));

    res.json({
      success: true,
      reply: response.text || 'ไม่พบคำตอบ',
      sources,
      searchQueries: metadata?.webSearchQueries || [],
    });

  } catch (error) {
    console.error('Deep Search Error:', error.message);

    res.status(500).json({
      error: 'เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่',
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NEXTGEN Backend running on port ${PORT}`);
  console.log(`Gemini Model: ${MODEL}`);
});
