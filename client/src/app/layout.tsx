import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UXerra Studio - AI-Powered Design Tool',
  description: 'Create stunning designs with AI assistance. Multilingual support, templates, and more.',
  keywords: 'design, AI, UX, UI, templates, branding, multilingual',
  authors: [{ name: 'UXerra Team' }],
  creator: 'UXerra',
  publisher: 'UXerra',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://uxerra.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'es-ES': '/es',
      'fr-FR': '/fr',
      'de-DE': '/de',
      'it-IT': '/it',
      'pt-BR': '/pt',
      'ru-RU': '/ru',
      'zh-CN': '/zh',
      'ja-JP': '/ja',
      'ko-KR': '/ko',
      'ar-SA': '/ar',
      'hi-IN': '/hi',
      'tr-TR': '/tr',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://uxerra.com',
    title: 'UXerra Studio - AI-Powered Design Tool',
    description: 'Create stunning designs with AI assistance. Multilingual support, templates, and more.',
    siteName: 'UXerra Studio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UXerra Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UXerra Studio - AI-Powered Design Tool',
    description: 'Create stunning designs with AI assistance. Multilingual support, templates, and more.',
    images: ['/twitter-image.jpg'],
    creator: '@uxerra',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    bing: 'your-bing-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          {children}
        </div>
      </body>
    </html>
  );
} 