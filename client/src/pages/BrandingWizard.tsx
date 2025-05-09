import React from 'react';
import { useTranslation } from 'react-i18next';
import AIBrandingWizard from '@/components/features/AIBrandingWizard';

const BrandingWizardPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-brand-blue">AI</span> {t('brandingWizard.pageTitle')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('brandingWizard.pageDescription')}
          </p>
        </div>
      </div>
      
      <AIBrandingWizard />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('brandingWizard.howItWorksTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('brandingWizard.step1Title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('brandingWizard.step1Description')}
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('brandingWizard.step2Title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('brandingWizard.step2Description')}
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('brandingWizard.step3Title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('brandingWizard.step3Description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingWizardPage;