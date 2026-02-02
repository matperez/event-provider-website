
import React, { useState, useMemo } from 'react';
import { SCENARIOS } from '../constants';
import { Clock, Tag, Eye, Filter } from 'lucide-react';
import { Scenario } from '../types';

interface ScenariosProps {
  onSelect: (scenario: Scenario) => void;
}

type FilterCategory = Scenario['category'] | 'All';

const Scenarios: React.FC<ScenariosProps> = ({ onSelect }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');

  const categories: { label: string; value: FilterCategory }[] = [
    { label: 'Все', value: 'All' },
    { label: 'Корпоративы', value: 'Corporate' },
    { label: 'Свадьбы', value: 'Wedding' },
    { label: 'Дни рождения', value: 'Birthday' },
    { label: 'Вечеринки', value: 'Social' },
  ];

  const filteredScenarios = useMemo(() => {
    if (activeCategory === 'All') return SCENARIOS;
    return SCENARIOS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="scenarios" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-slate-900 font-serif mb-4">Готовые сценарии</h2>
          <p className="text-slate-600 max-w-xl mx-auto italic mb-10">
            Всё продумано до мелочей: от тайминга до декора. Просто выберите атмосферу.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="flex items-center gap-2 mr-4 text-slate-400">
              <Filter className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Фильтр:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                  activeCategory === cat.value
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredScenarios.length > 0 ? (
            filteredScenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="relative group bg-white rounded-[2rem] p-4 border border-slate-200 hover:border-indigo-300 transition-all shadow-sm cursor-pointer animate-in fade-in duration-500"
                onClick={() => onSelect(scenario)}
              >
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={scenario.imageUrl}
                    alt={scenario.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="w-4 h-4 text-indigo-300" />
                      <span className="text-xs font-bold uppercase tracking-widest">{scenario.duration}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white text-indigo-900 p-3 rounded-full shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-3 h-3 text-indigo-600" />
                    <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider bg-indigo-50 px-2 py-1 rounded">
                      {scenario.category === 'Corporate'
                        ? 'Корпоратив'
                        : scenario.category === 'Wedding'
                        ? 'Свадьба'
                        : scenario.category === 'Birthday'
                        ? 'День Рождения'
                        : 'Событие'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{scenario.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2">
                    {scenario.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">На человека</span>
                      <span className="text-xl font-black text-slate-900">{scenario.pricePerPerson} ₽</span>
                    </div>
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-100">
                      Детали
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">Нет мероприятий в данной категории.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Scenarios;
