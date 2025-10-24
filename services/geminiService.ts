
import { GoogleGenAI } from "@google/genai";
import type { Violation } from '../types';

const getGeminiClient = () => {
    // Access the API key from environment variables.
    // This is provided by the Vite `define` config.
    // FIX: Switched from `import.meta.env.VITE_API_KEY` to `process.env.API_KEY`
    // to align with Gemini API guidelines and fix the original TypeScript error.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("VITE_API_KEY environment variable not set. Please create a .env file.");
    }
    return new GoogleGenAI({ apiKey });
};

export const getAIFixSuggestion = async (violation: Violation): Promise<string> => {
  const ai = getGeminiClient();
  
  const node = violation.nodes[0];
  
  const prompt = `
    As an expert web accessibility engineer, your task is to analyze an accessibility violation and provide a clear, actionable solution for a fellow developer.

    **Accessibility Violation Details:**
    - **Rule ID:** ${violation.id}
    - **Violation:** ${violation.help}
    - **Impact:** ${violation.impact}
    - **WCAG Reference:** ${violation.tags.filter(tag => tag.startsWith('wcag')).join(', ')}

    **Problematic HTML Snippet:**
    \`\`\`html
    ${node.html}
    \`\`\`

    **Your Task:**
    Provide a response formatted exactly as follows, using Markdown. Do not add any introductory or concluding sentences outside of this structure.

    ### The Issue
    A brief, one-sentence explanation of what's wrong in the provided HTML snippet.

    ### Why It Matters
    Explain how this specific issue negatively impacts users, particularly those using assistive technologies (like screen readers).

    ### The Fix
    Provide a clear explanation of the changes needed to correct the HTML.

    ### Corrected Code
    \`\`\`html
    <!-- Your corrected HTML snippet goes here -->
    \`\`\`
    `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Error fetching AI suggestion:', error);
    return 'An error occurred while fetching the suggestion. Please check your API key and try again.';
  }
};
