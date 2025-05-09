import { Request, Response } from 'express';
import OpenAI from 'openai';

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define BrandBrief interface
interface BrandBrief {
  name: string;
  industry: string;
  goal: string;
  description: string;
  targetAudience: string;
  style: string;
  colorPreference?: string;
}

// Define BrandingResult interface
interface BrandingResult {
  logo?: string;
  colorPalette?: string[];
  typography?: {
    primary: string;
    secondary: string;
  };
  illustrationStyle?: string;
  websiteTemplate?: string;
}

/**
 * Generate a brand identity based on the provided brief
 * @param req Express request
 * @param res Express response
 */
export const generateBranding = async (req: Request, res: Response) => {
  try {
    const brandBrief: BrandBrief = req.body;

    // Validate the request
    if (!brandBrief.name || !brandBrief.industry || !brandBrief.goal || 
        !brandBrief.description || !brandBrief.targetAudience || !brandBrief.style) {
      return res.status(400).json({ 
        error: 'Missing required fields in brand brief' 
      });
    }

    // Create prompt for OpenAI
    const prompt = `Generate a complete brand identity for a company with the following details:
      
Name: ${brandBrief.name}
Industry: ${brandBrief.industry}
Purpose/Goal: ${brandBrief.goal}
Description: ${brandBrief.description}
Target Audience: ${brandBrief.targetAudience}
Preferred Brand Style: ${brandBrief.style}
${brandBrief.colorPreference ? `Color Preferences: ${brandBrief.colorPreference}` : ''}

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

    // Generate brand identity using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: "You are a professional brand identity designer and expert in creating cohesive brand packages. Respond only with JSON data in the requested format." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    });

    // Parse the response
    const responseContent = completion.choices[0].message.content;
    const brandingData = JSON.parse(responseContent || '{}');

    // Generate a simple SVG logo as a placeholder
    // In a production app, you would use a more sophisticated logo generation approach
    const logoSvg = generateLogoSVG(brandBrief.name, brandingData.colorPalette[0], brandingData.colorPalette[1]);
    
    // Compile the full result
    const result: BrandingResult = {
      logo: `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`,
      ...brandingData
    };

    res.json(result);
  } catch (error: any) {
    console.error('Error generating branding:', error);
    res.status(500).json({ 
      error: 'Failed to generate branding', 
      details: error.message 
    });
  }
};

/**
 * Generate a simple SVG logo based on the brand name and colors
 */
function generateLogoSVG(name: string, primaryColor: string, secondaryColor: string): string {
  // Get first letter or first two letters of the brand name
  const initials = name.slice(0, name.includes(' ') ? 2 : 1).toUpperCase();
  
  // Create a simple SVG logo with the initials
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="${secondaryColor}" rx="20" ry="20"/>
    <circle cx="100" cy="100" r="80" fill="${primaryColor}"/>
    <text x="100" y="125" font-family="Arial, sans-serif" font-size="60" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
  </svg>`;
}