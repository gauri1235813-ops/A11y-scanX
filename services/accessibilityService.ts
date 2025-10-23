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
  // First-level check for empty or whitespace-only input.
  if (!htmlContent.trim()) {
    return [];
  }
  
  // Create a temporary, disconnected DOM element to run the scan on.
  const container = document.createElement('div');
  container.innerHTML = htmlContent;

  // FIX: Add a second-level check. The HTML might contain content (like comments
  // or text nodes) but no actual *elements* for axe-core to scan. This
  // prevents the "No elements found..." error in such edge cases.
  if (container.childElementCount === 0) {
    return [];
  }

  try {
    const results = await axe.run(container, AXE_OPTIONS);
    return results.violations;
  } catch (error) {
    console.error('Error running accessibility scan:', error);
    return [];
  }
};

export const scanLivePage = async (): Promise<Result[]> => {
    try {
        // FIX: `exclude` is part of the `Context` object (the first argument to `axe.run`), not the `RunOptions` object (the second argument).
        // The original call was ambiguous, causing TypeScript to fail overload resolution. Separating the context from the options fixes the issue.
        const results = await axe.run({
            exclude: [['#root']], // Exclude the scanner's own UI
        }, AXE_OPTIONS);
        return results.violations;
    } catch (error) {
        console.error('Error running live accessibility scan:', error);
        return [];
    }
};
