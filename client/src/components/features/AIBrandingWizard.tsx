import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import LottieAnimation from '@/components/ui/lottie-animation';

// Example animation data for loading state
const loadingAnimationData = {
  "v": "5.5.7",
  "fr": 60,
  "ip": 0,
  "op": 180,
  "w": 300,
  "h": 300,
  "nm": "Loading",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Circle",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { 
          "a": 1, 
          "k": [
            { "t": 0, "s": [0], "e": [360], "i": { "x": [0.5], "y": [0.5] }, "o": { "x": [0.5], "y": [0.5] } },
            { "t": 180, "s": [360] }
          ] 
        },
        "p": { "a": 0, "k": [150, 150, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [100, 100] },
              "p": { "a": 0, "k": [0, 0] }
            },
            {
              "ty": "st",
              "c": { "a": 0, "k": [0.2, 0.5, 0.9, 1] },
              "o": { "a": 0, "k": 100 },
              "w": { "a": 0, "k": 10 },
              "lc": 2,
              "lj": 1,
              "ml": 4,
              "bm": 0,
              "d": [
                { "n": "d", "nm": "dash", "v": { "a": 0, "k": 200 } },
                { "n": "g", "nm": "gap", "v": { "a": 0, "k": 160 } },
                { "n": "o", "nm": "offset", "v": { 
                  "a": 1, 
                  "k": [
                    { "t": 0, "s": [0], "e": [360], "i": { "x": [0.5], "y": [0.5] }, "o": { "x": [0.5], "y": [0.5] } },
                    { "t": 180, "s": [360] }
                  ] 
                } }
              ]
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0] },
              "a": { "a": 0, "k": [0, 0] },
              "s": { "a": 0, "k": [100, 100] },
              "r": { "a": 0, "k": 0 },
              "o": { "a": 0, "k": 100 }
            }
          ]
        }
      ]
    }
  ]
};

// Interface for the brand brief form
interface BrandBrief {
  name: string;
  industry: string;
  goal: string;
  description: string;
  targetAudience: string;
  style: string;
  colorPreference?: string;
}

// Interface for the branding result
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
  const [activeTab, setActiveTab] = useState<string>('brief');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [brandBrief, setBrandBrief] = useState<BrandBrief>({
    name: '',
    industry: '',
    goal: '',
    description: '',
    targetAudience: '',
    style: '',
    colorPreference: ''
  });
  const [brandingResult, setBrandingResult] = useState<BrandingResult | null>(null);

  // Helper to determine if form is valid
  const isFormValid = (): boolean => {
    return Boolean(
      brandBrief.name && 
      brandBrief.industry && 
      brandBrief.goal && 
      brandBrief.description && 
      brandBrief.targetAudience && 
      brandBrief.style
    );
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBrandBrief(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setBrandBrief(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form
  const handleReset = () => {
    setBrandBrief({
      name: '',
      industry: '',
      goal: '',
      description: '',
      targetAudience: '',
      style: '',
      colorPreference: ''
    });
  };

  // Generate brand identity using OpenAI
  const generateBrandIdentity = async () => {
    if (!isFormValid()) {
      toast({
        title: t('brandingWizard.errorTitle'),
        description: t('brandingWizard.missingFieldsError'),
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setActiveTab('results');

    try {
      // Call the API endpoint to generate the brand identity
      const response = await fetch('/api/generate-branding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(brandBrief)
      });

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      const result: BrandingResult = await response.json();
      setBrandingResult(result);
      
      toast({
        title: t('brandingWizard.successTitle'),
        description: t('brandingWizard.generationSuccess')
      });
    } catch (error) {
      console.error('Error generating brand identity:', error);
      toast({
        title: t('brandingWizard.errorTitle'),
        description: t('brandingWizard.generationError'),
        variant: "destructive"
      });
      setActiveTab('brief');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Tabs 
        defaultValue="brief" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="max-w-4xl mx-auto mt-8"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="brief" disabled={isGenerating}>
            {t('brandingWizard.briefTab')}
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!brandingResult && !isGenerating}>
            {t('brandingWizard.resultsTab')}
          </TabsTrigger>
        </TabsList>

        {/* BRIEF TAB */}
        <TabsContent value="brief" className="py-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t('brandingWizard.wizardTitle')}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t('brandingWizard.wizardDescription')}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Brand Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      {t('brandingWizard.nameLabel')} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={brandBrief.name}
                      onChange={handleInputChange}
                      placeholder={t('brandingWizard.namePlaceholder')}
                      required
                    />
                  </div>

                  {/* Industry */}
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-base">
                      {t('brandingWizard.industryLabel')} *
                    </Label>
                    <Select
                      value={brandBrief.industry}
                      onValueChange={(value) => handleSelectChange('industry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('brandingWizard.industryPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t('brandingWizard.industries', { returnObjects: true })).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Brand Purpose */}
                  <div className="space-y-2">
                    <Label htmlFor="goal" className="text-base">
                      {t('brandingWizard.goalLabel')} *
                    </Label>
                    <Textarea
                      id="goal"
                      name="goal"
                      value={brandBrief.goal}
                      onChange={handleInputChange}
                      placeholder={t('brandingWizard.goalPlaceholder')}
                      rows={3}
                      required
                    />
                  </div>

                  {/* Brand Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base">
                      {t('brandingWizard.descriptionLabel')} *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={brandBrief.description}
                      onChange={handleInputChange}
                      placeholder={t('brandingWizard.descriptionPlaceholder')}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Target Audience */}
                  <div className="space-y-2">
                    <Label htmlFor="targetAudience" className="text-base">
                      {t('brandingWizard.targetAudienceLabel')} *
                    </Label>
                    <Textarea
                      id="targetAudience"
                      name="targetAudience"
                      value={brandBrief.targetAudience}
                      onChange={handleInputChange}
                      placeholder={t('brandingWizard.targetAudiencePlaceholder')}
                      rows={3}
                      required
                    />
                  </div>

                  {/* Brand Style */}
                  <div className="space-y-2">
                    <Label htmlFor="style" className="text-base">
                      {t('brandingWizard.styleLabel')} *
                    </Label>
                    <Select
                      value={brandBrief.style}
                      onValueChange={(value) => handleSelectChange('style', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('brandingWizard.stylePlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t('brandingWizard.styles', { returnObjects: true })).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Color Preference */}
                  <div className="space-y-2">
                    <Label htmlFor="colorPreference" className="text-base">
                      {t('brandingWizard.colorPreferenceLabel')}
                    </Label>
                    <Input
                      id="colorPreference"
                      name="colorPreference"
                      value={brandBrief.colorPreference || ''}
                      onChange={handleInputChange}
                      placeholder={t('brandingWizard.colorPreferencePlaceholder')}
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                  >
                    {t('brandingWizard.resetButton')}
                  </Button>
                  <Button 
                    onClick={generateBrandIdentity} 
                    disabled={!isFormValid() || isGenerating}
                    className="bg-brand-blue hover:bg-brand-blue/90"
                  >
                    {t('brandingWizard.generateButton')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RESULTS TAB */}
        <TabsContent value="results" className="py-4">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12">
              <LottieAnimation 
                animationData={loadingAnimationData} 
                className="w-32 h-32 mb-4" 
                loop={true}
                autoplay={true}
              />
              <h3 className="text-xl font-semibold text-center mb-2">
                {t('brandingWizard.generatingButton')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                {t('brandingWizard.wizardDescription')}
              </p>
            </div>
          ) : brandingResult ? (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('brief')}
                >
                  <i className="ri-arrow-left-line mr-2"></i>
                  {t('brandingWizard.backButton')}
                </Button>
                <Button 
                  variant="default"
                  onClick={handleReset}
                  className="bg-brand-blue hover:bg-brand-blue/90"
                >
                  <i className="ri-refresh-line mr-2"></i>
                  {t('brandingWizard.startOverButton')}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Logo */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t('brandingWizard.logoResult')}</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center h-60">
                    {brandingResult.logo && (
                      <img 
                        src={brandingResult.logo} 
                        alt={`${brandBrief.name} Logo`} 
                        className="max-w-full max-h-full object-contain"
                      />
                    )}
                  </div>
                </Card>

                {/* Color Palette */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t('brandingWizard.colorPaletteResult')}</h3>
                  <div className="space-y-4">
                    {brandingResult.colorPalette && (
                      <div className="flex justify-center space-x-2">
                        {brandingResult.colorPalette.map((color, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className="w-12 h-12 rounded-md shadow-sm" 
                              style={{ backgroundColor: color }}
                            ></div>
                            <span className="text-xs mt-1">{color}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>

                {/* Typography */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t('brandingWizard.typographyResult')}</h3>
                  {brandingResult.typography && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          {t('brandingWizard.primaryFont')}
                        </h4>
                        <p className="text-xl" style={{ fontFamily: brandingResult.typography.primary }}>
                          {brandingResult.typography.primary}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          {t('brandingWizard.secondaryFont')}
                        </h4>
                        <p className="text-lg" style={{ fontFamily: brandingResult.typography.secondary }}>
                          {brandingResult.typography.secondary}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Illustration Style */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t('brandingWizard.illustrationStyleResult')}</h3>
                  {brandingResult.illustrationStyle && (
                    <p className="text-gray-700 dark:text-gray-300">
                      {brandingResult.illustrationStyle}
                    </p>
                  )}
                </Card>

                {/* Website Template */}
                <Card className="p-6 md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">{t('brandingWizard.websiteTemplateResult')}</h3>
                  {brandingResult.websiteTemplate && (
                    <p className="text-gray-700 dark:text-gray-300">
                      {brandingResult.websiteTemplate}
                    </p>
                  )}
                </Card>
              </div>

              <div className="flex justify-center space-x-4 mt-8">
                <Button variant="outline" className="w-48">
                  <i className="ri-download-line mr-2"></i>
                  Export Assets
                </Button>
                <Button className="w-48 bg-brand-blue hover:bg-brand-blue/90">
                  <i className="ri-edit-line mr-2"></i>
                  Edit in Editor
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                {t('brandingWizard.wizardDescription')}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIBrandingWizard;