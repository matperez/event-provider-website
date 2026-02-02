
import React from 'react';
import { VENUES } from '../constants';
import { Users, Eye, Banknote } from 'lucide-react';
import { Venue } from '../types';

interface VenuesProps {
  onSelect: (venue: Venue) => void;
}

const Venues: React.FC<VenuesProps> = ({ onSelect }) => {
  return (
    <section id="venues" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 font-serif mb-4">Наши площадки</h2>
          <p className="text-slate-600 max-w-xl">У нас эксклюзивные договоренности с лучшими локациями. Никаких наценок за аренду.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VENUES.map((venue) => (
            <div 
              key={venue.id} 
              className="group flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer"
              onClick={() => onSelect(venue)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={venue.imageUrl} 
                  alt={venue.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {venue.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                     <Eye className="w-4 h-4" />
                     Подробнее
                   </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{venue.name}</h3>
                  <div className="flex items-center gap-1 text-slate-500 font-medium">
                    <Users className="w-4 h-4" />
                    <span>до {venue.capacity}</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 flex-1 leading-relaxed line-clamp-2">
                  {venue.description}
                </p>
                
                <div className="flex items-center gap-2 mb-6 text-xs font-bold text-indigo-600/70 bg-indigo-50 w-fit px-3 py-1.5 rounded-lg border border-indigo-100">
                  <Banknote className="w-3.5 h-3.5" />
                  <span>~{Math.round(venue.pricePerDay / venue.capacity).toLocaleString('ru-RU')} ₽ / чел</span>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-auto">
                  <div>
                    <span className="text-sm text-slate-500 block">Аренда</span>
                    <span className="text-2xl font-black text-indigo-600">{venue.pricePerDay.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <button className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition-colors text-sm">
                    Смотреть
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Venues;
