import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          header: {
            features: 'Features',
            aiDemo: 'AI Demo',
            pricing: 'Pricing',
            testimonials: 'Testimonials',
            login: 'Log in',
            getStarted: 'Get Started',
            language: 'Language',
            darkMode: 'Switch to dark mode',
            lightMode: 'Switch to light mode'
          },
          hero: {
            launchingBadge: 'Launching UXerra 4.0',
            titleHighlight: 'AI-Powered',
            titleRest: 'Creative Platform for the Future',
            description: 'UXerra combines the power of AI with stunning design, automation, and multilingual capabilities to create the most inspirational digital experience.',
            tryAiDemo: 'Try AI Demo',
            exploreFeatures: 'Explore Features',
            userCount: '1,000+ users',
            rating: '5.0 rating'
          },
          features: {
            sectionTitle: 'Beyond Traditional Design Tools',
            sectionDescription: 'UXerra combines the best features of Figma, Webflow, Canva, and AI to create a truly unique creative platform.',
            learnMore: 'Learn more',
            aiContent: {
              title: 'AI Content Generation',
              description: 'Generate professional content, designs, and visuals with OpenAI-powered technology.'
            },
            multilingual: {
              title: 'Multilingual Support',
              description: 'Full support for English, Slovenian, German, and Spanish with intelligent translations.'
            },
            payments: {
              title: 'Secure Payments',
              description: 'Integrated Stripe payment system for secure, seamless subscriptions and purchases.'
            },
            newsletter: {
              title: 'Newsletter Automation',
              description: 'Automated email campaigns and newsletters with MailerLite integration.'
            },
            animation: {
              title: 'Real-Time Animation',
              description: 'GSAP-powered animations and interactive elements for engaging user experiences.'
            },
            seo: {
              title: 'SEO Optimization',
              description: 'Built-in SEO tools with schema.org, sitemaps, and metadata for maximum visibility.'
            }
          },
          aiDemo: {
            sectionTitle: {
              part1: 'Experience Our',
              part2: 'AI Power'
            },
            sectionDescription: 'See how UXerra\'s AI can transform your creative process with just a few clicks.',
            contentGenerator: 'AI Content Generator',
            contentDescription: 'Describe what you want to create and let our AI do the work.',
            contentType: 'Content Type',
            promptLabel: 'Your Prompt',
            promptPlaceholder: 'E.g., Create a hero section for a modern AI tool for designers...',
            toneLabel: 'Tone & Style',
            generateContent: 'Generate Content',
            generating: 'Generating...',
            generatedPreview: 'Generated Preview',
            regenerate: 'Regenerate',
            copy: 'Copy to clipboard',
            generatingContent: 'Generating your content...',
            noContentYet: 'No content generated yet',
            contentWillAppearHere: 'Your AI-generated content will appear here',
            errorTitle: 'Generation Error',
            emptyPromptError: 'Please enter a prompt before generating',
            generationError: 'Failed to generate content. Please try again.',
            successTitle: 'Success',
            contentGenerated: 'Content successfully generated',
            copied: 'Copied!',
            codeCopied: 'Code copied to clipboard',
            poweredBy: 'Powered by OpenAI API for accurate, creative results.'
          },
          pricing: {
            sectionTitle: 'Simple, Transparent Pricing',
            sectionDescription: 'Choose the perfect plan for your creative needs with our flexible pricing options.',
            popular: 'Popular',
            errorTitle: 'Checkout Error',
            checkoutError: 'There was an error starting the checkout process. Please try again.',
            trialInfo: 'All plans include a 14-day free trial. No credit card required.',
            free: {
              title: 'Free',
              description: 'Perfect for trying out UXerra.',
              buttonText: 'Get Started',
              features: {
                basic: 'Basic AI content generation',
                exports: 'Limited exports',
                support: 'Email support'
              }
            },
            pro: {
              title: 'Pro',
              description: 'For professional creators and teams.',
              buttonText: 'Get Started',
              features: {
                unlimited: 'Unlimited AI content generation',
                exports: 'All export options included',
                multilingual: 'Multilingual support',
                seo: 'SEO optimization tools',
                support: 'Priority email & chat support'
              }
            },
            agency: {
              title: 'Agency',
              description: 'For teams and large projects.',
              buttonText: 'Contact Sales',
              features: {
                everything: 'Everything in Pro plan',
                team: 'Team collaboration tools',
                whiteLabel: 'White-label exports',
                api: 'API access',
                dedicated: 'Dedicated account manager'
              }
            }
          },
          testimonials: {
            sectionTitle: 'Loved by Creators Worldwide',
            sectionDescription: 'See what our users are saying about UXerra\'s transformative impact on their creative process.',
            sarah: {
              quote: 'UXerra has completely transformed our design process. The AI-powered features have saved us countless hours, and the multilingual support has helped us expand to new markets.',
              name: 'Sarah J.',
              role: 'Creative Director',
              company: 'DesignHub'
            },
            mike: {
              quote: 'As a freelancer, UXerra has been a game-changer. I can now deliver high-quality designs and content much faster, which has helped me take on more clients and increase my revenue.',
              name: 'Mike T.',
              role: 'Freelance UI/UX Designer',
              company: ''
            },
            elena: {
              quote: 'The SEO features in UXerra have significantly improved our online visibility. Combined with the AI content generation, we\'ve seen a 200% increase in organic traffic to our website.',
              name: 'Elena M.',
              role: 'Marketing Manager',
              company: 'TechStart'
            }
          },
          cta: {
            title: 'Ready to Transform Your Creative Process?',
            description: 'Join thousands of creators and teams who are using UXerra to build better, faster, and smarter.',
            primaryButton: 'Get Started Free',
            secondaryButton: 'Schedule a Demo'
          },
          footer: {
            description: 'The AI-powered creative platform for the future of design and digital experiences.',
            platform: 'Platform',
            features: 'Features',
            pricing: 'Pricing',
            aiDemo: 'AI Demo',
            marketplace: 'Marketplace',
            api: 'API',
            resources: 'Resources',
            documentation: 'Documentation',
            tutorials: 'Tutorials',
            blog: 'Blog',
            caseStudies: 'Case Studies',
            support: 'Support',
            company: 'Company',
            about: 'About',
            careers: 'Careers',
            contact: 'Contact',
            privacy: 'Privacy',
            terms: 'Terms',
            allRightsReserved: 'All rights reserved.',
            privacyPolicy: 'Privacy Policy',
            termsOfService: 'Terms of Service',
            cookies: 'Cookies'
          },
          leadMagnet: {
            title: 'Stay Updated',
            description: 'Subscribe to our newsletter for the latest updates on AI-powered design tools and exclusive content.',
            emailPlaceholder: 'Your email address',
            subscribe: 'Subscribe',
            subscribing: 'Subscribing...',
            privacyNotice: 'We respect your privacy and never share your details.',
            invalidEmail: 'Invalid Email',
            pleaseEnterValidEmail: 'Please enter a valid email address.',
            success: 'Subscription Successful',
            subscriptionConfirmation: 'Thank you for subscribing to our newsletter!',
            error: 'Subscription Error',
            subscriptionError: 'There was an error subscribing. Please try again.'
          },
          pricingPage: {
            title: 'Choose Your Plan',
            description: 'Find the perfect UXerra plan for your creative needs with our transparent pricing options.',
            faqTitle: 'Frequently Asked Questions',
            faq: {
              question1: 'Can I upgrade or downgrade my plan at any time?',
              answer1: 'Yes, you can change your plan at any time. If you upgrade, you\'ll be charged the prorated difference. If you downgrade, the new rate will apply at the start of your next billing cycle.',
              question2: 'What payment methods do you accept?',
              answer2: 'We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also support payment via PayPal.',
              question3: 'Is there a limit to AI content generation?',
              answer3: 'Free plans have a limit of 5 AI generations per day. Pro plans offer unlimited AI content generation. Agency plans include unlimited AI generations plus priority processing.',
              question4: 'Do you offer custom enterprise solutions?',
              answer4: 'Yes, we offer custom enterprise solutions for larger organizations with specific needs. Please contact our sales team for more information and pricing.'
            }
          },
          aiDemoPage: {
            titleHighlight: 'Experience',
            titleRest: 'the Power of UXerra AI',
            description: 'See how our AI can transform your creative process and help you build better digital experiences.',
            capabilitiesTitle: 'What UXerra AI Can Do',
            upgradeButton: 'Upgrade for Full Access',
            capabilities: {
              content: {
                title: 'Content Generation',
                description: 'Create professional copy, headlines, descriptions, and stories tailored to your brand and audience.'
              },
              code: {
                title: 'Code Generation',
                description: 'Generate clean, semantic HTML, CSS, and JavaScript code that you can use directly in your projects.'
              },
              images: {
                title: 'Visual Elements',
                description: 'Create custom visual elements, layouts, and design recommendations that match your brand identity.'
              },
              translation: {
                title: 'Multilingual Support',
                description: 'Instantly translate your content while preserving tone, style, and context for global audiences.'
              }
            }
          }
        }
      },
      sl: {
        translation: {
          header: {
            features: 'Funkcije',
            aiDemo: 'AI Demo',
            pricing: 'Cenik',
            testimonials: 'Mnenja',
            login: 'Prijava',
            getStarted: 'Začni zdaj',
            language: 'Jezik',
            darkMode: 'Preklopi na temni način',
            lightMode: 'Preklopi na svetli način'
          },
          hero: {
            launchingBadge: 'Predstavljamo UXerra 4.0',
            titleHighlight: 'AI-pogonjena',
            titleRest: 'kreativna platforma prihodnosti',
            description: 'UXerra združuje moč umetne inteligence z osupljivim dizajnom, avtomatizacijo in večjezičnimi zmožnostmi za ustvarjanje najbolj navdihujoče digitalne izkušnje.',
            tryAiDemo: 'Preizkusi AI Demo',
            exploreFeatures: 'Razišči funkcije',
            userCount: 'Več kot 1.000 uporabnikov',
            rating: 'Ocena 5.0'
          },
          /* Rest of Slovenian translations would go here - abbreviated for brevity */
          footer: {
            description: 'Z AI pogonjena kreativna platforma za prihodnost oblikovanja in digitalnih izkušenj.',
            platform: 'Platforma',
            features: 'Funkcije',
            pricing: 'Cenik',
            aiDemo: 'AI Demo',
            marketplace: 'Tržnica',
            api: 'API',
            resources: 'Viri',
            documentation: 'Dokumentacija',
            tutorials: 'Vodniki',
            blog: 'Blog',
            caseStudies: 'Študije primerov',
            support: 'Podpora',
            company: 'Podjetje',
            about: 'O nas',
            careers: 'Zaposlitve',
            contact: 'Kontakt',
            privacy: 'Zasebnost',
            terms: 'Pogoji',
            allRightsReserved: 'Vse pravice pridržane.',
            privacyPolicy: 'Politika zasebnosti',
            termsOfService: 'Pogoji uporabe',
            cookies: 'Piškotki'
          }
        }
      },
      de: {
        translation: {
          header: {
            features: 'Funktionen',
            aiDemo: 'KI Demo',
            pricing: 'Preise',
            testimonials: 'Testimonials',
            login: 'Anmelden',
            getStarted: 'Loslegen',
            language: 'Sprache',
            darkMode: 'Zum dunklen Modus wechseln',
            lightMode: 'Zum hellen Modus wechseln'
          },
          /* Rest of German translations would go here - abbreviated for brevity */
          footer: {
            description: 'Die KI-gestützte kreative Plattform für die Zukunft des Designs und digitaler Erlebnisse.',
            platform: 'Plattform',
            features: 'Funktionen',
            pricing: 'Preise',
            aiDemo: 'KI Demo',
            marketplace: 'Marktplatz',
            api: 'API',
            resources: 'Ressourcen',
            documentation: 'Dokumentation',
            tutorials: 'Tutorials',
            blog: 'Blog',
            caseStudies: 'Fallstudien',
            support: 'Support',
            company: 'Unternehmen',
            about: 'Über uns',
            careers: 'Karriere',
            contact: 'Kontakt',
            privacy: 'Datenschutz',
            terms: 'Nutzungsbedingungen',
            allRightsReserved: 'Alle Rechte vorbehalten.',
            privacyPolicy: 'Datenschutzrichtlinie',
            termsOfService: 'Nutzungsbedingungen',
            cookies: 'Cookies'
          }
        }
      },
      es: {
        translation: {
          header: {
            features: 'Características',
            aiDemo: 'Demo de IA',
            pricing: 'Precios',
            testimonials: 'Testimonios',
            login: 'Iniciar sesión',
            getStarted: 'Comenzar',
            language: 'Idioma',
            darkMode: 'Cambiar a modo oscuro',
            lightMode: 'Cambiar a modo claro'
          },
          /* Rest of Spanish translations would go here - abbreviated for brevity */
          footer: {
            description: 'La plataforma creativa impulsada por IA para el futuro del diseño y las experiencias digitales.',
            platform: 'Plataforma',
            features: 'Características',
            pricing: 'Precios',
            aiDemo: 'Demo de IA',
            marketplace: 'Mercado',
            api: 'API',
            resources: 'Recursos',
            documentation: 'Documentación',
            tutorials: 'Tutoriales',
            blog: 'Blog',
            caseStudies: 'Casos de estudio',
            support: 'Soporte',
            company: 'Empresa',
            about: 'Acerca de',
            careers: 'Carreras',
            contact: 'Contacto',
            privacy: 'Privacidad',
            terms: 'Términos',
            allRightsReserved: 'Todos los derechos reservados.',
            privacyPolicy: 'Política de privacidad',
            termsOfService: 'Términos de servicio',
            cookies: 'Cookies'
          }
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
