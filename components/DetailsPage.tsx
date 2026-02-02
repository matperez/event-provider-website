
import React, { useState } from 'react';
import { ArrowLeft, Clock, Users, Star, Quote, CreditCard, CheckCircle, Calculator } from 'lucide-react';
import { Venue, Scenario, Testimonial } from '../types';
import { TESTIMONIALS } from '../constants';

interface DetailsPageProps {
  item: Venue | Scenario;
  type: 'venue' | 'scenario';
  onBack: () => void;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ item, type, onBack }) => {
  const [guests, setGuests] = useState<number>(20);
  const isVenue = (it: any): it is Venue => type === 'venue';
  const relatedReviews = TESTIMONIALS.filter(t => t.relatedId === item.id);

  const calculatePrice = () => {
    if (isVenue(item)) {
      return {
        total: item.pricePerDay,
        perPerson: Math.round(item.pricePerDay / (guests || 1))
      };
    } else {
      const scenario = item as Scenario;
      return {
        total: scenario.pricePerPerson * guests,
        perPerson: scenario.pricePerPerson
      };
    }
  };

  const prices = calculatePrice();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={(item as Venue).name || (item as Scenario).title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all z-20 flex items-center gap-2 font-bold text-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад
        </button>

        <div className="absolute bottom-12 left-0 w-full">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                    {type === 'venue' ? 'Площадка' : 'Сценарий'}
                  </span>
                  {isVenue(item) && item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white font-serif mb-4 leading-tight">
                  {(item as Venue).name || (item as Scenario).title}
                </h1>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl min-w-[340px] border border-slate-100 translate-y-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <Calculator className="w-5 h-5 text-indigo-600" />
                  <span className="font-bold text-slate-900">Калькулятор события</span>
                </div>

                <div className="mb-6">
                  <label className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">Количество гостей</label>
                  <input 
                    type="number" 
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                  />
                  {isVenue(item) && guests > item.capacity && (
                    <span className="text-[10px] text-red-500 font-bold mt-1 block">Превышает вместимость ({item.capacity} чел.)</span>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Итого:</span>
                    <span className="text-2xl font-black text-slate-900">{prices.total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-indigo-50 rounded-lg">
                    <span className="text-indigo-700 text-xs font-bold">За одного участника:</span>
                    <span className="text-lg font-black text-indigo-600">{prices.perPerson.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {isVenue(item) ? (
                    <div className="flex items-center gap-3 text-slate-600">
                      <Users className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-medium">Вместимость до {item.capacity} чел.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-slate-600">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-medium">Длительность {(item as Scenario).duration}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-slate-600">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-medium">Все включено "под ключ"</span>
                  </div>
                </div>
                <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Забронировать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="py-24 bg-slate-50 pt-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 font-serif mb-2">Отзывы об этом {type === 'venue' ? 'месте' : 'событии'}</h2>
              <p className="text-slate-500">Мнения реальных клиентов, которые уже провели мероприятие у нас.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-6 py-3 bg-white rounded-2xl border border-slate-200">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-slate-900">4.9 / 5.0</span>
              <span className="text-slate-400 text-sm">(на основе {relatedReviews.length + 12} отзывов)</span>
            </div>
          </div>

          {relatedReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedReviews.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative">
                  <Quote className="absolute top-6 right-8 w-12 h-12 text-indigo-50" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-indigo-600 text-indigo-600" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-lg italic mb-8 relative z-10">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{testimonial.author}</h4>
                      <p className="text-xs text-slate-500 uppercase font-black">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
               <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-slate-400" />
               </div>
               <p className="text-slate-400 font-medium">Пока нет подробных текстовых отзывов именно об этом {type === 'venue' ? 'месте' : 'сценарии'}. <br/> Будьте первыми!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DetailsPage;
