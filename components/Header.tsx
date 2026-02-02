
import React from 'react';
import { Calendar, User, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onGoHome: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, cartCount, onOpenCart, onOpenProfile }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button onClick={onGoHome} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-black tracking-tight text-slate-900 font-serif">EventLux</span>
          </button>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#venues" onClick={(e) => { e.preventDefault(); onGoHome(); window.location.hash = '#venues'; }} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Площадки</a>
            <a href="#scenarios" onClick={(e) => { e.preventDefault(); onGoHome(); window.location.hash = '#scenarios'; }} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Сценарии</a>
            <a href="#planner" onClick={(e) => { e.preventDefault(); onGoHome(); window.location.hash = '#planner'; }} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">ИИ-Планировщик</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="p-2 text-slate-600 hover:text-indigo-600 transition-colors relative"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={onOpenProfile}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Личный кабинет</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
