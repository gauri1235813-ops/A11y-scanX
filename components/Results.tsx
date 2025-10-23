
import React from 'react';
import { Violation } from '../types';
import ResultItem from './ResultItem';
import { ShieldCheckIcon } from './Icons';

interface ResultsProps {
  violations: Violation[];
  isLoading: boolean;
  onGetSuggestion: (violationId: string) => void;
}

const Results: React.FC<ResultsProps> = ({ violations, isLoading, onGetSuggestion }) => {
  if (isLoading) {
    return (
      <div className="w-full h-96 bg-slate-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
            <svg className="animate-spin mx-auto h-12 w-12 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          <p className="mt-4 text-slate-400">Scanning for issues...</p>
        </div>
      </div>
    );
  }

  const sortedViolations = [...violations].sort((a, b) => {
    const impactOrder: { [key: string]: number } = { critical: 0, serious: 1, moderate: 2, minor: 3 };
    const scoreA = a.impact ? impactOrder[a.impact] : 4;
    const scoreB = b.impact ? impactOrder[b.impact] : 4;
    return scoreA - scoreB;
  });
  
  if (sortedViolations.length === 0) {
    return (
      <div className="w-full h-96 bg-slate-800 rounded-lg flex items-center justify-center text-center">
        <div>
          <ShieldCheckIcon className="h-16 w-16 text-green-400 mx-auto"/>
          <h3 className="mt-4 text-xl font-bold text-slate-100">No Violations Found!</h3>
          <p className="text-slate-400 mt-1">Scan your HTML to see accessibility results here.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-4">
      <p className="text-slate-400">
        Found <span className="font-bold text-cyan-400">{violations.length}</span> issue(s).
        Issues are sorted by impact level.
      </p>
      {sortedViolations.map((violation, index) => (
        <ResultItem key={`${violation.id}-${index}`} violation={violation} onGetSuggestion={onGetSuggestion} />
      ))}
    </div>
  );
};

export default Results;
