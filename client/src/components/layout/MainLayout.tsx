import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'sl', name: 'Slovenščina' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'zh', name: '中文' },
];

const menuItems = [
  {
    title: 'Create',
    items: [
      { title: 'AI Branding Wizard', href: '/create/branding' },
      { title: 'AI Page Builder', href: '/create/page-builder' },
      { title: 'AI Content Wizard', href: '/create/content' },
      { title: 'Template Builder', href: '/create/templates' },
    ],
  },
  {
    title: 'Explore',
    items: [
      { title: 'Templates Gallery', href: '/explore/templates' },
      { title: 'UI Components', href: '/explore/components' },
      { title: 'Design Resources', href: '/explore/resources' },
      { title: 'Showcase', href: '/explore/showcase' },
    ],
  },
  {
    title: 'Hire',
    items: [
      { title: 'Find Experts', href: '/hire/experts' },
      { title: 'Post a Project', href: '/hire/post-project' },
      { title: 'Expert Profiles', href: '/hire/profiles' },
      { title: 'Success Stories', href: '/hire/success' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { title: 'Documentation', href: '/resources/docs' },
      { title: 'Tutorials', href: '/resources/tutorials' },
      { title: 'Blog', href: '/resources/blog' },
      { title: 'Community', href: '/resources/community' },
    ],
  },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-300',
          isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        )}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold">
              UXerra
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <div key={item.title} className="relative group">
                  <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    {t(item.title)}
                  </button>
                  <div className="absolute top-full left-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-background/95 backdrop-blur-lg rounded-lg shadow-xl p-4">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors"
                      >
                        {t(subItem.title)}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative group">
                <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                  <Globe className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-background/95 backdrop-blur-lg rounded-lg shadow-xl p-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => i18n.changeLanguage(lang.code)}
                      className={cn(
                        'w-full text-left px-4 py-2 text-sm rounded-md transition-colors',
                        i18n.language === lang.code
                          ? 'bg-primary/20 text-primary'
                          : 'hover:bg-primary/10'
                      )}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-primary/10 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background/95 backdrop-blur-lg"
            >
              <div className="container mx-auto px-4 py-4">
                {menuItems.map((item) => (
                  <div key={item.title} className="py-2">
                    <h3 className="font-medium mb-2">{t(item.title)}</h3>
                    {item.items.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t(subItem.title)}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-20">{children}</main>

      <footer className="bg-background/80 backdrop-blur-lg border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">UXerra</h3>
              <p className="text-sm text-muted-foreground">
                {t('The world\'s most advanced AI-powered design platform')}
              </p>
            </div>
            {menuItems.map((item) => (
              <div key={item.title}>
                <h3 className="font-medium mb-4">{t(item.title)}</h3>
                <ul className="space-y-2">
                  {item.items.map((subItem) => (
                    <li key={subItem.title}>
                      <a
                        href={subItem.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {t(subItem.title)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} UXerra. {t('All rights reserved')}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 