import axe from 'axe-core';
// FIX: Import `RunOptions` to correctly type the options object for `axe.run`.
import type { Result, RunOptions } from 'axe-core';

// FIX: Explicitly typing `AXE_OPTIONS` with `RunOptions` resolves the function
// overload error for `axe.run` and the subsequent error where `results.violations`
// could not be found.
const AXE_OPTIONS: RunOptions = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']
  }
};

export const scanHtmlSnippet = async (htmlContent: string): Promise<Result[]> => {
  if (!htmlContent.trim()) {
    return [];
  }

  // FIX: Replaced the 'createElement' + 'innerHTML' method with the more robust
  // DOMParser API. This correctly handles any HTML snippet, creates a full
  // document context, and prevents errors where no scannable elements are found.
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // FIX: Scan the entire document element (`<html>`) instead of just the `<body>`.
  // This allows `axe-core` to detect page-level accessibility issues
  // (e.g., missing `lang` attribute, missing `<title>`) that were previously missed.
  const contentToScan = doc.documentElement;

  try {
    const results = await axe.run(contentToScan, AXE_OPTIONS);
    return results.violations;
  } catch (error) {
    console.error('Error running accessibility scan:', error);
    return [];
  }
};

export const scanLivePage = async (): Promise<Result[]> => {
    try {
        // FIX: The `axe.run` function was being called incorrectly, with options split
        // into two arguments. The correct approach is to pass a single options object
        // containing all configuration, including the `exclude` property.
        // The previous pre-scan check was also removed as it prevented page-level
        // rules (e.g., document-title) from running correctly.
        const liveScanOptions = {
            ...AXE_OPTIONS,
            exclude: [['#a11y-inspector-root']], // Exclude the scanner's own UI
        };
        
        // `axe.run` defaults to scanning the entire `document` when no context is provided.
        const results = await axe.run(liveScanOptions);
        return results.violations;
    } catch (error) {
        console.error('Error running live accessibility scan:', error);
        return [];
    }
};