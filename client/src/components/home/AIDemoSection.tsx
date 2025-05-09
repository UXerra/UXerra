import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const AIDemoSection: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [contentType, setContentType] = useState('Website Section');
  const [prompt, setPrompt] = useState('Create a hero section for a modern AI tool for designers that helps automate workflow and enhance creativity.');
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<null | {html: string, code: string}>(null);

  const tones = [
    { id: 'professional', name: 'Professional' },
    { id: 'casual', name: 'Casual' },
    { id: 'technical', name: 'Technical' },
    { id: 'playful', name: 'Playful' },
  ];

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: t('aiDemo.errorTitle'),
        description: t('aiDemo.emptyPromptError'),
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await apiRequest('POST', '/api/generate-content', {
        prompt,
        contentType,
        tone: selectedTone
      });
      
      const data = await response.json();
      setGeneratedContent(data);
      
      toast({
        title: t('aiDemo.successTitle'),
        description: t('aiDemo.contentGenerated'),
      });
    } catch (error) {
      toast({
        title: t('aiDemo.errorTitle'),
        description: t('aiDemo.generationError'),
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (generatedContent?.code) {
      navigator.clipboard.writeText(generatedContent.code);
      toast({
        title: t('aiDemo.copied'),
        description: t('aiDemo.codeCopied'),
      });
    }
  };

  return (
    <section id="ai-demo" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('aiDemo.sectionTitle.part1')} <span className="gradient-text">{t('aiDemo.sectionTitle.part2')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('aiDemo.sectionDescription')}
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-5xl mx-auto gradient-border p-6 md:p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* AI Demo Interface */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* AI Input Section */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-display font-bold mb-4">{t('aiDemo.contentGenerator')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t('aiDemo.contentDescription')}
              </p>
              
              {/* Demo Form */}
              <div className="mb-4">
                <label htmlFor="ai-demo-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('aiDemo.contentType')}
                </label>
                <select 
                  id="ai-demo-type" 
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                >
                  <option>Website Section</option>
                  <option>Landing Page</option>
                  <option>Product Description</option>
                  <option>Brand Story</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="ai-demo-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('aiDemo.promptLabel')}
                </label>
                <textarea 
                  id="ai-demo-prompt" 
                  rows={4} 
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm resize-none"
                  placeholder={t('aiDemo.promptPlaceholder')}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label htmlFor="ai-demo-tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('aiDemo.toneLabel')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone.id}
                      className={`px-3 py-1 ${
                        selectedTone === tone.name 
                          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      } rounded-full text-xs font-medium`}
                      onClick={() => setSelectedTone(tone.name)}
                    >
                      {tone.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                className="w-full py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleGenerateContent}
                disabled={isGenerating}
              >
                {isGenerating ? t('aiDemo.generating') : t('aiDemo.generateContent')}
              </button>
              
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                {t('aiDemo.poweredBy')}
              </div>
            </div>
            
            {/* AI Output Preview */}
            <div className="md:col-span-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">{t('aiDemo.generatedPreview')}</h4>
                <div className="flex space-x-2">
                  <button 
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={handleGenerateContent}
                    disabled={isGenerating}
                    aria-label={t('aiDemo.regenerate')}
                  >
                    <i className="ri-refresh-line"></i>
                  </button>
                  <button 
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={handleCopyCode}
                    disabled={!generatedContent}
                    aria-label={t('aiDemo.copy')}
                  >
                    <i className="ri-file-copy-line"></i>
                  </button>
                </div>
              </div>
              
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('aiDemo.generatingContent')}</p>
                </div>
              ) : generatedContent ? (
                <>
                  {/* Generated Content Preview */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-4 shadow-sm">
                    <div className="text-sm font-mono overflow-x-auto custom-scrollbar" dangerouslySetInnerHTML={{ __html: generatedContent.html }}></div>
                  </div>
                  
                  {/* Code Snippet */}
                  <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 font-mono overflow-x-auto custom-scrollbar">
                    <pre><code>{generatedContent.code}</code></pre>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <i className="ri-code-box-line text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                  <p className="text-gray-500 dark:text-gray-400">{t('aiDemo.noContentYet')}</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{t('aiDemo.contentWillAppearHere')}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIDemoSection;
