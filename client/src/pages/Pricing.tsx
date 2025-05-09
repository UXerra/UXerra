import React from 'react';
import { useTranslation } from 'react-i18next';
import PricingSection from '@/components/home/PricingSection';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {t('pricingPage.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t('pricingPage.description')}
            </p>
          </motion.div>
        </div>
      </section>
      
      <PricingSection />
      
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              {t('pricingPage.faqTitle')}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-display font-medium mb-2">{t('pricingPage.faq.question1')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('pricingPage.faq.answer1')}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-display font-medium mb-2">{t('pricingPage.faq.question2')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('pricingPage.faq.answer2')}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-display font-medium mb-2">{t('pricingPage.faq.question3')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('pricingPage.faq.answer3')}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-display font-medium mb-2">{t('pricingPage.faq.question4')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('pricingPage.faq.answer4')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
