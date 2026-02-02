
import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Loader2, CheckCircle2, X } from 'lucide-react';

interface PaymentGatewayProps {
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ amount, onSuccess, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [cardNumber, setCardNumber] = useState('');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    
    // Simulate network delay
    setTimeout(() => {
      setStatus('success');
      // Final delay to show success before clearing cart and closing
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    }, 2500);
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(' ') : digits;
  };

  if (status === 'success') {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-300">
        <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-100">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 font-serif mb-4">Оплата прошла!</h3>
          <p className="text-slate-500 leading-relaxed font-medium">Ваше мероприятие подтверждено. <br/> Чек отправлен на вашу почту.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md relative overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 font-serif">Безопасная оплата</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">EventLux Secure Gateway</p>
            </div>
          </div>

          <form onSubmit={handlePay} className="space-y-6">
            <div className="p-6 bg-slate-900 rounded-[2rem] text-white relative shadow-xl mb-8">
               <div className="flex justify-between items-start mb-12">
                 <div className="w-12 h-10 bg-slate-700/50 rounded-lg" />
                 <CreditCard className="w-8 h-8 opacity-20" />
               </div>
               <div className="space-y-4">
                 <div className="text-xl font-mono tracking-[0.2em]">
                   {cardNumber || '•••• •••• •••• ••••'}
                 </div>
                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-50">
                    <span>Card Holder</span>
                    <span>Expires</span>
                 </div>
                 <div className="flex justify-between font-bold text-sm">
                    <span>DEMO USER</span>
                    <span>12 / 29</span>
                 </div>
               </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-2 ml-1">Номер карты</label>
                <input 
                  required 
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-900 font-bold focus:ring-2 focus:ring-indigo-600 outline-none transition-all" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-2 ml-1">Срок</label>
                  <input required placeholder="ММ/ГГ" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-900 font-bold focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-2 ml-1">CVC</label>
                  <input required type="password" placeholder="•••" maxLength={3} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-900 font-bold focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
                </div>
              </div>
            </div>

            <button 
              disabled={status === 'processing'}
              className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
            >
              {status === 'processing' ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Обработка...
                </>
              ) : (
                `Оплатить ${amount.toLocaleString('ru-RU')} ₽`
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">SSL шифрование 256-бит</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
