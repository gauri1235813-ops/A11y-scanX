
import React, { useState, useCallback, useMemo } from 'react';
import { scanHtmlSnippet, scanLivePage } from '../services/accessibilityService';
import { getAIFixSuggestion } from '../services/geminiService';
import type { Violation } from '../types';
import Results from './Results';
import { SparklesIcon, DocumentMagnifyingGlassIcon } from './Icons';

const initialHtml = `
<main>
  <h1>Welcome to My Page</h1>
  
  <img src="https://picsum.photos/id/10/200/150">
  
  <div style="color: grey; background: lightgrey;">
    Low contrast text is hard to read.
  </div>
  
  <br>
  
  <label>Search</label>
  <input type="search">
  
  <button onclick="alert('Clicked!')">
    Click me
  </button>
</main>
`;

const getHighestWcagLevel = (tags: string[]): 'a' | 'aa' | 'aaa' | null => {
    if (tags.some(t => t.match(/wcag\d+aaa$/))) return 'aaa';
    if (tags.some(t => t.match(/wcag\d+aa$/))) return 'aa';
    if (tags.some(t => t.match(/wcag\d+a$/))) return 'a';
    return null;
}


const Scanner: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>(initialHtml);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [isSnippetScanning, setIsSnippetScanning] = useState<boolean>(false);
  const [isLiveScanning, setIsLiveScanning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [wcagLevelFilter, setWcagLevelFilter] = useState<string>('all');
  const [ruleFilter, setRuleFilter] = useState<string>('all');

  const handleSnippetScan = useCallback(async () => {
    setIsSnippetScanning(true);
    setError(null);
    setViolations([]);
    setWcagLevelFilter('all');
    setRuleFilter('all');
    try {
      const results = await scanHtmlSnippet(htmlContent);
      setViolations(results as Violation[]);
    } catch (err) {
      setError('An unexpected error occurred during the scan.');
      console.error(err);
    } finally {
      setIsSnippetScanning(false);
    }
  }, [htmlContent]);

  const handleLiveScan = useCallback(async () => {
    setIsLiveScanning(true);
    setError(null);
    setViolations([]);
    setWcagLevelFilter('all');
    setRuleFilter('all');
    try {
        const results = await scanLivePage();
        setViolations(results as Violation[]);
    } catch (err) {
        setError('An unexpected error occurred during the live scan.');
        console.error(err);
    } finally {
        setIsLiveScanning(false);
    }
  }, []);

  const handleGetSuggestion = useCallback(async (violationId: string) => {
    setViolations(prev =>
      prev.map(v => (v.id === violationId ? { ...v, isAiLoading: true } : v))
    );

    const violation = violations.find(v => v.id === violationId);
    if (violation) {
      const suggestion = await getAIFixSuggestion(violation);
      setViolations(prev =>
        prev.map(v =>
          v.id === violationId
            ? { ...v, aiSuggestion: suggestion, isAiLoading: false }
            : v
        )
      );
    }
  }, [violations]);
  
  const isLoading = isSnippetScanning || isLiveScanning;

  const availableRules = useMemo(() => {
    const allRules = new Set<string>();
    violations.forEach(v => allRules.add(v.id));
    return ['all', ...Array.from(allRules).sort()];
  }, [violations]);

  const filteredViolations = useMemo(() => {
    return violations
      .filter(v => {
        if (wcagLevelFilter === 'all') return true;
        const level = getHighestWcagLevel(v.tags);
        return level === wcagLevelFilter;
      })
      .filter(v => {
        if (ruleFilter === 'all') return true;
        return v.id === ruleFilter;
      });
  }, [violations, wcagLevelFilter, ruleFilter]);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">HTML Input</h2>
        <div className="bg-slate-800 p-1 rounded-lg shadow-lg flex-grow flex flex-col">
          <textarea
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            className="w-full h-96 lg:flex-grow bg-slate-900 text-slate-300 p-4 rounded-md font-mono text-sm border-2 border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="Paste your HTML code here..."
            spellCheck="false"
          />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
            onClick={handleSnippetScan}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 text-white font-bold py-3 px-4 rounded-md transition-transform duration-150 ease-in-out hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
            >
            {isSnippetScanning ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Scanning Snippet...
                </>
            ) : (
                <>
                <SparklesIcon className="w-5 h-5"/>
                Scan HTML Snippet
                </>
            )}
            </button>
            <button
            onClick={handleLiveScan}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 text-white font-bold py-3 px-4 rounded-md transition-transform duration-150 ease-in-out hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
            >
            {isLiveScanning ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Scanning Page...
                </>
            ) : (
                <>
                <DocumentMagnifyingGlassIcon className="w-5 h-5"/>
                Scan Live Page
                </>
            )}
            </button>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold text-slate-100">Results</h2>
            {violations.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
                <div className='flex items-center'>
                    <label htmlFor="wcag-filter" className="text-sm font-medium text-slate-400 mr-2">
                        Level
                    </label>
                    <select
                        id="wcag-filter"
                        value={wcagLevelFilter}
                        onChange={(e) => setWcagLevelFilter(e.target.value)}
                        className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-md focus:ring-cyan-500 focus:border-cyan-500 p-2 appearance-none"
                    >
                        <option value="all">All</option>
                        <option value="a">A</option>
                        <option value="aa">AA</option>
                        <option value="aaa">AAA</option>
                    </select>
                </div>
                <div className='flex items-center'>
                    <label htmlFor="rule-filter" className="text-sm font-medium text-slate-400 mr-2">
                        Rule
                    </label>
                    <select
                        id="rule-filter"
                        value={ruleFilter}
                        onChange={(e) => setRuleFilter(e.target.value)}
                        className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-md focus:ring-cyan-500 focus:border-cyan-500 p-2 appearance-none"
                    >
                        {availableRules.map(rule => (
                            <option key={rule} value={rule}>{rule}</option>
                        ))}
                    </select>
                </div>
            </div>
            )}
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <Results 
          violations={filteredViolations} 
          totalViolations={violations.length}
          isLoading={isLoading} 
          onGetSuggestion={handleGetSuggestion} 
        />
      </div>
    </div>
  );
};

export default Scanner;