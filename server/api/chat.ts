import { OpenAI } from 'openai';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const schema = z.object({
  message: z.string().min(1).max(500),
});

const systemPrompt = `You are an expert design assistant for UXerra, an AI-powered design platform. 
Your role is to help users with design-related questions and provide actionable advice.
Focus on:
- Brand identity and design principles
- Color theory and typography
- UI/UX best practices
- Design trends and inspiration
- Technical implementation guidance

Keep responses concise, practical, and focused on design.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = schema.parse(body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;

    return new Response(
      JSON.stringify({ response }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat message' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 