import { env } from './config';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown): Response {
  console.error('Application error:', error);

  if (error instanceof AppError) {
    return new Response(
      JSON.stringify({
        error: error.message,
        code: error.code,
        details: env.app.isDevelopment ? error.stack : undefined,
      }),
      {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  if (error instanceof Error) {
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: env.app.isDevelopment ? error.message : undefined,
        details: env.app.isDevelopment ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(
    JSON.stringify({
      error: 'Internal Server Error',
      details: env.app.isDevelopment ? String(error) : undefined,
    }),
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }
  );
} 