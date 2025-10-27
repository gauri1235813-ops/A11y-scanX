import React from 'react';
import { View } from '../types';
import { ShieldCheckIcon, BookOpenIcon, TerminalIcon } from './Icons';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItemClasses = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500";
  const activeClasses = "bg-slate-700 text-white";
  const inactiveClasses = "text-slate-400 hover:bg-slate-800 hover:text-white";

  return (
    <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-cyan-400" />
            <h1 className="text-xl font-bold ml-3 bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              A11y Inspector
            </h1>
          </div>
          <nav className="flex space-x-2 bg-slate-800/50 p-1 rounded-lg">
            <button
              onClick={() => setCurrentView(View.SCANNER)}
              className={`${navItemClasses} ${currentView === View.SCANNER ? activeClasses : inactiveClasses}`}
            >
              <ShieldCheckIcon className="h-5 w-5" />
              Scanner
            </button>
            <button
              onClick={() => setCurrentView(View.KNOWLEDGE_BASE)}
              className={`${navItemClasses} ${currentView === View.KNOWLEDGE_BASE ? activeClasses : inactiveClasses}`}
            >
              <BookOpenIcon className="h-5 w-5" />
              Knowledge Base
            </button>
            <button
              onClick={() => setCurrentView(View.AUTOMATION)}
              className={`${navItemClasses} ${currentView === View.AUTOMATION ? activeClasses : inactiveClasses}`}
            >
              <TerminalIcon className="h-5 w-5" />
              Automation
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;