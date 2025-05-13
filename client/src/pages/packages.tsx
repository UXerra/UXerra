import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';

const packages = [
  {
    name: 'Starter',
    price: '0€',
    features: ['AI demo', 'Blog & vodiči', 'Osnovna podpora'],
    cta: 'landing.cta',
    color: 'uxsky',
  },
  {
    name: 'Pro',
    price: '29€/mesec',
    features: ['Vse iz Starter', 'Marketplace', 'Stripe/MailerLite', 'Napredni AI orodja'],
    cta: 'landing.cta',
    color: 'uxorange',
  },
  {
    name: 'Enterprise',
    price: 'Po dogovoru',
    features: ['Vse iz Pro', 'B2B paketi', 'Custom AI', 'Prioritetna podpora'],
    cta: 'landing.cta',
    color: 'uxblue',
  },
];

export default function PackagesPage() {
  const { t } = useTranslation();
  return (
    <main className="container mx-auto py-16 px-4 max-w-5xl">
      <h1 className="text-4xl font-display font-bold mb-8 text-uxblue text-center">{t('packages.title', 'Paketne ponudbe')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((p, i) => (
          <div key={i} className={`flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow-ux p-8 text-center border-t-4 border-${p.color}`}>
            <h2 className={`text-2xl font-bold mb-2 text-${p.color}`}>{p.name}</h2>
            <div className="text-3xl font-semibold mb-4">{p.price}</div>
            <ul className="mb-6 space-y-2">
              {p.features.map((f, j) => (
                <li key={j} className="text-foreground">{t(`packages.feature${i}${j}`, f)}</li>
              ))}
            </ul>
            <Button size="lg" className={`bg-${p.color} text-white px-6 py-2 rounded-lg shadow-ux`}>{t(p.cta, 'Začni zdaj')}</Button>
          </div>
        ))}
      </div>
    </main>
  );
} 