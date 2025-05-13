import { z, ZodError, ZodSchema } from 'zod';
import { ValidationError } from './error.js';

// Validate object against schema
export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError('Validation failed', error.errors);
    }
    throw error;
  }
}

// Validate object against schema safely
export function validateSafe<T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

// Validate object against schema with custom error message
export function validateWithMessage<T>(
  schema: ZodSchema<T>,
  data: unknown,
  message: string
): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(message, error.errors);
    }
    throw error;
  }
}

// Validate object against schema with custom error message safely
export function validateWithMessageSafe<T>(
  schema: ZodSchema<T>,
  data: unknown,
  message: string
): { success: true; data: T } | { success: false; error: ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

// Validate object against schema with custom error message and transform
export function validateWithTransform<T, U>(
  schema: ZodSchema<T>,
  data: unknown,
  message: string,
  transform: (data: T) => U
): U {
  try {
    const validatedData = schema.parse(data);
    return transform(validatedData);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(message, error.errors);
    }
    throw error;
  }
}

// Validate object against schema with custom error message and transform safely
export function validateWithTransformSafe<T, U>(
  schema: ZodSchema<T>,
  data: unknown,
  message: string,
  transform: (data: T) => U
): { success: true; data: U } | { success: false; error: ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: transform(result.data) };
  }
  return { success: false, error: result.error };
} 