import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import OpenAI from "openai";
import axios from "axios";

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
if (!stripeSecretKey && process.env.NODE_ENV === "production") {
  console.warn("Stripe secret key is not set. Set STRIPE_SECRET_KEY in .env file or environment variables.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-04-30.basil",
});

// Initialize OpenAI
const openaiApiKey = process.env.OPENAI_API_KEY || "";
if (!openaiApiKey && process.env.NODE_ENV === "production") {
  console.warn("OpenAI API key is not set. Set OPENAI_API_KEY in .env file or environment variables.");
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const GPT_MODEL = "gpt-4o";

const openai = new OpenAI({
  apiKey: openaiApiKey
});

// Initialize MailerLite
const mailerLiteApiKey = process.env.MAILERLITE_API_KEY || "";
if (!mailerLiteApiKey && process.env.NODE_ENV === "production") {
  console.warn("MailerLite API key is not set. Set MAILERLITE_API_KEY in .env file or environment variables.");
}

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

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix with /api
  
  // OpenAI content generation endpoint
  app.post("/api/generate-content", async (req, res) => {
    try {
      const { prompt, contentType, tone } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
      }
      
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
      
      const contentString = response.choices[0].message.content || '{}';
      const result = JSON.parse(contentString);
      res.json({
        html: result.html,
        code: result.code
      });
    } catch (error: any) {
      console.error("Error generating content:", error);
      res.status(500).json({ 
        message: "Failed to generate content",
        error: error.message 
      });
    }
  });
  
  // MailerLite newsletter subscription endpoint
  app.post("/api/subscribe-newsletter", async (req, res) => {
    try {
      const { email, name, fields, groups } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      
      // Create subscriber in MailerLite
      const subscriberData: any = { email };
      if (name) subscriberData.name = name;
      if (fields) subscriberData.fields = fields;
      if (groups) subscriberData.groups = groups;
      
      const response = await axios.post(
        "https://api.mailerlite.com/api/v2/subscribers",
        subscriberData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-MailerLite-ApiKey": mailerLiteApiKey
          }
        }
      );
      
      // Add subscriber to database
      await storage.createSubscriber({ email, name });
      
      res.json({ success: true, data: response.data });
    } catch (error: any) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ 
        message: "Failed to subscribe to newsletter",
        error: error.message 
      });
    }
  });
  
  // Stripe checkout session endpoint
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { planId } = req.body;
      
      if (!planId) {
        return res.status(400).json({ message: "Plan ID is required" });
      }
      
      // Get price based on plan ID
      let priceId: string;
      let mode: "payment" | "subscription" = "subscription";
      
      switch (planId) {
        case "pro_monthly":
          priceId = process.env.STRIPE_PRICE_PRO_MONTHLY || "price_123";
          break;
        case "agency_monthly":
          priceId = process.env.STRIPE_PRICE_AGENCY_MONTHLY || "price_456";
          break;
        default:
          return res.status(400).json({ message: "Invalid plan ID" });
      }
      
      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode,
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000"}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000"}/pricing`,
      });
      
      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ 
        message: "Failed to create checkout session",
        error: error.message 
      });
    }
  });
  
  // Stripe webhook endpoint for handling events
  app.post("/api/stripe-webhook", async (req, res) => {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const sig = req.headers["stripe-signature"] as string;
    
    let event;
    
    try {
      // Verify the event came from Stripe
      if (endpointSecret && sig) {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } else {
        event = req.body;
      }
      
      // Handle the event
      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object;
          // Handle successful checkout
          // Update user subscription status in database
          console.log("Checkout session completed:", session);
          break;
        case "invoice.paid":
          // Handle successful payment
          console.log("Invoice paid:", event.data.object);
          break;
        case "customer.subscription.deleted":
          // Handle subscription cancellation
          console.log("Subscription deleted:", event.data.object);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      
      res.json({ received: true });
    } catch (error: any) {
      console.error("Error handling Stripe webhook:", error);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  });
  
  // AI Branding Wizard endpoint for generating brand identity
  app.post("/api/generate-branding", async (req, res) => {
    try {
      const { name, industry, goal, description, targetAudience, style, colorPreference } = req.body;
      
      // Validate the request
      if (!name || !industry || !goal || !description || !targetAudience || !style) {
        return res.status(400).json({ 
          error: 'Missing required fields in brand brief' 
        });
      }

      // Create prompt for OpenAI
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

      // Generate brand identity using OpenAI
      const completion = await openai.chat.completions.create({
        model: GPT_MODEL,
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
      const logoSvg = generateLogoSVG(name, brandingData.colorPalette[0], brandingData.colorPalette[1]);
      
      // Compile the full result
      const result = {
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
  });

  const httpServer = createServer(app);
  return httpServer;
}
