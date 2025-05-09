/**
 * MailerLite integration utilities for newsletter subscriptions
 */

import { apiRequest } from './queryClient';

/**
 * Interface for subscriber data
 */
interface SubscriberData {
  email: string;
  name?: string;
  fields?: Record<string, any>;
  groups?: string[];
}

/**
 * Subscribe an email to the newsletter
 * @param email Email address to subscribe
 * @param name Optional name of the subscriber
 * @param fields Optional additional fields
 * @param groups Optional groups to add the subscriber to
 * @returns Promise with subscription result
 */
export const subscribeToNewsletter = async (
  email: string,
  name?: string,
  fields?: Record<string, any>,
  groups?: string[]
): Promise<any> => {
  try {
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email address');
    }
    
    const data: SubscriberData = { email };
    
    if (name) data.name = name;
    if (fields) data.fields = fields;
    if (groups) data.groups = groups;
    
    const response = await apiRequest('POST', '/api/subscribe-newsletter', data);
    return await response.json();
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

/**
 * Validate an email address format
 * @param email Email to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default {
  subscribeToNewsletter,
  isValidEmail
};
