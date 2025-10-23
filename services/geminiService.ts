
import { GoogleGenAI } from "@google/genai";
import type { Violation } from '../types';

const getGeminiClient = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getAIFixSuggestion = async (violation: Violation): Promise<string> => {
  const ai = getGeminiClient();
  
  const node = violation.nodes[0];
  
  const prompt = `
    As an expert web accessibility engineer, your task is to analyze an accessibility violation and provide a solution.

    **Violation:** ${violation.help} (${violation.id})
    **Description:** ${violation.description}
    **Impact:** ${violation.impact}
    **WCAG Standards:** ${violation.tags.filter(tag => tag.startsWith('wcag')).join(', ')}

    **Problematic HTML Snippet:**
    \`\`\`html
    ${node.html}
    \`\`\`

    **Instructions:**
    1.  Briefly explain the issue in simple, clear terms for a developer.
    2.  Provide a corrected version of the HTML snippet that fixes the accessibility issue.
    3.  Enclose the corrected code in a single HTML markdown code block. Do not add any other code blocks.

    Your response should be concise and directly address the problem shown in the snippet.
    `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Error fetching AI suggestion:', error);
    return 'An error occurred while fetching the suggestion. Please try again.';
  }
};
