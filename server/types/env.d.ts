declare namespace NodeJS {
  interface ProcessEnv {
    // Stripe
    STRIPE_SECRET_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    STRIPE_PRO_PRICE_ID: string;
    STRIPE_AGENCY_PRICE_ID: string;
    STRIPE_WEBHOOK_SECRET?: string;

    // OpenAI
    OPENAI_API_KEY: string;

    // MailerLite
    MAILERLITE_API_KEY: string;
    MAILERLITE_GROUP_ID: string;

    // App
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_APP_URL: string;
  }
}

// Ensure this file is treated as a module
export {}; 