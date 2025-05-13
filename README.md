# UXerra Studio

Professional web design and development platform with AI-powered tools.

## Features

- User authentication and authorization
- Subscription management with Stripe
- AI-powered design tools
- Newsletter management with MailerLite
- API key management
- Audit logging

## Tech Stack

- **Frontend**: React, Next.js, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Payment**: Stripe
- **Email**: MailerLite
- **AI**: OpenAI
- **Caching**: Redis

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/uxerra-studio.git
   cd uxerra-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

4. Set up the database:
   ```bash
   npm run init:db
   npm run seed:db
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Deployment

The application can be deployed to Vercel, Netlify, or any Node.js hosting platform.

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## License

MIT 