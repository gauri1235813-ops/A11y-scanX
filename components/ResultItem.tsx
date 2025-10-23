
import React, { useState } from 'react';
import { Violation } from '../types';
import { ChevronDownIcon, SparklesIcon, InformationCircleIcon } from './Icons';

interface ResultItemProps {
  violation: Violation;
  onGetSuggestion: (violationId: string) => void;
}

const impactStyles: { [key: string]: { bg: string; text: string; border: string } } = {
  critical: { bg: 'bg-red-900/50', text: 'text-red-400', border: 'border-red-700' },
  serious: { bg: 'bg-orange-900/50', text: 'text-orange-400', border: 'border-orange-700' },
  moderate: { bg: 'bg-yellow-900/50', text: 'text-yellow-400', border: 'border-yellow-700' },
  minor: { bg: 'bg-sky-900/50', text: 'text-sky-400', border: 'border-sky-700' },
};

const ResultItem: React.FC<ResultItemProps> = ({ violation, onGetSuggestion }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const styles = impactStyles[violation.impact!] || impactStyles.minor;

  return (
    <div className={`border ${styles.border} ${styles.bg} rounded-lg overflow-hidden`}>
      <button
        className="w-full p-4 text-left flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className='flex-1 pr-4'>
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${styles.bg} ${styles.text} border ${styles.border} capitalize`}>
                {violation.impact}
            </span>
            <h3 className="mt-2 font-semibold text-slate-100">{violation.help}</h3>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <p className="text-sm text-slate-300 mb-4">{violation.description}</p>
          
          <div className="mb-4">
              <h4 className="font-semibold text-slate-300 text-sm mb-2">Problematic Element:</h4>
              <pre className="bg-slate-900/70 p-3 rounded-md text-sm">
                <code className="font-mono text-rose-400">{violation.nodes[0].html}</code>
              </pre>
          </div>
          
          <a
            href={violation.helpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 hover:underline"
          >
             <InformationCircleIcon className="w-4 h-4" />
            Learn more about this issue
          </a>

          <div className="mt-4 pt-4 border-t border-slate-700">
             {violation.aiSuggestion ? (
                <div>
                  <h4 className="font-semibold text-slate-300 text-sm mb-2 flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-cyan-400" />
                    AI Suggestion
                  </h4>
                  <div 
                    className="prose prose-sm prose-invert max-w-none text-slate-300" 
                    dangerouslySetInnerHTML={{ __html: violation.aiSuggestion.replace(/```html\n([\s\S]*?)```/g, '<pre><code class="language-html">$1</code></pre>').replace(/\n/g, '<br/>') }}
                  />
                </div>
            ) : (
                 <button 
                    onClick={() => onGetSuggestion(violation.id)}
                    disabled={violation.isAiLoading}
                    className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
                 >
                    {violation.isAiLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Getting suggestion...
                        </>
                    ) : (
                        <>
                           <SparklesIcon className="w-4 h-4" />
                           Get AI Fix Suggestion
                        </>
                    )}
                 </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default ResultItem;
