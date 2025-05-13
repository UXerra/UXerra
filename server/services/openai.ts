import OpenAI from 'openai';
import { config } from '../config.js';
import { AppError } from '../utils/error.js';
import type {
  GenerateContentInput,
  GenerateBrandingInput,
} from '../schemas/openai.js';

class OpenAIService {
  private readonly client: OpenAI;
  private readonly defaultModel = 'gpt-4-turbo-preview';

  constructor() {
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
    });
  }

  async generateContent({
    prompt,
    contentType,
    tone,
    maxTokens = 2000,
    temperature = 0.7,
  }: GenerateContentInput) {
    try {
      const systemPrompt = `You are an expert web designer and developer. Create ${contentType} with a ${tone} tone. 
        Respond with ONLY JSON in the following format:
        {
          "html": "The rendered HTML preview",
          "code": "The full HTML code snippet"
        }`;

      const response = await this.client.chat.completions.create({
        model: this.defaultModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
        max_tokens: maxTokens,
        temperature,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No content generated');
      }

      return JSON.parse(content);
    } catch (error) {
      console.error('Failed to generate content:', error);
      throw new AppError(500, 'Failed to generate content');
    }
  }

  async generateBranding({
    name,
    industry,
    goal,
    description,
    targetAudience,
    style,
    colorPreference,
  }: GenerateBrandingInput) {
    try {
      const prompt = `Generate a complete brand identity for a company with the following details:
        
Name: ${name}
Industry: ${industry}
Purpose/Goal: ${goal}
Description: ${description}
Target Audience: ${targetAudience}
Preferred Brand Style: ${style}
${colorPreference ? `Color Preferences: ${colorPreference}` : ''}

Please create a comprehensive brand identity package including:
1. A color palette with 5 colors in HEX format (primary, secondary, accent, and neutral colors)
2. Typography recommendations (primary and secondary fonts that work well together)
3. A description of the illustration style that would work well for this brand
4. A description of an appropriate website template/layout for this brand

Respond ONLY in JSON format with the following structure:
{
  "colorPalette": ["#HEX1", "#HEX2", "#HEX3", "#HEX4", "#HEX5"],
  "typography": {
    "primary": "Font Name",
    "secondary": "Font Name"
  },
  "illustrationStyle": "Detailed description of illustration style",
  "websiteTemplate": "Detailed description of website template/layout"
}`;

      const response = await this.client.chat.completions.create({
        model: this.defaultModel,
        messages: [
          {
            role: 'system',
            content: 'You are a professional brand identity designer and expert in creating cohesive brand packages. Respond only with JSON data in the requested format.',
          },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No content generated');
      }

      return JSON.parse(content);
    } catch (error) {
      console.error('Failed to generate branding:', error);
      throw new AppError(500, 'Failed to generate branding');
    }
  }
}

export const openaiService = new OpenAIService(); 