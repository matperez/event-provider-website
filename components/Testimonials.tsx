
import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-slate-900 font-serif mb-4">Отзывы наших клиентов</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Истории о моментах, которые мы создали вместе. Ваше доверие — наша главная награда.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-50/50 flex flex-col"
            >
              <div className="mb-6 flex justify-between items-start">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-indigo-600 text-indigo-600" />
                  ))}
                </div>
                <Quote className="w-10 h-10 text-indigo-100" />
              </div>

              <p className="text-slate-700 leading-relaxed mb-8 flex-1 italic text-lg">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                <img 
                  src={testimonial.avatarUrl} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{testimonial.author}</h4>
                  <p className="text-xs text-slate-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />
    </section>
  );
};

export default Testimonials;
