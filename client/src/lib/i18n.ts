import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translations
import en from '@/locales/en.json';
import sl from '@/locales/sl.json';
import de from '@/locales/de.json';
import es from '@/locales/es.json';
import fr from '@/locales/fr.json';
import it from '@/locales/it.json';
import pt from '@/locales/pt.json';
import tr from '@/locales/tr.json';
import zh from '@/locales/zh.json';

// English translations for branding wizard
const brandingWizardEN = {
  title: 'AI Branding Wizard',
  description: 'Complete a simple brief and let AI generate your brand assets in seconds.',
  pageTitle: 'Brand Identity Creator',
  pageDescription: 'Enter a few details about your project and let our AI create a complete branding package for you.',
  wizardTitle: 'Create Your Brand',
  wizardDescription: 'Fill out this brief to generate your brand identity. Fields marked with * are required.',
  briefTab: 'Brief',
  resultsTab: 'Results',
  nameLabel: 'Brand Name',
  namePlaceholder: 'Enter your brand name',
  industryLabel: 'Industry',
  industryPlaceholder: 'Select your industry',
  goalLabel: 'Brand Purpose',
  goalPlaceholder: 'E.g., To disrupt the fitness industry with AI-powered workout plans',
  descriptionLabel: 'Brand Description',
  descriptionPlaceholder: 'Describe your brand and what makes it unique',
  targetAudienceLabel: 'Target Audience',
  targetAudiencePlaceholder: 'E.g., Health-conscious professionals, ages 25-45',
  styleLabel: 'Brand Style',
  stylePlaceholder: 'Select preferred style',
  colorPreferenceLabel: 'Color Preferences (optional)',
  colorPreferencePlaceholder: 'E.g., Blues and greens, earthy tones, etc.',
  resetButton: 'Reset',
  generateButton: 'Generate Brand Identity',
  generatingButton: 'Generating...',
  backButton: 'Back to Brief',
  startOverButton: 'Start New Brand',
  logoResult: 'Logo',
  colorPaletteResult: 'Color Palette',
  typographyResult: 'Typography',
  primaryFont: 'Primary Font',
  secondaryFont: 'Secondary Font',
  illustrationStyleResult: 'Illustration Style',
  websiteTemplateResult: 'Website Template',
  errorTitle: 'Error',
  missingFieldsError: 'Please fill in all required fields.',
  generationError: 'An error occurred while generating your brand identity. Please try again.',
  successTitle: 'Success',
  generationSuccess: 'Your brand identity has been generated successfully!',
  howItWorksTitle: 'How It Works',
  step1Title: 'Fill the Brief',
  step1Description: 'Tell us about your brand, its purpose, and your preferences.',
  step2Title: 'AI Generation',
  step2Description: 'Our AI analyzes your brief and creates a complete brand identity package.',
  step3Title: 'Review & Export',
  step3Description: 'Review the results, make adjustments if needed, and export your brand assets.',
  industries: {
    technology: 'Technology',
    finance: 'Finance & Banking',
    healthcare: 'Healthcare',
    education: 'Education',
    retail: 'Retail & E-commerce',
    food: 'Food & Beverage',
    travel: 'Travel & Hospitality',
    fashion: 'Fashion & Apparel',
    fitness: 'Fitness & Wellness',
    entertainment: 'Entertainment & Media',
    construction: 'Construction & Real Estate',
    manufacturing: 'Manufacturing',
    other: 'Other'
  },
  styles: {
    modern: 'Modern & Minimal',
    minimal: 'Clean & Simple',
    bold: 'Bold & Vibrant',
    playful: 'Playful & Creative',
    elegant: 'Elegant & Sophisticated',
    corporate: 'Professional & Corporate',
    vintage: 'Vintage & Retro',
    futuristic: 'Futuristic & Tech',
    handcrafted: 'Handcrafted & Organic'
  }
};

// Slovenian translations for branding wizard
const brandingWizardSL = {
  title: 'AI Čarovnik za Blagovno Znamko',
  description: 'Izpolnite kratek obrazec in naj AI v sekundah ustvari vašo blagovno znamko.',
  pageTitle: 'Ustvarjalec Identitete Blagovne Znamke',
  pageDescription: 'Vnesite nekaj podrobnosti o vašem projektu in naj naša AI za vas ustvari celovit paket blagovne znamke.',
  wizardTitle: 'Ustvarite Svojo Blagovno Znamko',
  wizardDescription: 'Izpolnite ta obrazec za ustvarjanje identitete vaše blagovne znamke. Polja označena z * so obvezna.',
  briefTab: 'Obrazec',
  resultsTab: 'Rezultati',
  nameLabel: 'Ime Blagovne Znamke',
  namePlaceholder: 'Vnesite ime vaše blagovne znamke',
  industryLabel: 'Industrija',
  industryPlaceholder: 'Izberite vašo industrijo',
  goalLabel: 'Namen Blagovne Znamke',
  goalPlaceholder: 'Npr., Preoblikovanje fitnes industrije z AI vadbeni načrti',
  descriptionLabel: 'Opis Blagovne Znamke',
  descriptionPlaceholder: 'Opišite vašo blagovno znamko in kaj jo dela edinstveno',
  targetAudienceLabel: 'Ciljna Publika',
  targetAudiencePlaceholder: 'Npr., Zdravstveno ozaveščeni strokovnjaki, starosti 25-45',
  styleLabel: 'Slog Blagovne Znamke',
  stylePlaceholder: 'Izberite želeni slog',
  colorPreferenceLabel: 'Barvne Preference (opcijsko)',
  colorPreferencePlaceholder: 'Npr., Modre in zelene barve, zemeljski toni, itd.',
  resetButton: 'Ponastavi',
  generateButton: 'Ustvari Identiteto',
  generatingButton: 'Ustvarjanje...',
  backButton: 'Nazaj na Obrazec',
  startOverButton: 'Začni Novo Znamko',
  logoResult: 'Logotip',
  colorPaletteResult: 'Barvna Paleta',
  typographyResult: 'Tipografija',
  primaryFont: 'Primarna Pisava',
  secondaryFont: 'Sekundarna Pisava',
  illustrationStyleResult: 'Slog Ilustracij',
  websiteTemplateResult: 'Predloga Spletne Strani',
  errorTitle: 'Napaka',
  missingFieldsError: 'Prosimo, izpolnite vsa obvezna polja.',
  generationError: 'Pri ustvarjanju identitete blagovne znamke je prišlo do napake. Prosimo, poskusite znova.',
  successTitle: 'Uspeh',
  generationSuccess: 'Vaša identiteta blagovne znamke je bila uspešno ustvarjena!',
  howItWorksTitle: 'Kako Deluje',
  step1Title: 'Izpolnite Obrazec',
  step1Description: 'Povejte nam o vaši blagovni znamki, njenem namenu in vaših preferencah.',
  step2Title: 'AI Generiranje',
  step2Description: 'Naša AI analizira vaš obrazec in ustvari celovit paket identitete blagovne znamke.',
  step3Title: 'Pregled in Izvoz',
  step3Description: 'Preglejte rezultate, po potrebi naredite prilagoditve in izvozite svoja sredstva blagovne znamke.',
  industries: {
    technology: 'Tehnologija',
    finance: 'Finance & Bančništvo',
    healthcare: 'Zdravstvo',
    education: 'Izobraževanje',
    retail: 'Maloprodaja & E-trgovina',
    food: 'Prehrana & Pijače',
    travel: 'Potovanja & Gostoljubje',
    fashion: 'Moda & Oblačila',
    fitness: 'Fitnes & Wellness',
    entertainment: 'Zabava & Mediji',
    construction: 'Gradbeništvo & Nepremičnine',
    manufacturing: 'Proizvodnja',
    other: 'Drugo'
  },
  styles: {
    modern: 'Moderno & Minimalistično',
    minimal: 'Čisto & Preprosto',
    bold: 'Drzno & Živahno',
    playful: 'Igrivo & Kreativno',
    elegant: 'Elegantno & Sofisticirano',
    corporate: 'Profesionalno & Korporativno',
    vintage: 'Vintage & Retro',
    futuristic: 'Futuristično & Tehnološko',
    handcrafted: 'Ročno izdelano & Organsko'
  }
};

const resources = {
  en: { translation: en },
  sl: { translation: sl },
  de: { translation: de },
  es: { translation: es },
  fr: { translation: fr },
  it: { translation: it },
  pt: { translation: pt },
  tr: { translation: tr },
  zh: { translation: zh },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
