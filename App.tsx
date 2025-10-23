
import React, { useState } from 'react';
import Header from './components/Header';
import Scanner from './components/Scanner';
import KnowledgeBase from './components/KnowledgeBase';
import FloatingActionButton from './components/FloatingActionButton';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.SCANNER);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] font-sans">
      {/* This container holds the entire widget */}
      <div
        className={`
          w-[calc(100vw-40px)] h-[calc(100vh-88px)] max-w-7xl max-h-[800px]
          bg-slate-900 rounded-xl shadow-2xl shadow-black/50 border border-slate-700
          flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
      >
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        <main className="p-4 sm:p-6 lg:p-8 flex-grow overflow-y-auto">
          {currentView === View.SCANNER && <Scanner />}
          {currentView === View.KNOWLEDGE_BASE && <KnowledgeBase />}
        </main>
        <footer className="text-center p-4 text-slate-500 text-sm border-t border-slate-800">
          <p>A11y Inspector &copy; 2024. Empowering accessible web development.</p>
        </footer>
      </div>

      {/* This button toggles the widget's visibility */}
      <FloatingActionButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </div>
  );
};

export default App;