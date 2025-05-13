import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bot, Send } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function AIDemoPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { role: 'system', content: t('aiDemo.welcome', 'Pozdravljeni v AI demo! Vprašajte karkoli ...') },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setLoading(true);
    // Placeholder for OpenAI integration
    setTimeout(() => {
      setMessages(msgs => [...msgs, { role: 'assistant', content: t('aiDemo.placeholder', 'To je AI demo odgovor. (Integriraj OpenAI API za pravo izkušnjo)') }]);
      setLoading(false);
    }, 1000);
    setInput('');
  };

  return (
    <main className="container mx-auto py-16 px-4 max-w-2xl">
      <h1 className="text-4xl font-display font-bold mb-8 text-uxblue text-center flex items-center justify-center gap-2">
        <Bot className="w-8 h-8 text-uxorange" /> {t('aiDemo.title', 'AI Demo')}
      </h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-ux p-6 mb-6 min-h-[300px] flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-uxblue text-white' : 'bg-gray-100 dark:bg-gray-800 text-foreground'}`}>{msg.content}</div>
          </div>
        ))}
        {loading && <div className="text-muted-foreground text-sm">{t('aiDemo.loading', 'AI razmišlja ...')}</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-uxblue"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t('aiDemo.placeholderInput', 'Vpiši vprašanje ...')}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          disabled={loading}
        />
        <Button onClick={handleSend} disabled={loading || !input.trim()} className="bg-uxorange text-white px-4 py-2 rounded-lg">
          <Send className="w-5 h-5" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">{t('aiDemo.note', 'Ta demo je pripravljen za integracijo z OpenAI API.')}</p>
    </main>
  );
} 