
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { getEventRecommendations } from '../services/geminiService';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const EventPlannerAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Здравствуйте! Я ваш ИИ-помощник EventLux. Опишите событие вашей мечты, и я подберу лучшие сценарии и площадки.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const botResponse = await getEventRecommendations(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setLoading(false);
  };

  return (
    <section id="planner" className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-3xl bg-indigo-600/20 mb-4 border border-indigo-500/20">
            <Bot className="w-12 h-12 text-indigo-400" />
          </div>
          <h2 className="text-4xl font-bold text-white font-serif mb-4">Интеллектуальный архитектор событий</h2>
          <p className="text-slate-400">Доверьте подбор Искусственному Интеллекту</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-700 overflow-hidden flex flex-col h-[600px] shadow-2xl">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-start gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-xl shrink-0 ${m.role === 'user' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                  {m.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-indigo-400" />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-slate-700/50 text-slate-100 border border-slate-600/50 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl shrink-0 bg-slate-700">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="bg-slate-700/50 p-4 rounded-2xl rounded-tl-none border border-slate-600/50">
                  <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-800 border-t border-slate-700">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Например: Свадьба на 50 человек в современном стиле..."
                className="w-full bg-slate-900 text-white rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all border border-slate-700"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="absolute right-3 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -ml-64 -mb-64" />
    </section>
  );
};

export default EventPlannerAI;
