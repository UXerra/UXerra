import { Request, Response } from 'express';
import OpenAI from 'openai';
import { storage } from '../storage';
import { insertGeneratedContentSchema } from '@shared/schema';

// Initialize OpenAI
const openaiApiKey = process.env.OPENAI_API_KEY || '';
// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const GPT_MODEL = "gpt-4o";

const openai = new OpenAI({
  apiKey: openaiApiKey
});

/**
 * Generate content using OpenAI API
 * @param req Express request
 * @param res Express response
 */
export const generateContent = async (req: Request, res: Response) => {
  try {
    const { prompt, contentType, tone, userId } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }
    
    // Set default content type and tone if not provided
    const type = contentType || 'Website Section';
    const contentTone = tone || 'Professional';
    
    const systemPrompt = `You are an expert web designer and developer. Create ${type} with a ${contentTone} tone. 
      Respond with ONLY JSON in the following format:
      {
        "html": "The rendered HTML preview",
        "code": "The full HTML code snippet"
      }`;
    
    // Generate content with OpenAI
    const response = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    });
    
    const result = JSON.parse(response.choices[0].message.content);
    
    // Save generated content to database if user is logged in
    if (userId) {
      const validatedData = insertGeneratedContentSchema.parse({
        userId,
        prompt,
        contentType: type,
        tone: contentTone,
        html: result.html,
        code: result.code
      });
      
      await storage.createGeneratedContent(validatedData);
    }
    
    res.json({
      html: result.html,
      code: result.code
    });
  } catch (error: any) {
    console.error('Error generating content:', error);
    res.status(500).json({ 
      message: 'Failed to generate content',
      error: error.message 
    });
  }
};

export default generateContent;
