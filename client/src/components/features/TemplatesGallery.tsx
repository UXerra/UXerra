import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Grid, List, Heart, Download } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  likes: number;
  downloads: number;
  tags: string[];
}

const categories = [
  'All',
  'Website',
  'Logo',
  'Social Media',
  'Presentation',
  'Print',
  'UI Kit',
];

export function TemplatesGallery() {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates');
        const data = await response.json();
        setTemplates(data);
        setFilteredTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    let filtered = templates;

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((template) => template.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (template) =>
          template.title.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredTemplates(filtered);
  }, [templates, selectedCategory, searchQuery]);

  const handleLike = async (templateId: string) => {
    // TODO: Implement like functionality
    console.log('Like template:', templateId);
  };

  const handleDownload = async (templateId: string) => {
    // TODO: Implement download functionality
    console.log('Download template:', templateId);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('Template Gallery')}
        </h2>
        <p className="text-xl text-muted-foreground">
          {t('Browse and download professional design templates')}
        </p>
      </motion.div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('Search templates...')}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-background border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full ${
                viewMode === 'grid'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary/10 text-primary'
              } hover:bg-primary/20 transition-colors`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full ${
                viewMode === 'list'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary/10 text-primary'
              } hover:bg-primary/20 transition-colors`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid/List */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          </div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={viewMode === 'grid' ? 'grid md:grid-cols-3 gap-6' : 'space-y-4'}
          >
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-card rounded-xl overflow-hidden shadow-lg ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={viewMode === 'list' ? 'w-48' : 'aspect-video'}>
                  <img
                    src={template.thumbnail}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-semibold mb-2">{template.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button
                        onClick={() => handleLike(template.id)}
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        {template.likes}
                      </button>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {template.downloads}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(template.id)}
                      className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      {t('Download')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 