import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from './Icons';

interface CodeBlockProps {
  children: React.ReactNode;
  lang?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, lang }) => {
  const [copied, setCopied] = useState(false);
  const textToCopy = children?.toString() || '';

  const handleCopy = () => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }
  };

  return (
    <div className="relative group not-prose my-4">
      <pre className={`bg-slate-900/70 p-4 pr-12 rounded-md text-sm overflow-x-auto language-${lang}`}>
        <code className="font-mono text-slate-300">{children}</code>
      </pre>
      <button 
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-slate-700/50 rounded-lg text-slate-400 hover:bg-slate-600 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        aria-label="Copy to clipboard"
      >
        {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default CodeBlock;
