
import React, { useState } from 'react';
import { X, Trash2, CreditCard, Calendar as CalendarIcon, Users, ShoppingBag } from 'lucide-react';
import { Booking } from '../types';
import PaymentGateway from './PaymentGateway';

interface CartViewProps {
  bookings: Booking[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onPaymentSuccess: () => void;
}

const CartView: React.FC<CartViewProps> = ({ bookings, onClose, onRemove, onPaymentSuccess }) => {
  const [showPayment, setShowPayment] = useState(false);
  const total = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-8 py-8 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <ShoppingBag className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 font-serif">Корзина</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors group">
                <X className="w-6 h-6 text-slate-400 group-hover:text-slate-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {bookings.length === 0 ? (
                <div className="text-center py-24 animate-in fade-in duration-500">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">Пусто</h3>
                  <p className="text-slate-400 text-sm max-w-[180px] mx-auto">Выберите мероприятие или площадку мечты.</p>
                  <button 
                    onClick={onClose}
                    className="mt-10 px-8 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl text-sm hover:bg-indigo-100 transition-colors"
                  >
                    Перейти в каталог
                  </button>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-100 relative group hover:border-indigo-100 transition-colors animate-in slide-in-from-right-4">
                    <button 
                      onClick={() => onRemove(booking.id)}
                      className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-white text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-50 shadow-sm">
                        {booking.itemType === 'venue' ? 'Площадка' : 'Сценарий'}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-6 pr-8 leading-tight">{booking.itemName}</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 text-slate-500 bg-white p-3 rounded-xl border border-slate-100/50">
                        <Users className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-bold">{booking.guests} чел.</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 bg-white p-3 rounded-xl border border-slate-100/50">
                        <CalendarIcon className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-bold">
                          {new Date(booking.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Стоимость</span>
                      <span className="text-2xl font-black text-slate-900">{booking.totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {bookings.length > 0 && (
              <div className="p-8 bg-slate-50/80 backdrop-blur-md border-t border-slate-200">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Итого к оплате</span>
                  <span className="text-3xl font-black text-indigo-600 drop-shadow-sm">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <button 
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 group"
                >
                  <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Оплатить сейчас
                </button>
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-black">
                    Безопасная транзакция EventLux
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentGateway 
          amount={total} 
          onSuccess={onPaymentSuccess} 
          onClose={() => setShowPayment(false)} 
        />
      )}
    </div>
  );
};

export default CartView;
