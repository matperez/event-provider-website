
import React, { useState } from 'react';
/* Added missing Quote icon to the imports from lucide-react */
import { User as UserIcon, Calendar, CreditCard, ChevronRight, CheckCircle2, Clock, MapPin, Ticket, LogOut, X, Settings, History, MessageCircle, ShieldCheck, Send, Info, Star, Image as ImageIcon, Sparkles, ArrowRight, ExternalLink, UserCheck, ShieldAlert, Phone as PhoneIcon, Quote } from 'lucide-react';
import { Booking } from '../types';

interface UserProfileProps {
  bookings: Booking[];
  onBack: () => void;
}

type ModalType = 'none' | 'edit' | 'transactions' | 'contact' | 'meetingDetails' | 'archiveDetails';

// Mock data for active upcoming events (already signed up/paid)
const MOCK_ACTIVE_UPCOMING: Booking[] = [
  {
    id: 'up-101',
    itemId: 's1',
    itemName: 'Neon Cyberpunk Night (Premium Edition)',
    itemType: 'scenario',
    date: '2024-05-28',
    guests: 45,
    totalPrice: 157500,
    contactName: 'Александр Константинов',
    phone: '+7 (999) 000-00-00',
    email: 'alex.k@eventlux.ru',
    status: 'Paid',
    wishes: 'Нужен веганский фуршет'
  },
  {
    id: 'up-102',
    itemId: 'v2',
    itemName: 'Grand Manor House - VIP Reception',
    itemType: 'venue',
    date: '2024-06-12',
    guests: 120,
    totalPrice: 120000,
    contactName: 'Александр Константинов',
    phone: '+7 (999) 000-00-00',
    email: 'alex.k@eventlux.ru',
    status: 'Paid'
  }
];

// Meeting specific details mock
const MEETING_INFO_MOCK: Record<string, any> = {
  'up-101': {
    location: 'Центр Дизайна ARTPLAY, ул. Нижняя Сыромятническая, д. 10, стр. 2',
    meetingPoint: 'У главного входа в корпус "А" за 15 минут до начала',
    manager: 'Елена Маркова',
    managerPhone: '+7 (900) 111-22-33',
    dressCode: 'Cyberpunk / Neon / Black Tie with a twist',
    program: [
      '19:00 — Сбор гостей и welcome-drink',
      '19:30 — Погружение в VR-зону',
      '20:30 — Основное шоу и ужин',
      '22:00 — DJ-сет и нетворкинг'
    ]
  },
  'up-102': {
    location: 'Загородный клуб "Grand Manor", Рублевское ш., 45км',
    meetingPoint: 'Центральные ворота усадьбы, парковка VIP-сектор',
    manager: 'Денис Волков',
    managerPhone: '+7 (900) 444-55-66',
    dressCode: 'Summer Chic / White Party',
    program: [
      '16:00 — Трансфер из центра (по желанию)',
      '17:00 — Коктейль в саду',
      '18:30 — Официальная часть',
      '21:00 — Фейерверк и десерты'
    ]
  }
};

// Mock data for past events (Archive)
const PAST_EVENTS_MOCK = [
  {
    id: 'p1',
    name: 'Корпоратив TechFlow: Neon Night',
    date: '2023-12-15',
    guests: 120,
    venue: 'Loft Industrial',
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=800',
    description: 'Масштабный новогодний корпоратив с неоновым шоу, приглашенным DJ и уникальным VR-квестом для сотрудников.',
    rating: 5,
    feedback: 'Это было лучшее завершение года. Команда в восторге от атмосферы лофта и качества звука.'
  },
  {
    id: 'p2',
    name: 'День Рождения: Space Adventure',
    date: '2023-08-10',
    guests: 25,
    venue: 'The Cyber Arena',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    description: 'Детский праздник с полным погружением в космическую атмосферу, аниматорами в костюмах астронавтов и квестом на выживание.',
    rating: 5,
    feedback: 'Дети не хотели уходить! Организация на высоте, аниматоры действительно знают свое дело.'
  }
];

const UserProfile: React.FC<UserProfileProps> = ({ bookings, onBack }) => {
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedArchive, setSelectedArchive] = useState<typeof PAST_EVENTS_MOCK[0] | null>(null);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Александр Константинов',
    email: 'alex.k@eventlux.ru',
    phone: '+7 (999) 000-00-00'
  });

  const [contactForm, setContactForm] = useState({
    subject: 'Общие вопросы',
    message: ''
  });

  // Combine real bookings from state with our high-quality mock bookings for the demo
  const allPaidBookings = [...MOCK_ACTIVE_UPCOMING, ...bookings.filter(b => b.status === 'Paid')];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveModal('none');
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitted(true);
  };

  const handleViewMeetingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setActiveModal('meetingDetails');
  };

  const handleViewArchiveDetails = (event: typeof PAST_EVENTS_MOCK[0]) => {
    setSelectedArchive(event);
    setActiveModal('archiveDetails');
  };

  const closeModal = () => {
    setActiveModal('none');
    setTimeout(() => {
      setIsContactSubmitted(false);
      setSelectedBooking(null);
      setSelectedArchive(null);
      setContactForm({ subject: 'Общие вопросы', message: '' });
    }, 300);
  };

  const contactSubjects = [
    'Общие вопросы',
    'Изменение даты мероприятия',
    'Дополнительные услуги',
    'Вопросы по оплате',
    'Отмена бронирования',
    'Жалоба или предложение'
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-xl shadow-slate-200/60 border border-slate-100 mb-12 flex flex-col md:flex-row items-center gap-8 animate-in slide-in-from-top-8 duration-700">
          <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-indigo-100 relative group cursor-pointer overflow-hidden">
            <UserIcon className="w-16 h-16" />
            <div onClick={() => setActiveModal('edit')} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-black text-slate-900 font-serif mb-2">{profileData.name}</h1>
            <p className="text-slate-500 font-medium mb-6">Premium Client | {profileData.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-slate-700">{allPaidBookings.length + PAST_EVENTS_MOCK.length} Мероприятий</span>
              </div>
              <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-slate-700">Статус: VIP</span>
              </div>
            </div>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-sm transition-colors px-6 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50">
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content: Bookings & History */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Upcoming Events */}
            <section className="animate-in slide-in-from-left-8 duration-700 delay-100">
              <div className="flex items-center justify-between mb-8 px-4">
                <h2 className="text-2xl font-black text-slate-900 font-serif">Ближайшие события</h2>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 shadow-sm">Активные</span>
              </div>

              <div className="space-y-6">
                {allPaidBookings.length > 0 ? (
                  allPaidBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-[2.5rem] p-8 shadow-lg shadow-slate-100 border border-slate-50 group hover:border-indigo-100 transition-all">
                      <div className="flex flex-col sm:flex-row justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Билет активен</span>
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Бронь №{booking.id}</span>
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 mb-4">{booking.itemName}</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                            <div className="flex items-center gap-2 text-slate-500">
                              <Calendar className="w-4 h-4 text-indigo-600" />
                              <span className="text-sm font-bold">{new Date(booking.date).toLocaleDateString('ru-RU')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                              <Ticket className="w-4 h-4 text-indigo-600" />
                              <span className="text-sm font-bold">{booking.guests} гостей</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                              <MapPin className="w-4 h-4 text-indigo-600" />
                              <span className="text-sm font-bold">{booking.itemType === 'venue' ? 'Локация' : 'Event-Hall'}</span>
                            </div>
                          </div>
                          <div className="flex gap-4">
                             <button 
                               onClick={() => handleViewMeetingDetails(booking)}
                               className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest px-4 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                             >
                               <ExternalLink className="w-3 h-3" /> Детали встречи
                             </button>
                             <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                               Изменить данные
                             </button>
                          </div>
                        </div>
                        <div className="sm:w-48 flex flex-col justify-center items-center gap-4 bg-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-200">
                          <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EVENT-${booking.id}`} alt="QR" className="w-full h-full" />
                          </div>
                          <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest text-center">Предъявите код на входе</p>
                          <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:underline">Скачать PDF</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-[2rem] p-12 text-center border border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium mb-4">У вас пока нет оплаченных будущих мероприятий.</p>
                    <button onClick={onBack} className="text-indigo-600 font-black text-sm uppercase tracking-widest hover:underline">Выбрать в каталоге</button>
                  </div>
                )}
              </div>
            </section>

            {/* Archive Section */}
            <section className="animate-in slide-in-from-left-8 duration-700 delay-200">
              <div className="flex items-center justify-between mb-8 px-4">
                <h2 className="text-2xl font-black text-slate-900 font-serif">Архив мероприятий</h2>
                <div className="flex items-center gap-2 text-slate-400">
                   <History className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase tracking-widest">Завершенные</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PAST_EVENTS_MOCK.map((event) => (
                  <div 
                    key={event.id} 
                    onClick={() => handleViewArchiveDetails(event)}
                    className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-40">
                      <img src={event.image} alt={event.name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                           <Calendar className="w-3 h-3 text-indigo-300" />
                           {new Date(event.date).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-black text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{event.name}</h3>
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-3">
                           <div className="flex gap-0.5">
                             {[...Array(event.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                           </div>
                        </div>
                        <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700">Подробнее</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-700 delay-300">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-100">
              <div className="relative z-10">
                <h3 className="text-xl font-bold font-serif mb-8 italic">Статистика лояльности</h3>
                <div className="space-y-6 mb-10">
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
                      <span>Событий проведено</span>
                      <span>14</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[70%]" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-2">Ваш следующий подарок</p>
                  <p className="text-sm font-medium leading-relaxed">Бесплатное "Алко-казино" при заказе следующего корпоратива!</p>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 opacity-10 rotate-12">
                 <Star className="w-32 h-32 fill-white" />
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="font-black text-slate-900 mb-6 px-1">Поддержка</h3>
              <div className="space-y-4">
                <button onClick={() => setActiveModal('contact')} className="w-full py-4 px-6 bg-slate-50 rounded-2xl text-left font-bold text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-between group">
                  Связаться с менеджером
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => setActiveModal('edit')} className="w-full py-4 px-6 bg-slate-50 rounded-2xl text-left font-bold text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-between group">
                  Изменить данные профиля
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => setActiveModal('transactions')} className="w-full py-4 px-6 bg-slate-50 rounded-2xl text-left font-bold text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-between group">
                  История транзакций
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden group cursor-pointer shadow-lg shadow-indigo-200">
               <div className="relative z-10">
                  <Sparkles className="w-8 h-8 text-indigo-300 mb-4" />
                  <h4 className="text-lg font-black font-serif italic mb-2">VIP Предложение</h4>
                  <p className="text-xs text-indigo-100 leading-relaxed font-medium">Получите доступ к закрытым площадкам, недоступным в общем каталоге.</p>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Modals Layer */}
      {activeModal !== 'none' && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-[3rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-xl text-white">
                  {activeModal === 'edit' && <Settings className="w-5 h-5" />}
                  {activeModal === 'transactions' && <History className="w-5 h-5" />}
                  {activeModal === 'contact' && <MessageCircle className="w-5 h-5" />}
                  {activeModal === 'meetingDetails' && <MapPin className="w-5 h-5" />}
                  {activeModal === 'archiveDetails' && <History className="w-5 h-5" />}
                </div>
                <h3 className="text-xl font-black text-slate-900 font-serif">
                  {activeModal === 'edit' && 'Профиль'}
                  {activeModal === 'transactions' && 'Транзакции'}
                  {activeModal === 'contact' && (isContactSubmitted ? 'Готово' : 'Новое сообщение')}
                  {activeModal === 'meetingDetails' && 'Детали встречи'}
                  {activeModal === 'archiveDetails' && 'Прошедшее событие'}
                </h3>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-white rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[75vh] overflow-y-auto">
              {activeModal === 'edit' && (
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Ваше имя</label>
                    <input type="text" value={profileData.name} onChange={(e) => setProfileData(p => ({...p, name: e.target.value}))} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Email</label>
                    <input type="email" value={profileData.email} onChange={(e) => setProfileData(p => ({...p, email: e.target.value}))} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold" />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black shadow-xl shadow-indigo-100">Сохранить</button>
                </form>
              )}

              {activeModal === 'transactions' && (
                <div className="space-y-4">
                  {allPaidBookings.map((b) => (
                    <div key={b.id} className="p-5 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="font-bold text-slate-900">{b.itemName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Чек №{b.id}</p>
                      </div>
                      <p className="font-black text-slate-900">{b.totalPrice.toLocaleString('ru-RU')} ₽</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-slate-100 flex items-center gap-3 text-emerald-600 bg-emerald-50/50 p-5 rounded-2xl">
                    <ShieldCheck className="w-6 h-6 shrink-0" />
                    <p className="text-[11px] font-bold">Оплата защищена SSL.</p>
                  </div>
                </div>
              )}

              {activeModal === 'contact' && (
                !isContactSubmitted ? (
                  <form onSubmit={handleSubmitContact} className="space-y-6">
                    <div className="p-4 bg-indigo-50 rounded-2xl flex items-start gap-3 border border-indigo-100 text-xs text-indigo-700 font-medium">
                      <Info className="w-5 h-5 shrink-0" /> Опишите детали вашего обращения.
                    </div>
                    <select required value={contactForm.subject} onChange={(e) => setContactForm(p => ({...p, subject: e.target.value}))} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold">
                      {contactSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <textarea required rows={4} value={contactForm.message} onChange={(e) => setContactForm(p => ({...p, message: e.target.value}))} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-medium" />
                    <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black shadow-xl">Отправить</button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-10 h-10 text-indigo-600" /></div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4">Отправлено!</h4>
                    <button onClick={closeModal} className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black">Понятно</button>
                  </div>
                )
              )}

              {activeModal === 'meetingDetails' && selectedBooking && (
                <div className="space-y-8 pb-4">
                  <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <Sparkles className="w-6 h-6 text-indigo-600" />
                     </div>
                     <div>
                        <h4 className="font-black text-slate-900 leading-tight">{selectedBooking.itemName}</h4>
                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Организация: EventLux Luxury Service</p>
                     </div>
                  </div>

                  {MEETING_INFO_MOCK[selectedBooking.id] ? (
                    <>
                      <div className="space-y-6">
                         <div className="flex gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100">
                               <MapPin className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Точный адрес</p>
                               <p className="text-sm font-bold text-slate-900">{MEETING_INFO_MOCK[selectedBooking.id].location}</p>
                            </div>
                         </div>

                         <div className="flex gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100">
                               <UserCheck className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ваш менеджер</p>
                               <p className="text-sm font-bold text-slate-900">{MEETING_INFO_MOCK[selectedBooking.id].manager}</p>
                               <button className="text-xs text-indigo-600 font-bold flex items-center gap-1 mt-1 hover:underline">
                                  <PhoneIcon className="w-3 h-3" /> {MEETING_INFO_MOCK[selectedBooking.id].managerPhone}
                               </button>
                            </div>
                         </div>

                         <div className="flex gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100">
                               <ShieldAlert className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dress Code</p>
                               <p className="text-sm font-bold text-slate-900 italic">{MEETING_INFO_MOCK[selectedBooking.id].dressCode}</p>
                            </div>
                         </div>
                      </div>

                      <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
                         <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Программа мероприятия
                         </h5>
                         <ul className="space-y-3">
                            {MEETING_INFO_MOCK[selectedBooking.id].program.map((item: string, idx: number) => (
                              <li key={idx} className="text-xs font-medium text-slate-300 flex items-start gap-2">
                                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                 {item}
                              </li>
                            ))}
                         </ul>
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                       <p className="text-slate-400 font-medium">Детали для этой брони формируются. Менеджер свяжется с вами в ближайшее время.</p>
                    </div>
                  )}

                  <button 
                    onClick={closeModal}
                    className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black shadow-xl"
                  >
                    Понятно
                  </button>
                </div>
              )}

              {activeModal === 'archiveDetails' && selectedArchive && (
                <div className="space-y-8 pb-4">
                  <div className="relative h-48 rounded-[2rem] overflow-hidden shadow-lg">
                    <img src={selectedArchive.image} alt={selectedArchive.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">Архивная запись</p>
                      <h4 className="text-xl font-black">{selectedArchive.name}</h4>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Дата</p>
                        <p className="text-sm font-bold text-slate-900">{new Date(selectedArchive.date).toLocaleDateString('ru-RU')}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Гости</p>
                        <p className="text-sm font-bold text-slate-900">{selectedArchive.guests} человек</p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Локация</p>
                      <p className="text-sm font-bold text-slate-900">{selectedArchive.venue}</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Описание</p>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{selectedArchive.description}</p>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Ваш отзыв</p>
                      <div className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100 relative">
                        <Quote className="absolute top-4 right-6 w-8 h-8 text-indigo-100" />
                        <div className="flex gap-1 mb-3">
                          {[...Array(selectedArchive.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-indigo-600 text-indigo-600" />)}
                        </div>
                        <p className="text-sm italic text-slate-700 font-medium">"{selectedArchive.feedback}"</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={closeModal}
                    className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black shadow-xl"
                  >
                    Закрыть
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
