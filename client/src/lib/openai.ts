import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const GPT_MODEL = "gpt-4o";

if (!process.env.OPENAI_API_KEY) {
  console.warn("OpenAI API key is not set. Set OPENAI_API_KEY in .env file or environment variables.");
}

// Initialize OpenAI client
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || 'sk-'  // Fallback to an invalid key if none is provided
});

/**
 * Generate content based on a prompt
 * @param prompt User prompt
 * @param contentType Type of content to generate
 * @param tone Tone of the generated content
 * @returns HTML and code snippets
 */
export async function generateContent(
  prompt: string,
  contentType: string = "Website Section",
  tone: string = "Professional"
): Promise<{ html: string; code: string }> {
  try {
    const systemPrompt = `You are an expert web designer and developer. Create ${contentType} with a ${tone} tone. 
      Respond with ONLY JSON in the following format:
      {
        "html": "The rendered HTML preview",
        "code": "The full HTML code snippet"
      }`;

    const response = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return {
      html: result.html,
      code: result.code
    };
  } catch (error) {
    console.error("Error generating content with OpenAI:", error);
    throw new Error("Failed to generate content. Please try again later.");
  }
}

/**
 * Translate text to a target language
 * @param text Text to translate
 * @param targetLanguage Target language code
 * @returns Translated text
 */
export async function translateText(
  text: string,
  targetLanguage: string
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate the following text to ${targetLanguage}. Maintain the tone and style of the original text. Respond with ONLY the translated text, no additional comments.`
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error translating text with OpenAI:", error);
    throw new Error("Failed to translate text. Please try again later.");
  }
}

/**
 * Generate an SEO description based on content
 * @param content Content to generate SEO description for
 * @param language Language code
 * @returns SEO description
 */
export async function generateSEODescription(
  content: string,
  language: string = "en"
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an SEO expert. Create a compelling meta description (maximum 160 characters) in ${language} for the following content. Make it engaging and include relevant keywords. Respond with ONLY the meta description.`
        },
        {
          role: "user",
          content
        }
      ],
      max_tokens: 100
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating SEO description with OpenAI:", error);
    throw new Error("Failed to generate SEO description. Please try again later.");
  }
}

export default {
  generateContent,
  translateText,
  generateSEODescription
};
