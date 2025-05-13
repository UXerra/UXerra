import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <main className="container mx-auto py-16 px-4 max-w-4xl">
      <h1 className="text-4xl font-display font-bold mb-4 text-uxblue">{t('about.title', 'O nas / Vizija')}</h1>
      <p className="text-xl mb-8 text-muted-foreground">{t('about.slogan', 'Inspire. Automate. Lead the Future.')}</p>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-uxorange">{t('about.visionTitle', 'Vizija')}</h2>
        <p className="text-lg text-foreground mb-4">{t('about.vision', 'Ustvariti najboljšo digitalno platformo na svetu, ki združuje moč umetne inteligence, vrhunski dizajn, avtomatizacijo in navdihujočo uporabniško izkušnjo. UXerra bo orodje, skupnost in inspiracija – vse v enem.')}</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2 text-uxsky">{t('about.teamTitle', 'Ekipa & Poslanstvo')}</h2>
        <p className="text-lg text-foreground">{t('about.team', 'Naša ekipa združuje strokovnjake za UI/UX, AI, razvoj in marketing. Naš cilj je ustvariti platformo, ki bo navdihovala, avtomatizirala in povezovala kreativce po vsem svetu.')}</p>
      </section>
    </main>
  );
} 