import { OpenAI } from 'openai';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const brandingSchema = z.object({
  brandName: z.string().min(2).max(50),
  industry: z.string().min(2).max(50),
  targetAudience: z.string().min(2).max(100),
  brandValues: z.string().min(2).max(200),
  colorPreferences: z.string().optional(),
  stylePreferences: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = brandingSchema.parse(body);

    // Generate logo prompt
    const logoPrompt = `Create a modern, professional logo for ${data.brandName}, a ${data.industry} company. 
    The logo should appeal to ${data.targetAudience} and reflect the brand values: ${data.brandValues}.
    ${data.colorPreferences ? `Use these colors: ${data.colorPreferences}.` : ''}
    ${data.stylePreferences ? `Style: ${data.stylePreferences}.` : ''}
    The logo should be simple, memorable, and work well at different sizes.`;

    // Generate color palette prompt
    const colorPrompt = `Generate a color palette for ${data.brandName}, a ${data.industry} company.
    The colors should appeal to ${data.targetAudience} and reflect: ${data.brandValues}.
    ${data.colorPreferences ? `Consider these preferences: ${data.colorPreferences}.` : ''}
    Provide 5 colors in hex format.`;

    // Generate typography prompt
    const typographyPrompt = `Suggest typography for ${data.brandName}, a ${data.industry} company.
    The fonts should appeal to ${data.targetAudience} and reflect: ${data.brandValues}.
    ${data.stylePreferences ? `Style: ${data.stylePreferences}.` : ''}
    Recommend a primary and secondary font combination.`;

    // Generate brand identity prompt
    const identityPrompt = `Create a brand identity statement for ${data.brandName}, a ${data.industry} company.
    Target audience: ${data.targetAudience}
    Brand values: ${data.brandValues}
    ${data.stylePreferences ? `Style: ${data.stylePreferences}.` : ''}
    The statement should be concise and memorable.`;

    // Call OpenAI API for each aspect
    const [logoResponse, colorResponse, typographyResponse, identityResponse] = await Promise.all([
      openai.images.generate({
        model: "dall-e-3",
        prompt: logoPrompt,
        n: 1,
        size: "1024x1024",
      }),
      openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: colorPrompt }],
      }),
      openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: typographyPrompt }],
      }),
      openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: identityPrompt }],
      }),
    ]);

    // Process responses
    const logo = logoResponse.data[0].url;
    const colors = colorResponse.choices[0].message.content
      ?.match(/#[0-9A-Fa-f]{6}/g) || [];
    const typography = typographyResponse.choices[0].message.content || '';
    const identity = identityResponse.choices[0].message.content || '';

    return new Response(JSON.stringify({
      logo,
      colors,
      typography,
      identity,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating branding:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate branding' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 