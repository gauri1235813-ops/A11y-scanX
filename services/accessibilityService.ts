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
        // FIX: Added a pre-scan check. If the page body contains no elements other
        // than the inspector's own root, we return early. This prevents axe-core
        // from throwing a "No elements found" error when scanning a blank page.
        const scannableElements = Array.from(document.body.children).filter(
            (el) => el.id !== 'a11y-inspector-root'
        );

        if (scannableElements.length === 0) {
            return [];
        }

        const results = await axe.run({
            exclude: [['#a11y-inspector-root']], // Exclude the scanner's own UI
        }, AXE_OPTIONS);
        return results.violations;
    } catch (error) {
        console.error('Error running live accessibility scan:', error);
        return [];
    }
};
