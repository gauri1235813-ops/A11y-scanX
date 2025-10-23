
import React from 'react';
import { ShieldCheckIcon, XMarkIcon } from './Icons';

interface FloatingActionButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-0 right-0 w-16 h-16 bg-cyan-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-cyan-500 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
      aria-label={isOpen ? 'Close Accessibility Inspector' : 'Open Accessibility Inspector'}
    >
      <div className="relative w-8 h-8">
        <ShieldCheckIcon
          className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-0 scale-50 rotate-45' : 'opacity-100 scale-100 rotate-0'
          }`}
        />
        <XMarkIcon
          className={`absolute inset-0 w-8 h-8 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-45'
          }`}
        />
      </div>
    </button>
  );
};

export default FloatingActionButton;