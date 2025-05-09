import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, role, company, image, index }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex text-yellow-400 mb-4">
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        "{quote}"
      </p>
      <div className="flex items-center">
        <img src={image} alt={name} className="w-10 h-10 rounded-full mr-3 object-cover" />
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}, {company}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();
  
  const testimonials = [
    {
      quote: t('testimonials.sarah.quote'),
      name: t('testimonials.sarah.name'),
      role: t('testimonials.sarah.role'),
      company: t('testimonials.sarah.company'),
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    },
    {
      quote: t('testimonials.mike.quote'),
      name: t('testimonials.mike.name'),
      role: t('testimonials.mike.role'),
      company: t('testimonials.mike.company'),
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    },
    {
      quote: t('testimonials.elena.quote'),
      name: t('testimonials.elena.name'),
      role: t('testimonials.elena.role'),
      company: t('testimonials.elena.company'),
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('testimonials.sectionTitle')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('testimonials.sectionDescription')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              index={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
