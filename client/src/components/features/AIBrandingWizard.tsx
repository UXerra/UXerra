import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import LottieAnimation from '@/components/ui/lottie-animation';

// Mock animation data for loading state (will be replaced with actual Lottie file)
const loadingAnimationData = {
  v: "5.7.8",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Loading",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { 
          a: 1, 
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 60, s: [360] }
          ]
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [70, 70] },
              p: { a: 0, k: [0, 0] },
              nm: "Circle Path 1",
            },
            {
              ty: "st",
              c: { a: 0, k: [0.11, 0.41, 0.95, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 8 },
              lc: 2,
              lj: 1,
              ml: 4,
              nm: "Stroke 1",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: "Transform"
            }
          ],
          nm: "Circle",
        }
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    }
  ]
};

interface BrandingResult {
  logo?: string;
  colorPalette?: string[];
  typography?: {
    primary: string;
    secondary: string;
  };
  illustrationStyle?: string;
  websiteTemplate?: string;
}

const AIBrandingWizard: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [brandingResult, setBrandingResult] = useState<BrandingResult | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    goal: '',
    description: '',
    targetAudience: '',
    style: 'modern', // modern, minimal, bold, playful, elegant
    colorPreference: '',
  });

  // Industries options
  const industries = [
    'technology', 'finance', 'healthcare', 'education', 
    'retail', 'food', 'travel', 'fashion', 'fitness',
    'entertainment', 'construction', 'manufacturing', 'other'
  ];

  // Style options
  const styles = [
    'modern', 'minimal', 'bold', 'playful', 'elegant', 
    'corporate', 'vintage', 'futuristic', 'handcrafted'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.industry) {
      toast({
        title: t('brandingWizard.errorTitle'),
        description: t('brandingWizard.missingFieldsError'),
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      // In a real implementation, this would make an API call to OpenAI
      // For now, we'll simulate the generation with a timeout
      setTimeout(() => {
        // Mock result data
        const mockResult: BrandingResult = {
          logo: 'data:image/svg+xml;base64,...', // This would be a real SVG in production
          colorPalette: ['#1C68F3', '#F29F05', '#333333', '#FFFFFF', '#F5F5F5'],
          typography: {
            primary: 'Space Grotesk',
            secondary: 'Inter',
          },
          illustrationStyle: 'Modern 3D with vibrant blue accents',
          websiteTemplate: 'Modern SaaS Template',
        };
        
        setBrandingResult(mockResult);
        setIsGenerating(false);
        setActiveStep(1); // Move to results tab
        
        toast({
          title: t('brandingWizard.successTitle'),
          description: t('brandingWizard.generationSuccess'),
        });
      }, 3000);
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: t('brandingWizard.errorTitle'),
        description: t('brandingWizard.generationError'),
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      industry: '',
      goal: '',
      description: '',
      targetAudience: '',
      style: 'modern',
      colorPreference: '',
    });
    setBrandingResult(null);
    setActiveStep(0);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('brandingWizard.title')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('brandingWizard.description')}
          </p>
        </div>

        <Card className="max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle>{t('brandingWizard.wizardTitle')}</CardTitle>
            <CardDescription>
              {t('brandingWizard.wizardDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="brief" value={activeStep === 0 ? 'brief' : 'results'}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="brief" onClick={() => setActiveStep(0)}>
                  {t('brandingWizard.briefTab')}
                </TabsTrigger>
                <TabsTrigger 
                  value="results" 
                  onClick={() => brandingResult && setActiveStep(1)}
                  disabled={!brandingResult}
                >
                  {t('brandingWizard.resultsTab')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="brief" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('brandingWizard.nameLabel')} *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('brandingWizard.namePlaceholder')}
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('brandingWizard.industryLabel')} *
                    </label>
                    <Select 
                      value={formData.industry} 
                      onValueChange={(value) => handleSelectChange('industry', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('brandingWizard.industryPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {t(`brandingWizard.industries.${industry}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      {t('brandingWizard.goalLabel')}
                    </label>
                    <Input
                      name="goal"
                      value={formData.goal}
                      onChange={handleInputChange}
                      placeholder={t('brandingWizard.goalPlaceholder')}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      {t('brandingWizard.descriptionLabel')}
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder={t('brandingWizard.descriptionPlaceholder')}
                      className="w-full h-24"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      {t('brandingWizard.targetAudienceLabel')}
                    </label>
                    <Input
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleInputChange}
                      placeholder={t('brandingWizard.targetAudiencePlaceholder')}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('brandingWizard.styleLabel')}
                    </label>
                    <Select 
                      value={formData.style} 
                      onValueChange={(value) => handleSelectChange('style', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('brandingWizard.stylePlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map((style) => (
                          <SelectItem key={style} value={style}>
                            {t(`brandingWizard.styles.${style}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('brandingWizard.colorPreferenceLabel')}
                    </label>
                    <Input
                      name="colorPreference"
                      value={formData.colorPreference}
                      onChange={handleInputChange}
                      placeholder={t('brandingWizard.colorPreferencePlaceholder')}
                      className="w-full"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="results">
                {brandingResult && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Logo */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">{t('brandingWizard.logoResult')}</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center h-48">
                          {/* This would show the actual logo in production */}
                          <div className="w-32 h-32 bg-gradient-to-br from-brand-blue to-brand-orange rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {formData.name.substring(0, 2).toUpperCase()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Color Palette */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">{t('brandingWizard.colorPaletteResult')}</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                          <div className="flex space-x-2 mb-4">
                            {brandingResult.colorPalette?.map((color, index) => (
                              <div key={index} className="flex-1">
                                <div 
                                  className="w-full h-12 rounded-md border border-gray-200 dark:border-gray-700"
                                  style={{ backgroundColor: color }}
                                ></div>
                                <p className="text-xs text-center mt-1">{color}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Typography */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">{t('brandingWizard.typographyResult')}</h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                        <div className="mb-4">
                          <p className="text-sm mb-1">{t('brandingWizard.primaryFont')}</p>
                          <p className="text-3xl font-display">{formData.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{brandingResult.typography?.primary}</p>
                        </div>
                        <div>
                          <p className="text-sm mb-1">{t('brandingWizard.secondaryFont')}</p>
                          <p className="text-xl">{formData.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{brandingResult.typography?.secondary}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Illustration Style & Website Template */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">{t('brandingWizard.illustrationStyleResult')}</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                          <p>{brandingResult.illustrationStyle}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-3">{t('brandingWizard.websiteTemplateResult')}</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                          <p>{brandingResult.websiteTemplate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            {activeStep === 0 ? (
              <div className="w-full flex justify-between">
                <Button variant="outline" onClick={resetForm}>
                  {t('brandingWizard.resetButton')}
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isGenerating}
                  className="min-w-[150px]"
                >
                  {isGenerating ? (
                    <>
                      <LottieAnimation 
                        animationData={loadingAnimationData}
                        className="w-6 h-6 mr-2"
                      />
                      {t('brandingWizard.generatingButton')}
                    </>
                  ) : (
                    t('brandingWizard.generateButton')
                  )}
                </Button>
              </div>
            ) : (
              <div className="w-full flex justify-between">
                <Button variant="outline" onClick={() => setActiveStep(0)}>
                  {t('brandingWizard.backButton')}
                </Button>
                <Button onClick={resetForm}>
                  {t('brandingWizard.startOverButton')}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default AIBrandingWizard;