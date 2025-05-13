import * as z from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = subscribeSchema.parse(body);

    // MailerLite API endpoint and key
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      throw new Error('MailerLite configuration is missing');
    }

    // Add subscriber to MailerLite
    const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': MAILERLITE_API_KEY,
      },
      body: JSON.stringify({
        email,
        groups: [MAILERLITE_GROUP_ID],
        resubscribe: true,
        autoresponders: true,
        type: 'active',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message || 'Failed to subscribe to newsletter');
    }

    return new Response(
      JSON.stringify({ message: 'Successfully subscribed to newsletter' }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : 'Failed to subscribe to newsletter',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 