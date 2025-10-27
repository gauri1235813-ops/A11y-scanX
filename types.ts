import type { NodeResult, ImpactValue } from 'axe-core';

// FIX: The original `Violation` interface extended `axe-core`'s `Result` type,
// but the properties were not being inherited correctly, leading to widespread
// TypeScript errors. By explicitly defining the properties from `Result`
// directly on the `Violation` interface, we fix all related type errors.
export interface Violation {
  id: string;
  impact?: ImpactValue | null;
  tags: string[];
  description: string;
  help: string;
  helpUrl: string;
  nodes: NodeResult[];
  aiSuggestion?: string;
  isAiLoading?: boolean;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  description: string;
  wcag: string;
  commonMistake: {
    code: string;
    explanation: string;
  };
  solution: {
    code: string;
    explanation: string;
  };
}

export enum View {
  SCANNER,
  KNOWLEDGE_BASE,
  AUTOMATION,
}