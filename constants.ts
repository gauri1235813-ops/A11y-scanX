
import type { KnowledgeBaseArticle } from './types';

export const KNOWLEDGE_BASE_ARTICLES: KnowledgeBaseArticle[] = [
  {
    id: 'missing-alt-text',
    title: 'Images Must Have Alternative Text',
    wcag: '1.1.1 Non-text Content (Level A)',
    description: 'Every image must have an `alt` attribute. For decorative images, the `alt` attribute should be empty (`alt=\"\"`). For informative images, the `alt` attribute should describe the image content and function.',
    commonMistake: {
      code: `
<!-- Missing alt attribute -->
<img src="user-avatar.jpg">

<!-- Inadequate description -->
<img src="chart.png" alt="chart">
      `,
      explanation: 'Omitting the alt attribute or providing a generic description fails to convey the necessary information to users of screen readers.'
    },
    solution: {
      code: `
<!-- Decorative image -->
<img src="decorative-swoosh.svg" alt="">

<!-- Informative image -->
<img src="sales-chart-q1.png" alt="Bar chart showing a 20% increase in Q1 sales.">
      `,
      explanation: 'A descriptive alt text provides context for screen reader users, while an empty alt attribute allows them to skip over purely decorative content.'
    }
  },
  {
    id: 'form-labels',
    title: 'Form Inputs Must Have Labels',
    wcag: '3.3.2 Labels or Instructions (Level A)',
    description: 'Every form control (like `<input>`, `<textarea>`, `<select>`) must have a corresponding `<label>` element that is programmatically associated with it.',
    commonMistake: {
      code: `
<!-- No label at all -->
<input type="text" placeholder="Your Name">

<!-- Label is not associated with the input -->
<span>Email</span>
<input type="email" id="email">
      `,
      explanation: 'Using placeholders as labels or having labels that are not linked to inputs makes forms difficult to navigate and understand for users with assistive technologies.'
    },
    solution: {
      code: `
<!-- Using the 'for' attribute -->
<label for="username">Username</label>
<input type="text" id="username">

<!-- Wrapping the input inside the label -->
<label>
  Password
  <input type="password">
</label>
      `,
      explanation: 'Programmatically linking labels to inputs using `for` and `id` ensures that screen readers announce the label when the user focuses on the input, providing clear context.'
    }
  },
    {
    id: 'color-contrast',
    title: 'Sufficient Color Contrast',
    wcag: '1.4.3 Contrast (Minimum) (Level AA)',
    description: 'Text and images of text must have a contrast ratio of at least 4.5:1 against their background. Large text (18pt or 14pt bold) needs a ratio of at least 3:1.',
    commonMistake: {
      code: `
<div style="background-color: #EEEEEE; color: #CCCCCC;">
  This text has very low contrast and is hard to read.
</div>
      `,
      explanation: 'Low contrast text is difficult for users with visual impairments to read, including older users or people in bright lighting conditions.'
    },
    solution: {
      code: `
<div style="background-color: #FFFFFF; color: #333333;">
  This text has high contrast and is easy to read.
</div>
      `,
      explanation: 'Ensuring a high contrast ratio makes content more legible for everyone. Use online contrast checkers to verify your color combinations.'
    }
  },
];
