
# How to Use the A11y Inspector

This guide explains how to inject the A11y Inspector into your own running React application to perform live accessibility scans during development.

The inspector is designed as a self-contained widget that runs alongside your app without interfering with its code.

## Prerequisites

- You have a React application that you can run locally (e.g., using `npm start`).
- You have the A11y Inspector project running in a separate terminal.

## 3-Step Integration Guide

To use the inspector on your project, you only need to make two small additions to your project's `public/index.html` file.

### Step 1: Add the Mount Point

The inspector needs a dedicated `<div>` to render into. This prevents it from conflicting with your application's own root element (which is typically `<div id="root">`).

In your project's `public/index.html` file, add the following line just before the closing `</body>` tag:

```html
<!-- Add this div for the A11y Inspector to mount itself -->
<div id="a11y-inspector-root"></div>
```

### Step 2: Add the Script Tag

Next, you need to include the inspector's JavaScript bundle. This script will find the mount point you just added and load the tool.

In your `public/index.html` file, add the following line right after the mount point `div`:

```html
<!-- Load the A11y Inspector script -->
<script src="http://localhost:XXXX/index.js" defer></script>
```

**Important:** Replace `XXXX` with the actual port number where your A11y Inspector project is running.

### Step 3: Run Both Projects

1.  In one terminal, start your React application:
    ```bash
    npm start
    ```
2.  In a second terminal, start the A11y Inspector project:
    ```bash
    npm start 
    ```

Now, open your application in the browser. You should see the A11y Inspector's interface overlaid on your app.

---

## Example `public/index.html`

After making the changes, the `<body>` of your `public/index.html` might look something like this:

```html
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  
  <!-- Your React App's mount point -->
  <div id="root"></div>

  <!-- A11y Inspector Integration -->
  <div id="a11y-inspector-root"></div>
  <script src="http://localhost:5173/index.js" defer></script> <!-- Example with port -->
</body>
```

## How to Scan Your Page

Once the inspector is loaded, simply click the **"Scan Live Page"** button within its UI. The tool will automatically analyze the entire page—excluding its own UI—and present you with a report of any accessibility violations it finds.

---

# Automated Accessibility Testing Workflow

While the A11y Inspector widget is ideal for live debugging, a robust accessibility strategy involves automated checks at every stage of the development process. Here’s how you can integrate various tools into your workflow.

## 1. CLI Scanning with `pa11y`

For quick, one-off scans or simple scripting from your command line.

### Quick Scan (No Install)
Run a scan directly from your terminal using `npx`:
```bash
npx pa11y https://your-app-url.com
```

### Advanced Scripting
For more complex scenarios, like testing pages behind a login, you can add Pa11y and a browser driver like Playwright to your project.
```bash
npm install --save-dev pa11y playwright
```

## 2. Component Testing with `jest-axe`

Catch issues at the earliest stage by testing individual components within your Jest test suite.

### Installation
```bash
npm install --save-dev jest-axe
```

### Setup
To make the matchers available in all your tests, extend `expect` in your Jest setup file (e.g., `jest.setup.js`).
```javascript
// jest.setup.js
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);
```

### Example Test
In your component tests, render the component and use `axe` to check for violations.
```javascript
// MyComponent.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import MyComponent from './MyComponent';

it('should have no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 3. End-to-End Testing with `cypress-axe`

Test user flows and entire pages in a real browser environment as part of your Cypress E2E suite.

### Installation
```bash
npm install --save-dev cypress-axe
```

### Setup
Add the following line to your Cypress support file (`cypress/support/e2e.js`) to make the commands available.
```javascript
// cypress/support/e2e.js
import 'cypress-axe';
```

### Example Test
In your tests, visit a page, inject `axe`, and then call `cy.checkA11y()`. You can scan the entire page or target specific elements.
```javascript
// my-flow.cy.js
describe('My Page Accessibility', () => {
  beforeEach(() => {
    cy.visit('/my-page');
    cy.injectAxe(); // Inject the axe-core runtime
  });

  it('Should have no accessibility violations on page load', () => {
    cy.checkA11y(); // Scan the entire page
  });

  it('Should have no violations within the main content area', () => {
    cy.checkA11y('main'); // Scan a specific element
  });
});
```

## 4. CI/CD Integration with `pa11y-ci`

Prevent accessibility regressions from ever reaching production by adding an automated check to your CI pipeline.

### Installation
```bash
npm install --save-dev pa11y-ci
```

### Configuration
Create a `.pa11yci.json` file in your project root to define which URLs to test and set failure thresholds.
```json
// .pa11yci.json
{
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 15000
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/about",
    {
      "url": "http://localhost:3000/dashboard",
      "actions": [
        "wait for path to be /dashboard"
      ]
    }
  ]
}
```

### Run in CI
Add a script to your `package.json` and execute it in your CI pipeline after your application has been built and is being served.
```json
// package.json
"scripts": {
  "test:a11y:ci": "pa11y-ci"
}
```
A typical CI job would start your server, wait for it to be ready, and then run `npm run test:a11y:ci`.