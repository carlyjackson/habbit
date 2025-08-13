import { Request, Response } from 'express';
import OpenAI from 'openai';
import { createHabbit } from '../models/habbitModel';

type ChatCompletionMessageParam = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemMessage: ChatCompletionMessageParam = {
  role: 'system',
  content: process.env.SYSTEM_PROMPT || '',
};

const conversations: Record<string, ChatCompletionMessageParam[]> = {};


const chatController = {
  sendMessage: async (req: Request, res: Response) => {
    try {
      const { sessionId, message } = req.body;

      if (!sessionId) {
        return res.status(400).json({ error: 'No sessionId provided' });
      }
      if (!message) {
        return res.status(400).json({ error: 'No message provided' });
      }

      if (!conversations[sessionId]) {
        conversations[sessionId] = [systemMessage];
      }

      conversations[sessionId].push({ role: 'user', content: message });

      const completion = await openai.chat.completions.create({
        model: 'gpt-5-nano',
        messages: conversations[sessionId], 
      });

      const assistantReply = completion.choices[0].message?.content || '';

      try {
        const parsed = JSON.parse(assistantReply);
        if (parsed && typeof parsed === 'object' && parsed.action) {
          const created = await createHabbit(parsed); // save to database
          return res.status(200).json({
            redirectToHabbitsList: true, // signal frontend to redirect
          });
        }
      } catch {
        // Not JSON — just return normal message
        conversations[sessionId].push({
          role: 'assistant',
          content: assistantReply,
        });

        return res.status(200).json({ reply: assistantReply });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default chatController;
