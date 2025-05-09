import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface PricingPlanProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonStyle: 'primary' | 'secondary';
  planId?: string;
  index: number;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  description,
  price,
  features,
  popular = false,
  buttonText,
  buttonStyle = 'secondary',
  planId,
  index
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const handleSubscribe = async () => {
    if (!planId) return;
    
    try {
      const response = await apiRequest('POST', '/api/create-checkout-session', {
        planId
      });
      
      const data = await response.json();
      
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error) {
      toast({
        title: t('pricing.errorTitle'),
        description: t('pricing.checkoutError'),
        variant: "destructive",
      });
    }
  };
  
  return (
    <motion.div 
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${popular ? 'shadow-lg relative transform scale-105 z-10' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
    >
      {popular && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-brand-orange"></div>}
      {popular && <div className="absolute top-4 right-4 bg-brand-orange text-white text-xs font-bold uppercase py-1 px-2 rounded-full">{t('pricing.popular')}</div>}
      <div className="p-6">
        <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex items-end mb-6">
          <span className="text-4xl font-display font-bold">{price}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <button 
          onClick={handleSubscribe}
          className={`block w-full py-2 text-center rounded-lg font-medium transition-colors ${
            buttonStyle === 'primary' 
              ? 'bg-brand-blue text-white hover:bg-brand-blue/90' 
              : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
};

const PricingSection: React.FC = () => {
  const { t } = useTranslation();
  
  const plans = [
    {
      title: t('pricing.free.title'),
      description: t('pricing.free.description'),
      price: '$0',
      features: [
        t('pricing.free.features.basic'),
        t('pricing.free.features.exports'),
        t('pricing.free.features.support')
      ],
      buttonText: t('pricing.free.buttonText'),
      buttonStyle: 'secondary' as const,
      planId: 'free_plan'
    },
    {
      title: t('pricing.pro.title'),
      description: t('pricing.pro.description'),
      price: '$29',
      features: [
        t('pricing.pro.features.unlimited'),
        t('pricing.pro.features.exports'),
        t('pricing.pro.features.multilingual'),
        t('pricing.pro.features.seo'),
        t('pricing.pro.features.support')
      ],
      popular: true,
      buttonText: t('pricing.pro.buttonText'),
      buttonStyle: 'primary' as const,
      planId: 'pro_monthly'
    },
    {
      title: t('pricing.agency.title'),
      description: t('pricing.agency.description'),
      price: '$79',
      features: [
        t('pricing.agency.features.everything'),
        t('pricing.agency.features.team'),
        t('pricing.agency.features.whiteLabel'),
        t('pricing.agency.features.api'),
        t('pricing.agency.features.dedicated')
      ],
      buttonText: t('pricing.agency.buttonText'),
      buttonStyle: 'secondary' as const,
      planId: 'agency_monthly'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-brand-gray dark:bg-brand-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('pricing.sectionTitle')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('pricing.sectionDescription')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              index={index}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              features={plan.features}
              popular={plan.popular}
              buttonText={plan.buttonText}
              buttonStyle={plan.buttonStyle}
              planId={plan.planId}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('pricing.trialInfo')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
