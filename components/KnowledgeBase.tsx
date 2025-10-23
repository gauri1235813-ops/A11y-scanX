
import React, { useState } from 'react';
import { KNOWLEDGE_BASE_ARTICLES } from '../constants';
import type { KnowledgeBaseArticle } from '../types';
import { ChevronDownIcon } from './Icons';

const ArticleCard: React.FC<{ article: KnowledgeBaseArticle }> = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden transition-shadow hover:shadow-cyan-500/10 hover:shadow-lg">
      <button
        className="w-full p-4 text-left flex justify-between items-center rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-bold text-slate-100">{article.title}</h3>
          <p className="text-sm text-cyan-400 font-mono mt-1">{article.wcag}</p>
        </div>
         <ChevronDownIcon className={`w-6 h-6 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 border-t border-slate-700">
          <p className="text-slate-300 mb-4">{article.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-red-400 mb-2">Common Mistake</h4>
              <p className="text-sm text-slate-400 mb-2">{article.commonMistake.explanation}</p>
              <pre className="bg-slate-900/70 p-3 rounded-md text-sm"><code className="font-mono text-slate-300">{article.commonMistake.code.trim()}</code></pre>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Solution</h4>
              <p className="text-sm text-slate-400 mb-2">{article.solution.explanation}</p>
              <pre className="bg-slate-900/70 p-3 rounded-md text-sm"><code className="font-mono text-slate-300">{article.solution.code.trim()}</code></pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const KnowledgeBase: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Accessibility Knowledge Base</h2>
        <p className="mt-2 text-lg text-slate-400">
          Learn about common accessibility issues and how to fix them.
        </p>
      </div>
      <div className="space-y-4">
        {KNOWLEDGE_BASE_ARTICLES.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBase;