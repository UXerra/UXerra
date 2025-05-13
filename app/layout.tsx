import '../app/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../client/src/components/layout/Footer';

export const metadata = {
  title: 'UXerra Studio',
  description: 'AI-powered creative platform for design, automation, and innovation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-[#0F172A] dark:bg-[#0F172A] dark:text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 