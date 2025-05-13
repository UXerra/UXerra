import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Globe, Bot, ShoppingCart, CreditCard, Mail, SunMoon, BookOpen, Users, Zap } from 'lucide-react';

const features = [
  { icon: <Globe className="text-uxsky w-7 h-7" />, label: 'features.multilang', fallback: 'Večjezičnost (EN, SLO, DE, ES)' },
  { icon: <Bot className="text-uxorange w-7 h-7" />, label: 'features.ai', fallback: 'AI funkcionalnosti (OpenAI, Zipchat.ai, AI demo)' },
  { icon: <ShoppingCart className="text-uxgreen w-7 h-7" />, label: 'features.marketplace', fallback: 'Marketplace s storitvami, predlogami, AI vsebinami' },
  { icon: <CreditCard className="text-uxblue w-7 h-7" />, label: 'features.stripe', fallback: 'Stripe plačila' },
  { icon: <Mail className="text-uxpurple w-7 h-7" />, label: 'features.mailer', fallback: 'MailerLite e-mail avtomatizacija' },
  { icon: <SunMoon className="text-uxsky w-7 h-7" />, label: 'features.pwa', fallback: 'PWA podpora, dark/light način' },
  { icon: <BookOpen className="text-uxorange w-7 h-7" />, label: 'features.cms', fallback: 'CMS za bloge, vodiče, vire' },
  { icon: <Zap className="text-uxred w-7 h-7" />, label: 'features.anim', fallback: 'Animacije (GSAP), sticky menu, CTA' },
  { icon: <Users className="text-uxgreen w-7 h-7" />, label: 'features.dashboard', fallback: 'Uporabniški dashboard, profil, testimoniale' },
  { icon: <Sparkles className="text-uxblue w-7 h-7" />, label: 'features.seo', fallback: 'SEO optimizacija, meta podatki, schema.org' },
];

export default function FeaturesPage() {
  const { t } = useTranslation();
  return (
    <main className="container mx-auto py-16 px-4 max-w-5xl">
      <h1 className="text-4xl font-display font-bold mb-8 text-uxblue">{t('features.title', 'Funkcionalnosti')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow-ux p-6 text-center">
            {f.icon}
            <span className="mt-4 text-lg font-semibold text-foreground">{t(f.label, f.fallback)}</span>
          </div>
        ))}
      </div>
    </main>
  );
} 