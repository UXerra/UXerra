import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: string;
  iconClass: string;
  bgColorClass: string;
  darkBgColorClass: string;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  iconClass, 
  bgColorClass, 
  darkBgColorClass, 
  title, 
  description,
  index
}) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="feature-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className={`w-12 h-12 rounded-lg ${bgColorClass} ${darkBgColorClass} flex items-center justify-center mb-6`}>
        <i className={`feature-icon ${icon} text-xl ${iconClass}`}></i>
      </div>
      <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      <div className="pt-2 mt-auto">
        <a href="#" className="text-brand-blue font-medium hover:underline inline-flex items-center">
          {t('features.learnMore')}
          <i className="ri-arrow-right-line ml-1"></i>
        </a>
      </div>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: "ri-ai-generate",
      iconClass: "text-brand-blue",
      bgColorClass: "bg-blue-100",
      darkBgColorClass: "dark:bg-blue-900/30",
      title: t('features.aiContent.title'),
      description: t('features.aiContent.description')
    },
    {
      icon: "ri-translate-2",
      iconClass: "text-brand-orange",
      bgColorClass: "bg-orange-100",
      darkBgColorClass: "dark:bg-orange-900/30",
      title: t('features.multilingual.title'),
      description: t('features.multilingual.description')
    },
    {
      icon: "ri-secure-payment-line",
      iconClass: "text-green-600",
      bgColorClass: "bg-green-100",
      darkBgColorClass: "dark:bg-green-900/30",
      title: t('features.payments.title'),
      description: t('features.payments.description')
    },
    {
      icon: "ri-mail-send-line",
      iconClass: "text-purple-600",
      bgColorClass: "bg-purple-100",
      darkBgColorClass: "dark:bg-purple-900/30",
      title: t('features.newsletter.title'),
      description: t('features.newsletter.description')
    },
    {
      icon: "ri-animation-line",
      iconClass: "text-pink-600",
      bgColorClass: "bg-pink-100",
      darkBgColorClass: "dark:bg-pink-900/30",
      title: t('features.animation.title'),
      description: t('features.animation.description')
    },
    {
      icon: "ri-search-eye-line",
      iconClass: "text-cyan-600",
      bgColorClass: "bg-cyan-100",
      darkBgColorClass: "dark:bg-cyan-900/30",
      title: t('features.seo.title'),
      description: t('features.seo.description')
    }
  ];

  return (
    <section id="features" className="py-20 bg-brand-gray dark:bg-brand-dark relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('features.sectionTitle')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('features.sectionDescription')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              icon={feature.icon}
              iconClass={feature.iconClass}
              bgColorClass={feature.bgColorClass}
              darkBgColorClass={feature.darkBgColorClass}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
