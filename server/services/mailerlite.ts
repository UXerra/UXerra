import axios from 'axios';
import { config } from '../config.js';
import { AppError } from '../utils/error.js';
import type {
  SubscribeNewsletterInput,
  UnsubscribeNewsletterInput,
} from '../schemas/mailerlite.js';

class MailerliteService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.mailerlite.com/api/v2';
  private readonly headers: Record<string, string>;

  constructor() {
    this.apiKey = config.mailerlite.apiKey;
    this.headers = {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': this.apiKey,
    };
  }

  async subscribe({
    email,
    name,
    fields,
    groups,
  }: SubscribeNewsletterInput) {
    try {
      const subscriberData: any = { email };
      if (name) subscriberData.name = name;
      if (fields) subscriberData.fields = fields;
      if (groups) subscriberData.groups = groups;

      const response = await axios.post(
        `${this.baseUrl}/subscribers`,
        subscriberData,
        { headers: this.headers }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to subscribe to newsletter:', error);
      throw new AppError(500, 'Failed to subscribe to newsletter');
    }
  }

  async unsubscribe({ email }: UnsubscribeNewsletterInput) {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/subscribers/${email}`,
        { headers: this.headers }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to unsubscribe from newsletter:', error);
      throw new AppError(500, 'Failed to unsubscribe from newsletter');
    }
  }

  async getSubscriber(email: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/subscribers/${email}`,
        { headers: this.headers }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to get subscriber:', error);
      throw new AppError(500, 'Failed to get subscriber');
    }
  }

  async updateSubscriber(email: string, data: Partial<SubscribeNewsletterInput>) {
    try {
      const response = await axios.put(
        `${this.baseUrl}/subscribers/${email}`,
        data,
        { headers: this.headers }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to update subscriber:', error);
      throw new AppError(500, 'Failed to update subscriber');
    }
  }
}

export const mailerliteService = new MailerliteService(); 