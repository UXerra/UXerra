import crypto from 'crypto';

export const generateApiKey = (): string => {
  // Generate a random 32-byte buffer
  const buffer = crypto.randomBytes(32);
  
  // Convert to base64 and remove non-alphanumeric characters
  const key = buffer.toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 32); // Ensure consistent length
  
  // Format as xxxxx-xxxxx-xxxxx-xxxxx
  return key.match(/.{1,5}/g)?.join('-') || key;
}; 