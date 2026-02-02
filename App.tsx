
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Venues from './components/Venues';
import Scenarios from './components/Scenarios';
import EventPlannerAI from './components/EventPlannerAI';
import Testimonials from './components/Testimonials';
import DetailsPage from './components/DetailsPage';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { Venue, Scenario } from './types';

type ViewState = {
  type: 'home' | 'venue' | 'scenario';
  item?: Venue | Scenario;
};

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'home' });

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewState]);

  const handleGoHome = () => setViewState({ type: 'home' });
  const handleSelectVenue = (venue: Venue) => setViewState({ type: 'venue', item: venue });
  const handleSelectScenario = (scenario: Scenario) => setViewState({ type: 'scenario', item: scenario });

  if (viewState.type !== 'home' && viewState.item) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-600">
        <Header onGoHome={handleGoHome} />
        <DetailsPage 
          item={viewState.item} 
          type={viewState.type as 'venue' | 'scenario'} 
          onBack={handleGoHome} 
        />
        <footer className="bg-slate-50 pt-20 pb-12 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-xs">
            © 2024 EventLux Agency. Все права защищены.
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-600">
      <Header onGoHome={handleGoHome} />
      
      <main>
        <Hero />
        
        {/* Statistics or Trust section */}
        <section className="bg-white py-12 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-indigo-600 mb-1">500+</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Мероприятий</div>
            </div>
            <div>
              <div className="text-4xl font-black text-indigo-600 mb-1">12</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Площадок</div>
            </div>
            <div>
              <div className="text-4xl font-black text-indigo-600 mb-1">98%</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-4xl font-black text-indigo-600 mb-1">24/7</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Поддержка</div>
            </div>
          </div>
        </section>

        <Venues onSelect={handleSelectVenue} />
        <Scenarios onSelect={handleSelectScenario} />
        <EventPlannerAI />
        <Testimonials />
        
        {/* Newsletter/Contact Section */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold text-white font-serif mb-6 italic">Готовы создать нечто <br />удивительное?</h2>
               <p className="text-indigo-100 mb-10 text-lg max-w-xl mx-auto">Оставьте заявку, и наш менеджер свяжется с вами в течение 15 минут для обсуждения деталей.</p>
               <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                 <input 
                   type="email" 
                   placeholder="Ваша почта" 
                   className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-indigo-200 outline-none focus:bg-white/20 transition-all"
                 />
                 <button className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-2xl hover:bg-slate-50 transition-colors">
                   Отправить
                 </button>
               </div>
             </div>
             
             {/* Abstract Circles */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl" />
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full -ml-24 -mb-24 blur-2xl" />
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 pt-20 pb-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-serif">EventLux</span>
               </div>
               <p className="text-slate-500 text-sm leading-relaxed mb-6">
                 Мы — команда профессионалов, которые верят, что каждое событие заслуживает быть уникальным.
               </p>
               <div className="flex gap-4">
                 <a href="#" className="p-3 bg-white rounded-xl text-slate-400 hover:text-indigo-600 transition-colors border border-slate-200"><Instagram className="w-5 h-5" /></a>
                 <a href="#" className="p-3 bg-white rounded-xl text-slate-400 hover:text-indigo-600 transition-colors border border-slate-200"><Facebook className="w-5 h-5" /></a>
               </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Навигация</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#venues" className="hover:text-indigo-600">Площадки</a></li>
                <li><a href="#scenarios" className="hover:text-indigo-600">Сценарии</a></li>
                <li><a href="#planner" className="hover:text-indigo-600">ИИ-Планировщик</a></li>
                <li><a href="#testimonials" className="hover:text-indigo-600">Отзывы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Помощь</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">FAQ</a></li>
                <li><a href="#" className="hover:text-indigo-600">Оплата и возврат</a></li>
                <li><a href="#" className="hover:text-indigo-600">Политика конфиденциальности</a></li>
                <li><a href="#" className="hover:text-indigo-600">Договор оферты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Контакты</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> +7 (999) 000-00-00</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> hello@eventlux.ru</li>
                <li className="pt-4 italic">Москва, ул. Тверская, 7, офис 12</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
            © 2024 EventLux Agency. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
