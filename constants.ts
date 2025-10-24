
import type { KnowledgeBaseArticle } from './types';

export const KNOWLEDGE_BASE_ARTICLES: KnowledgeBaseArticle[] = [
  {
    id: 'missing-alt-text',
    title: 'Images Must Have Alternative Text',
    wcag: '1.1.1 Non-text Content (Level A)',
    description: 'Every image must have an `alt` attribute. For decorative images, the `alt` attribute should be empty (`alt=""`). For informative images, the `alt` attribute should describe the image content and function.',
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
    id: 'error-identification',
    title: 'Clearly Identify Input Errors',
    wcag: '3.3.1 Error Identification (Level A)',
    description: 'If an input error is detected, the item in error must be identified and the error described to the user in text. Simply changing the visual appearance (like a border color) is not enough.',
    commonMistake: {
      code: `
<!-- Error is only indicated by color -->
<label for="email">Email</label>
<input id="email" type="email" style="border: 1px solid red;">
      `,
      explanation: 'Color alone is insufficient for users with color blindness. Without a text-based error message, screen reader users may not be aware an error has occurred at all.'
    },
    solution: {
      code: `
<label for="email">Email</label>
<input id="email" type="email" aria-invalid="true" aria-describedby="email-error">
<p id="email-error" class="error-message">
  Please enter a valid email address.
</p>
      `,
      explanation: 'Provide a clear, text-based error message. Use `aria-invalid="true"` on the input and associate it with the error message via `aria-describedby` so assistive technologies can announce the error.'
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
  {
    id: 'link-purpose',
    title: 'Link Purpose (In Context)',
    wcag: '2.4.4 Link Purpose (In Context) (Level A)',
    description: 'The purpose of each link should be clear from its link text alone, or from the link text together with its programmatically determined link context.',
    commonMistake: {
      code: `
<p>
  To learn more about our services, 
  <a href="/services">click here</a>.
</p>
<a href="document.pdf">Download</a>
      `,
      explanation: 'Vague link text like "click here" or "download" forces screen reader users to read the surrounding text to understand the link\'s destination, which is inefficient and confusing.'
    },
    solution: {
      code: `
<p>
  Learn more about our <a href="/services">web design services</a>.
</p>
<a href="document.pdf">Download the Q3 Financial Report (PDF)</a>
      `,
      explanation: 'Descriptive link text clearly communicates the link\'s purpose and destination without requiring the user to guess from the context.'
    }
  },
  {
    id: 'keyboard-accessible',
    title: 'Keyboard Accessible',
    wcag: '2.1.1 Keyboard (Level A)',
    description: 'All interactive functionality must be operable through a keyboard interface. Custom controls, like those made with `<div>` or `<span>`, must be made focusable and interactive.',
    commonMistake: {
      code: `
<!-- This "button" cannot be focused or triggered by a keyboard -->
<div class="custom-button" onclick="openModal()">
  Open Modal
</div>
      `,
      explanation: 'Users who rely on keyboards for navigation (due to motor impairments, for example) cannot interact with non-native elements that are missing keyboard event handlers and tabindex.'
    },
    solution: {
      code: `
<!-- Use a native button element (best solution) -->
<button onclick="openModal()">Open Modal</button>

<!-- Or make the custom element accessible -->
<div class="custom-button" 
     onclick="openModal()" 
     onkeydown="handleKey(event)" 
     role="button" 
     tabindex="0">
  Open Modal
</div>
      `,
      explanation: 'Using native HTML elements like `<button>` is always preferred as they have built-in keyboard accessibility. If a custom element must be used, add `tabindex="0"`, a `role`, and a keyboard event handler.'
    }
  },
  {
    id: 'landmark-regions',
    title: 'Using Landmark Regions',
    wcag: '1.3.1 Info and Relationships (Level A)',
    description: 'Structure the page using semantic landmark regions like `<header>`, `<nav>`, `<main>`, and `<footer>`. This helps users of assistive technologies understand the layout and navigate the page more easily.',
    commonMistake: {
      code: `
<div id="header">...</div>
<div class="navigation">...</div>
<div id="content">
  <h1>Main content</h1>
</div>
<div id="footer">...</div>
      `,
      explanation: 'Using generic `<div>` elements for major page sections provides no semantic information to screen readers, making it difficult for users to skip to different parts of the page.'
    },
    solution: {
      code: `
<header>...</header>
<nav>...</nav>
<main>
  <h1>Main content</h1>
</main>
<footer>...</footer>
      `,
      explanation: 'HTML5 landmark elements provide a semantic structure that screen readers can use to create a page outline, allowing users to quickly jump between sections like the main content or navigation.'
    }
  },
  {
    id: 'button-name',
    title: 'Buttons Must Have Accessible Names',
    wcag: '4.1.2 Name, Role, Value (Level A)',
    description: 'Every button must have a discernible text that clearly indicates its function. For buttons that only contain an icon, an accessible name must be provided.',
    commonMistake: {
      code: `
<!-- A button with no text content or accessible name -->
<button>
  <svg><!-- search icon --></svg>
</button>
      `,
      explanation: 'Without an accessible name, a screen reader may only announce "button," leaving the user with no idea what the button does.'
    },
    solution: {
      code: `
<!-- Best: Use text and an icon -->
<button>
  <svg><!-- search icon --></svg> Search
</button>

<!-- Good: Use aria-label for icon-only buttons -->
<button aria-label="Search">
  <svg><!-- search icon --></svg>
</button>

<!-- Also good: Use visually hidden text -->
<button>
  <svg><!-- search icon --></svg>
  <span class="visually-hidden">Search</span>
</button>
      `,
      explanation: 'Providing an accessible name via visible text, an `aria-label`, or visually-hidden text ensures that all users understand the button\'s purpose.'
    }
  },
  {
    id: 'heading-order',
    title: 'Heading Levels Should Follow a Logical Order',
    wcag: '2.4.6 Headings and Labels (Level AA)',
    description: 'Headings must be nested in a logical, hierarchical order without skipping levels (e.g., an <h1> should be followed by an <h2>, not an <h3>). This structure creates an outline of the page that screen reader users can use for navigation.',
    commonMistake: {
      code: `
<h1>Main Page Title</h1>
<h3>A Subsection</h3>
<p>Content...</p>
      `,
      explanation: 'Skipping from an H1 directly to an H3 breaks the document\'s logical structure. Users of assistive technology might think they missed a section.'
    },
    solution: {
      code: `
<h1>Main Page Title</h1>
<h2>A Major Section</h2>
<p>Content...</p>
<h3>A Subsection</h3>
<p>Content...</p>
      `,
      explanation: 'Maintaining a correct heading hierarchy ensures the page outline is clear and navigable for all users.'
    }
  },
  {
    id: 'html-has-lang',
    title: 'Page Must Have a Language Attribute',
    wcag: '3.1.1 Language of Page (Level A)',
    description: 'The <html> element must have a `lang` attribute with a valid language tag (e.g., `lang="en"` for English). This helps assistive technologies, like screen readers, to correctly pronounce the content.',
    commonMistake: {
      code: `
<!DOCTYPE html>
<html>
  <head>...</head>
  <body>...</body>
</html>
      `,
      explanation: 'Without a \'lang\' attribute, a screen reader will use its default language setting, which can lead to mispronunciation of words if the page content is in a different language.'
    },
    solution: {
      code: `
<!DOCTYPE html>
<html lang="en">
  <head>...</head>
  <body>...</body>
</html>
      `,
      explanation: 'Adding the \'lang\' attribute to the <html> tag informs assistive technologies about the primary language of the page, ensuring correct text-to-speech rendering.'
    }
  },
  {
    id: 'document-title',
    title: 'Page Must Have a Descriptive Title',
    wcag: '2.4.2 Page Titled (Level A)',
    description: 'Every web page must have a `<title>` element in the `<head>` section that is unique and descriptive. This title is the first piece of information announced by screen readers and is crucial for orientation.',
    commonMistake: {
      code: `
<!-- No title element -->
<head>
  <meta charset="UTF-8">
</head>

<!-- Non-descriptive title -->
<head>
  <title>My Webpage</title>
</head>
      `,
      explanation: 'Without a descriptive title, users don\'t know the purpose of the page when switching between browser tabs or navigating their history. It causes confusion and disorientation.'
    },
    solution: {
      code: `
<head>
  <title>Contact Us - Awesome Company Inc.</title>
</head>

<head>
  <title>Q3 Sales Report | Internal Dashboard</title>
</head>
      `,
      explanation: 'A good title is specific and concise. It should identify the page\'s purpose first, followed by the site name, helping users quickly understand where they are.'
    }
  },
  {
    id: 'focus-visible',
    title: 'Keyboard Focus Indicator Must Be Visible',
    wcag: '2.4.7 Focus Visible (Level AA)',
    description: 'Any interactive element that can receive keyboard focus must have a visible focus indicator. It is a common but harmful practice to remove the default browser outline without providing a styled alternative.',
    commonMistake: {
      code: `
/* In CSS */
button:focus {
  outline: none;
}
      `,
      explanation: 'Removing the outline entirely makes it impossible for keyboard-only users to see which element is currently active, effectively making the site unusable for them.'
    },
    solution: {
      code: `
/* In CSS */
button:focus-visible {
  outline: 2px solid #4F46E5; /* A custom, high-contrast outline */
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.4);
}
      `,
      explanation: 'Instead of removing the outline, style it to match your site\'s design. The `:focus-visible` pseudo-class is modern and preferred, as it only shows the focus ring for keyboard users, not mouse clicks.'
    }
  },
  {
    id: 'no-autoplay',
    title: 'Audio Should Not Play Automatically',
    wcag: '1.4.2 Audio Control (Level A)',
    description: 'Audio on a web page must not play automatically for more than 3 seconds. If it does, there must be a visible control to pause or stop the audio. Unexpected audio can be disruptive and interfere with screen readers.',
    commonMistake: {
      code: `
<video src="ad.mp4" autoplay></video>

<audio src="background-music.mp3" autoplay loop></audio>
      `,
      explanation: 'Autoplaying media can be startling and can prevent a screen reader user from hearing the screen reader\'s output, making navigation impossible.'
    },
    solution: {
      code: `
<!-- Give the user control -->
<video src="intro.mp4" controls></video>

<!-- If autoplay is essential, provide a mute button -->
<video src="background.mp4" autoplay muted loop></video>
      `,
      explanation: 'The best practice is to avoid autoplay entirely. If it\'s a critical feature, ensure the media is muted by default and provide clear controls for the user to play, pause, and adjust the volume.'
    }
  },
  {
    id: 'resize-text',
    title: 'Text Must Be Resizable',
    wcag: '1.4.4 Resize text (Level AA)',
    description: 'Users must be able to resize text up to 200 percent without loss of content or functionality. This is crucial for users with low vision who need to magnify page content to read it.',
    commonMistake: {
      code: `
/* In CSS */
.card {
  font-size: 16px;
  height: 50px; /* Fixed height */
  overflow: hidden; /* Hides overflowing content */
}
      `,
      explanation: 'Using fixed pixel units for font sizes and container dimensions (especially `height`) can cause text to be cut off or overlap when the user zooms in, making it unreadable.'
    },
    solution: {
      code: `
/* In CSS */
.card {
  font-size: 1rem; /* Relative unit */
  min-height: 3.125em; /* Allows container to grow */
}
      `,
      explanation: 'Use relative units like `rem` or `em` for font sizes and spacing. Use `min-height` instead of `height` to allow containers to expand, and avoid `overflow: hidden` on text containers.'
    }
  },
  {
    id: 'images-of-text',
    title: 'Avoid Using Images of Text',
    wcag: '1.4.5 Images of Text (Level AA)',
    description: 'Do not use an image to display text if the same visual presentation can be made using CSS. Text in images becomes pixelated when zoomed and is not customizable by the user.',
    commonMistake: {
      code: `
<!-- Using an image for a heading to get a fancy font -->
<img src="fancy-header.png" alt="Welcome to Our Awesome Site!">
      `,
      explanation: 'Using an image for a heading makes the text inaccessible to screen readers (even with alt text, it\'s not "real" text) and it degrades badly when resized. It also harms SEO.'
    },
    solution: {
      code: `
<h1>Welcome to Our Awesome Site!</h1>

<!-- In CSS -->
@import url('https://fonts.googleapis.com/css2?family=Lobster');

h1 {
  font-family: 'Lobster', cursive;
  font-size: 3rem;
  color: #4F46E5;
}
      `,
      explanation: 'Use HTML text and style it with CSS. Web fonts and modern CSS properties can create almost any visual effect, while keeping the text accessible, searchable, and scalable. Logos are a valid exception to this rule.'
    }
  },
  {
    id: 'error-suggestion',
    title: 'Provide Suggestions for Input Errors',
    wcag: '3.3.3 Error Suggestion (Level AA)',
    description: 'When a user makes an input error and the system can determine a correction, provide that suggestion to the user. This helps users with cognitive disabilities or those who make frequent typos.',
    commonMistake: {
      code: `
<!-- User types "gamil.com" instead of "gmail.com" -->
<label for="email">Email</label>
<input id="email" type="email" value="user@gamil.com" aria-invalid="true">
<p class="error">Error: Invalid email domain.</p>
      `,
      explanation: 'Simply stating that there\'s an error is not as helpful as it could be. The user is forced to figure out the mistake on their own, which can be frustrating and lead to abandonment.'
    },
    solution: {
      code: `
<!-- Suggesting a fix for the typo -->
<label for="email">Email</label>
<input id="email" type="email" value="user@gamil.com" aria-invalid="true">
<p class="error">
  Invalid email domain. Did you mean 
  <a href="#" onclick="correctEmail('user@gmail.com')">gmail.com</a>?
</p>
      `,
      explanation: 'By suggesting a likely correction (e.g., using a library to check for common domain misspellings), you reduce cognitive load and make it easier for the user to fix the mistake and complete the form.'
    }
  },
  {
    id: 'bypass-blocks',
    title: 'Provide a "Skip to Content" Link',
    wcag: '2.4.1 Bypass Blocks (Level A)',
    description: 'Provide a mechanism to bypass blocks of content that are repeated on multiple web pages, like site headers and navigation menus. This is typically done with a "skip to main content" link.',
    commonMistake: {
      code: `
<body>
  <header>
    <!-- ... lots of links ... -->
  </header>
  <main>
    <!-- Main content starts here -->
  </main>
</body>
      `,
      explanation: 'Without a skip link, keyboard-only users must tab through every single link in the header on every page they visit before reaching the main content, which is repetitive and time-consuming.'
    },
    solution: {
      code: `
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header>
    <!-- ... lots of links ... -->
  </header>
  <main id="main-content">
    <!-- Main content starts here -->
  </main>
</body>

<!-- In CSS -->
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
      `,
      explanation: 'A "skip link" is the first focusable element on the page. It is usually hidden off-screen and becomes visible only when it receives keyboard focus, providing a direct shortcut to the main content.'
    }
  },
  {
    id: 'parsing',
    title: 'Ensure Clean and Valid HTML (Parsing)',
    wcag: '4.1.1 Parsing (Level A)',
    description: 'Content implemented using markup languages must have complete start and end tags, elements must be nested according to their specifications, elements may not contain duplicate attributes, and any IDs must be unique.',
    commonMistake: {
      code: `
<div id="user-profile">
  <p>Welcome, user!</div>
</p>

<button id="submit-btn">Submit</button>
<a href="#" id="submit-btn">Cancel</a>
      `,
      explanation: 'Improperly nested tags and duplicate IDs can cause assistive technologies to parse the page incorrectly, leading to unpredictable behavior, jumbled content, or completely inaccessible components.'
    },
    solution: {
      code: `
<div id="user-profile">
  <p>Welcome, user!</p>
</div>

<button id="submit-btn">Submit</button>
<a href="#" id="cancel-btn">Cancel</a>
      `,
      explanation: 'Write valid HTML. Ensure all tags are properly opened, closed, and nested. Use a tool like the W3C Markup Validation Service to check for parsing errors. Ensure all `id` attributes are unique on the page.'
    }
  },
  {
    id: 'on-focus',
    title: 'Avoid Unexpected Changes on Focus',
    wcag: '3.2.1 On Focus (Level A)',
    description: 'When a component receives focus, it must not initiate a change of context. For example, focusing on a form input should not unexpectedly open a new window or submit a form.',
    commonMistake: {
      code: `
<!-- This select box navigates as soon as it's focused -->
<select onfocus="window.location.href=this.value">
  <option value="/home">Home</option>
  <option value="/about">About</option>
</select>
      `,
      explanation: 'Unexpected changes of context can be disorienting for all users, but especially for those with cognitive or visual impairments who may not realize the context has shifted.'
    },
    solution: {
      code: `
<!-- User must explicitly activate the navigation -->
<select id="nav-select">
  <option value="/home">Home</option>
  <option value="/about">About</option>
</select>
<button onclick="window.location.href=document.getElementById('nav-select').value">
  Go
</button>
      `,
      explanation: 'Context changes should only be triggered by an explicit user action, such as clicking a button or pressing Enter, not simply by moving focus to an element.'
    }
  },
  {
    id: 'on-input',
    title: 'Avoid Unexpected Changes on Input',
    wcag: '3.2.2 On Input (Level A)',
    description: 'Changing the setting of any user interface component (like checking a checkbox or entering text) does not automatically cause a change of context unless the user has been advised of the behavior before using the component.',
    commonMistake: {
      code: `
<!-- This select box submits the form immediately -->
<form>
  <select name="sort" onchange="this.form.submit()">
    <option value="price">Sort by Price</option>
    <option value="name">Sort by Name</option>
  </select>
</form>
      `,
      explanation: 'Automatically submitting a form when a user makes a selection can be confusing. Users may not be finished with the form or may have selected an option by mistake.'
    },
    solution: {
      code: `
<!-- Let the user decide when to submit -->
<form>
  <select name="sort">
    <option value="price">Sort by Price</option>
    <option value="name">Sort by Name</option>
  </select>
  <button type="submit">Apply Filter</button>
</form>
      `,
      explanation: 'Provide a dedicated submit button so the user is in full control of when the form is submitted and the context changes.'
    }
  },
  {
    id: 'multiple-ways',
    title: 'Provide Multiple Ways to Navigate',
    wcag: '2.4.5 Multiple Ways (Level AA)',
    description: 'Offer users more than one way to locate a specific web page within a set of pages. Exceptions are made for pages that are a step in a process, like a checkout flow.',
    commonMistake: {
      code: `
<!-- A site with only a complex, multi-level navigation menu -->
<nav>
  <!-- Main navigation menu is the only way to find pages -->
</nav>
      `,
      explanation: 'Some users may find complex navigation menus difficult to use. Providing an alternative, like a search bar, helps users find content in the way that is easiest for them.'
    },
    solution: {
      code: `
<header>
  <nav>...</nav>
  <form role="search">
    <input type="search" placeholder="Search site...">
    <button type="submit">Search</button>
  </form>
</header>
<footer>
  <a href="/sitemap">Site Map</a>
</footer>
      `,
      explanation: 'Common methods include a main navigation menu, a site-specific search feature, and a link to a site map or table of contents.'
    }
  },
  {
    id: 'consistent-navigation',
    title: 'Use Consistent Navigation Across Pages',
    wcag: '3.2.3 Consistent Navigation (Level AA)',
    description: 'Navigational mechanisms that are repeated on multiple web pages within a set of web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.',
    commonMistake: {
      code: `
<!-- Homepage: Navigation is in the header -->
<header><nav>...</nav></header>

<!-- About Page: Navigation is in a left sidebar -->
<aside><nav>...</nav></aside>
      `,
      explanation: 'Inconsistent navigation placement forces users to re-learn the page layout on each page, which can be confusing and increase cognitive load.'
    },
    solution: {
      code: `
<!-- All Pages: Navigation is always in the header -->
<header><nav>...</nav></header>
      `,
      explanation: 'Keep repeating components like headers, navigation bars, and footers in the same place and in the same order across every page of your site. This creates a predictable and easy-to-use experience.'
    }
  },
  {
    id: 'consistent-identification',
    title: 'Use Consistent Identification for Components',
    wcag: '3.2.4 Consistent Identification (Level AA)',
    description: 'Components that have the same functionality within a set of web pages are identified consistently. This applies to labels, names, and text alternatives.',
    commonMistake: {
      code: `
<!-- Page 1 -->
<button aria-label="Add to your shopping list">
  <svg><!-- plus icon --></svg>
</button>

<!-- Page 2 -->
<button aria-label="Save to cart">
  <svg><!-- plus icon --></svg>
</button>
      `,
      explanation: 'Using different labels or names for the same function (e.g., "Add to cart" vs. "Save to cart") can confuse users, especially those who rely on screen readers or have cognitive impairments.'
    },
    solution: {
      code: `
<!-- All Pages -->
<button aria-label="Add to cart">
  <svg><!-- plus icon --></svg>
</button>
      `,
      explanation: 'If an icon or component performs the same action across the site, ensure its accessible name and visible label (if any) are always the same.'
    }
  },
  {
    id: 'status-messages',
    title: 'Announce Status Messages to Screen Readers',
    wcag: '4.1.3 Status Messages (Level AA)',
    description: 'For status messages that provide feedback to the user on the result of an action, ensure the message is programmatically determined so it can be presented to the user by assistive technologies without receiving focus.',
    commonMistake: {
      code: `
<div id="status-message"></div>

<script>
  // After a successful action...
  document.getElementById('status-message').textContent = 'Item added to cart!';
</script>
      `,
      explanation: 'When a message appears visually on the screen, screen reader users are often unaware of it because it does not have focus. They may not know if their action was successful.'
    },
    solution: {
      code: `
<div id="status-message" role="status" aria-live="polite"></div>

<script>
  // After a successful action...
  document.getElementById('status-message').textContent = 'Item added to cart!';
</script>
      `,
      explanation: 'Use an ARIA live region (`role="status"` or `aria-live="polite"`) on the container for status messages. This tells assistive technologies to monitor the container and announce any changes to its content.'
    }
  },
  {
    id: 'language-of-parts',
    title: 'Identify Language of Page Sections',
    wcag: '3.1.2 Language of Parts (Level AA)',
    description: 'The human language of each passage or phrase in the content can be programmatically determined. This is important when content on a page contains text in multiple languages.',
    commonMistake: {
      code: `
<!-- An English page with a French phrase -->
<p>In Paris, it is common to say, "C'est la vie."</p>
      `,
      explanation: 'Without a `lang` attribute on the French phrase, an English-speaking screen reader will attempt to pronounce it with English phonetics, making it unintelligible.'
    },
    solution: {
      code: `
<p>
  In Paris, it is common to say, 
  "<span lang="fr">C'est la vie</span>."
</p>
      `,
      explanation: 'Wrap foreign words or phrases in an element (like a `<span>`) and add the appropriate `lang` attribute to ensure correct pronunciation by text-to-speech software.'
    }
  }
];
