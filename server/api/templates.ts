import * as z from 'zod';

// Mock data for templates
const templates = [
  {
    id: '1',
    title: 'Modern Business Website',
    description: 'A clean and professional website template for businesses',
    category: 'Website',
    thumbnail: '/templates/website-1.jpg',
    likes: 245,
    downloads: 1234,
    tags: ['Business', 'Modern', 'Responsive'],
  },
  {
    id: '2',
    title: 'Minimalist Logo Pack',
    description: 'A collection of minimalist logo designs',
    category: 'Logo',
    thumbnail: '/templates/logo-1.jpg',
    likes: 189,
    downloads: 856,
    tags: ['Minimalist', 'Logo', 'Branding'],
  },
  {
    id: '3',
    title: 'Social Media Kit',
    description: 'Complete social media template pack',
    category: 'Social Media',
    thumbnail: '/templates/social-1.jpg',
    likes: 312,
    downloads: 1567,
    tags: ['Social Media', 'Marketing', 'Instagram'],
  },
  // Add more templates as needed
];

const querySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['popular', 'newest', 'downloads']).optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = querySchema.parse({
      category: searchParams.get('category'),
      search: searchParams.get('search'),
      sort: searchParams.get('sort'),
    });

    let filteredTemplates = [...templates];

    // Apply category filter
    if (query.category && query.category !== 'All') {
      filteredTemplates = filteredTemplates.filter(
        (template) => template.category === query.category
      );
    }

    // Apply search filter
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredTemplates = filteredTemplates.filter(
        (template) =>
          template.title.toLowerCase().includes(searchLower) ||
          template.description.toLowerCase().includes(searchLower) ||
          template.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    if (query.sort) {
      switch (query.sort) {
        case 'popular':
          filteredTemplates.sort((a, b) => b.likes - a.likes);
          break;
        case 'downloads':
          filteredTemplates.sort((a, b) => b.downloads - a.downloads);
          break;
        case 'newest':
          // Assuming templates are already sorted by newest
          break;
      }
    }

    return new Response(
      JSON.stringify(filteredTemplates),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching templates:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch templates' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 