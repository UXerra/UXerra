import bcrypt from 'bcryptjs';
import { AppError } from '../utils/error.js';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (error) {
    console.error('Failed to hash password:', error);
    throw new AppError(500, 'Failed to hash password');
  }
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Failed to compare passwords:', error);
    throw new AppError(500, 'Failed to compare passwords');
  }
}; 