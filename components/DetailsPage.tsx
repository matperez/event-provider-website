
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Star, Quote, CreditCard, CheckCircle, Calculator, User as UserIcon, Phone, Mail, MessageSquare, Sparkles, Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Search } from 'lucide-react';
import { Venue, Scenario, Booking } from '../types';
import { TESTIMONIALS, VENUES, SCENARIOS } from '../constants';

interface DetailsPageProps {
  item: Venue | Scenario;
  type: 'venue' | 'scenario';
  onBack: () => void;
  onBookingSubmit: (booking: Booking) => void;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ item, type, onBack, onBookingSubmit }) => {
  const isVenue = (it: any): it is Venue => type === 'venue';
  
  const [guests, setGuests] = useState<number>(isVenue(item) ? Math.min(20, item.capacity) : 20);
  const [selectedPartner, setSelectedPartner] = useState<Venue | Scenario | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    wishes: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const relatedReviews = TESTIMONIALS.filter(t => t.relatedId === item.id);
  
  // Potential partners (if it's a venue, show scenarios; if it's a scenario, show venues)
  const partners = isVenue(item) ? SCENARIOS : VENUES;

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculatePrice = () => {
    let total = 0;
    let perPerson = 0;

    if (isVenue(item)) {
      total += item.pricePerDay;
      if (selectedPartner) {
        total += (selectedPartner as Scenario).pricePerPerson * guests;
      }
      perPerson = Math.round(total / (guests || 1));
    } else {
      const scenario = item as Scenario;
      total += scenario.pricePerPerson * guests;
      if (selectedPartner) {
        total += (selectedPartner as Venue).pricePerDay;
      }
      perPerson = Math.round(total / (guests || 1));
    }

    return { total, perPerson };
  };

  const prices = calculatePrice();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date) return;
    
    const combinedName = selectedPartner 
      ? (isVenue(item) ? `${item.name} + ${(selectedPartner as Scenario).title}` : `${(item as Scenario).title} @ ${(selectedPartner as Venue).name}`)
      : (isVenue(item) ? item.name : (item as Scenario).title);

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      itemId: item.id,
      itemName: combinedName,
      itemType: type,
      date: formData.date,
      guests: guests,
      totalPrice: prices.total,
      contactName: formData.name,
      phone: formData.phone,
      email: formData.email,
      wishes: formData.wishes,
      status: 'Pending'
    };
    onBookingSubmit(newBooking);
    setIsSuccess(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  // Calendar logic
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = daysInMonth(year, month);
    const startDay = (firstDayOfMonth(year, month) + 6) % 7;
    const calendarDays = [];

    for (let i = 0; i < startDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    for (let d = 1; d <= days; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSelected = formData.date === dateStr;
      const isToday = new Date().toISOString().split('T')[0] === dateStr;
      const isPast = new Date(dateStr) < new Date(new Date().setHours(0,0,0,0));

      calendarDays.push(
        <button
          key={d}
          type="button"
          disabled={isPast}
          onClick={() => {
            setFormData(prev => ({ ...prev, date: dateStr }));
            setIsCalendarOpen(false);
          }}
          className={`h-10 w-10 rounded-full text-xs font-bold transition-all flex items-center justify-center
            ${isSelected ? 'bg-indigo-600 text-white shadow-lg' : isToday ? 'text-indigo-600 ring-1 ring-indigo-200' : 'text-slate-600 hover:bg-slate-100'}
            ${isPast ? 'opacity-20 cursor-not-allowed grayscale' : 'cursor-pointer'}
          `}
        >
          {d}
        </button>
      );
    }
    return calendarDays;
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-8">
        <div className="text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-200">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 font-serif mb-4">Добавлено в корзину!</h2>
          <p className="text-slate-500 max-w-sm mx-auto">Мы подготовили ваше предложение. Завершите оплату в личном кабинете.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="relative min-h-[70vh] flex flex-col pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <img src={item.imageUrl} alt={isVenue(item) ? item.name : (item as Scenario).title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-white lg:bg-gradient-to-r lg:from-slate-900/80 lg:to-transparent" />
        </div>
        
        <div className="relative z-20 px-8 py-4">
          <button onClick={onBack} className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all flex items-center gap-2 font-bold text-sm border border-white/10">
            <ArrowLeft className="w-5 h-5" /> Назад к выбору
          </button>
        </div>

        <div className="relative z-10 flex-1 flex items-center py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {type === 'venue' ? 'Площадка' : 'Сценарий'}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white font-serif mb-6 drop-shadow-lg">
                  {isVenue(item) ? item.name : (item as Scenario).title}
                </h1>
                <p className="text-slate-100 text-lg leading-relaxed max-w-xl font-medium drop-shadow">
                  {item.description}
                </p>
              </div>
              
              <div className="lg:col-span-5 w-full lg:mb-[-150px] relative z-30">
                <div className="bg-white p-8 sm:p-10 rounded-[3rem] shadow-2xl border border-slate-100">
                  {!showForm ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center gap-2 mb-8 pb-4 border-b border-slate-100">
                        <Calculator className="w-5 h-5 text-indigo-600" />
                        <span className="font-bold text-slate-900 uppercase text-xs tracking-widest">Планировщик события</span>
                      </div>

                      <div className="mb-6">
                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-2">Количество гостей</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            type="number" 
                            value={guests}
                            onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-slate-900 font-bold focus:ring-2 focus:ring-indigo-600 outline-none text-lg"
                          />
                        </div>
                      </div>

                      <div className="mb-8">
                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-3">Выберите {isVenue(item) ? 'сценарий' : 'площадку'}</label>
                        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                          {partners.map(p => (
                            <div 
                              key={p.id}
                              onClick={() => setSelectedPartner(selectedPartner?.id === p.id ? null : p)}
                              className={`flex-shrink-0 w-32 cursor-pointer transition-all ${selectedPartner?.id === p.id ? 'ring-2 ring-indigo-600 p-1 rounded-2xl scale-105' : 'opacity-70 grayscale-50 hover:opacity-100 hover:grayscale-0'}`}
                            >
                              <div className="h-24 rounded-xl overflow-hidden mb-2 shadow-sm">
                                <img src={p.imageUrl} alt="img" className="w-full h-full object-cover" />
                              </div>
                              <p className="text-[10px] font-black text-slate-900 truncate px-1">
                                {isVenue(p) ? p.name : (p as Scenario).title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 mb-10 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Общая сумма:</span>
                          <span className="text-2xl font-black text-slate-900">{prices.total.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <div className="flex justify-between items-center text-indigo-600">
                          <span className="text-[10px] font-black uppercase">На одного:</span>
                          <span className="font-black">{prices.perPerson.toLocaleString('ru-RU')} ₽</span>
                        </div>
                      </div>

                      <button onClick={() => setShowForm(true)} className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-xl flex items-center justify-center gap-3">
                        <CreditCard className="w-6 h-6" /> Забронировать
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleBook} className="animate-in fade-in slide-in-from-right-4 duration-500">
                       <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                        <UserIcon className="w-5 h-5 text-indigo-600" />
                        <span className="font-bold text-slate-900 uppercase text-xs tracking-widest">Ваши контакты</span>
                      </div>
                      <div className="space-y-4 mb-8">
                        <input required name="name" value={formData.name} onChange={handleInputChange} placeholder="Ваше имя" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold" />
                        <input required name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Телефон" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold" />
                        <div className="relative" ref={calendarRef}>
                          <div onClick={() => setIsCalendarOpen(!isCalendarOpen)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold cursor-pointer flex items-center justify-between">
                            <CalendarIcon className="w-4 h-4 text-indigo-600" />
                            <span>{new Date(formData.date).toLocaleDateString('ru-RU')}</span>
                            <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform ${isCalendarOpen ? 'rotate-90' : ''}`} />
                          </div>
                          {isCalendarOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-3xl shadow-2xl z-[100] p-6">
                              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
                            </div>
                          )}
                        </div>
                        <textarea name="wishes" value={formData.wishes} onChange={handleInputChange} placeholder="Ваши пожелания..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-medium resize-none" rows={2} />
                      </div>
                      <div className="flex gap-4">
                        <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 font-bold text-slate-400">Отмена</button>
                        <button type="submit" className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg">В корзину</button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-32 bg-white lg:pt-64">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-black text-slate-900 font-serif mb-16">Вдохновение и отзывы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedReviews.map((testimonial) => (
              <div key={testimonial.id} className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 relative hover:shadow-xl transition-all">
                <Quote className="absolute top-8 right-10 w-12 h-12 text-indigo-100" />
                <p className="text-slate-700 text-lg italic mb-10 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                  <img src={testimonial.avatarUrl} alt="avatar" className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h4 className="font-black text-slate-900">{testimonial.author}</h4>
                    <p className="text-[10px] text-indigo-600 uppercase font-black tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailsPage;
