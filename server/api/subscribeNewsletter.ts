import { Request, Response } from 'express';
import axios from 'axios';
import { storage } from '../storage';
import { insertSubscriberSchema } from '@shared/schema';

// MailerLite API Key
const mailerLiteApiKey = process.env.MAILERLITE_API_KEY || '';

/**
 * Subscribe an email to the newsletter via MailerLite
 * @param req Express request
 * @param res Express response
 */
export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email, name, fields, groups } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    // Create subscriber data for MailerLite
    const subscriberData: any = { email };
    if (name) subscriberData.name = name;
    if (fields) subscriberData.fields = fields;
    if (groups) subscriberData.groups = groups;
    
    // Make API request to MailerLite
    await axios.post(
      'https://api.mailerlite.com/api/v2/subscribers',
      subscriberData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': mailerLiteApiKey
        }
      }
    );
    
    // Add subscriber to database
    const validatedData = insertSubscriberSchema.parse({
      email,
      name
    });
    
    await storage.createSubscriber(validatedData);
    
    res.json({ 
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error: any) {
    console.error('Error subscribing to newsletter:', error);
    
    // Check if it's a MailerLite API error
    if (error.response && error.response.data) {
      return res.status(error.response.status).json({ 
        message: 'Failed to subscribe to newsletter',
        error: error.response.data
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to subscribe to newsletter',
      error: error.message
    });
  }
};

export default subscribeNewsletter;
