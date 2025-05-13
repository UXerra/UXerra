import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Sparkles, Bot, ShoppingCart, Users } from 'lucide-react';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <section className="flex flex-col items-center justify-center py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-uxblue/10 to-uxorange/10 pointer-events-none animate-fade-in" />
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-uxblue drop-shadow-lg animate-fade-in-up">
          UXerra
        </h1>
        <p className="text-2xl md:text-3xl mb-8 text-muted-foreground animate-fade-in-up delay-100">
          {t('landing.slogan', 'Inspire. Automate. Lead the Future.')}
        </p>
        <Button size="lg" className="bg-uxorange text-white px-8 py-4 text-xl rounded-xl shadow-ux animate-bounce">
          {t('landing.cta', 'Začni zdaj')}
        </Button>
      </section>
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-uxsky text-center animate-fade-in-up">
          {t('landing.featuresTitle', 'Funkcionalnosti platforme')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow-ux p-6 text-center animate-fade-in-up">
            <Sparkles className="w-8 h-8 text-uxblue mb-2" />
            <span className="font-semibold text-lg">{t('landing.feature1', 'AI-podprta kreativnost')}</span>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow-ux p-6 text-center animate-fade-in-up delay-100">
            <Bot className="w-8 h-8 text-uxorange mb-2" />
            <span className="font-semibold text-lg">{t('landing.feature2', 'Napredni AI chatbot & demo')}</span>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow-ux p-6 text-center animate-fade-in-up delay-200">
            <ShoppingCart className="w-8 h-8 text-uxgreen mb-2" />
            <span className="font-semibold text-lg">{t('landing.feature3', 'Marketplace & avtomatizacija')}</span>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-uxorange text-center animate-fade-in-up">
          {t('landing.testimonialsTitle', 'Kaj pravijo uporabniki?')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-ux p-6 animate-fade-in-up">
            <p className="text-lg italic mb-2">{t('landing.testimonial1', 'UXerra mi je odprla vrata v svet AI dizajna!')}</p>
            <span className="font-semibold text-uxblue">Ana, dizajnerka</span>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-ux p-6 animate-fade-in-up delay-100">
            <p className="text-lg italic mb-2">{t('landing.testimonial2', 'Najboljša platforma za kreativce in podjetnike!')}</p>
            <span className="font-semibold text-uxorange">Marko, startup founder</span>
          </div>
        </div>
      </section>
    </main>
  );
} 