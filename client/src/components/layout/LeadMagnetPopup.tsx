import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const LeadMagnetPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if popup has been shown before in this session
    const hasPopupBeenShown = document.cookie.includes('popup_shown=true');
    
    if (!hasPopupBeenShown) {
      // Show popup after 15 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 15000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    
    // Set cookie to prevent showing again for this session
    document.cookie = "popup_shown=true; path=/";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: t('leadMagnet.invalidEmail'),
        description: t('leadMagnet.pleaseEnterValidEmail'),
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/subscribe-newsletter', { email });
      
      toast({
        title: t('leadMagnet.success'),
        description: t('leadMagnet.subscriptionConfirmation'),
      });
      
      closePopup();
    } catch (error) {
      toast({
        title: t('leadMagnet.error'),
        description: t('leadMagnet.subscriptionError'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`lead-magnet-popup fixed bottom-4 right-4 max-w-sm w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 z-40 ${isVisible ? 'show' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center mr-3">
            <i className="ri-mail-line text-brand-blue"></i>
          </div>
          <h3 className="font-display font-bold text-lg">{t('leadMagnet.title')}</h3>
        </div>
        <button onClick={closePopup} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {t('leadMagnet.description')}
      </p>
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="mb-3">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('leadMagnet.emailPlaceholder')}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 rounded-lg bg-brand-blue text-white font-medium hover:bg-brand-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('leadMagnet.subscribing') : t('leadMagnet.subscribe')}
        </button>
      </form>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        {t('leadMagnet.privacyNotice')}
      </p>
    </div>
  );
};

export default LeadMagnetPopup;
