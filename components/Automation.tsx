import React, { useState } from 'react';
import CodeBlock from './CodeBlock';

type AutomationTool = 'cli' | 'component' | 'e2e' | 'ci';

const Pa11yGuide: React.FC = () => {
    const [url, setUrl] = useState('https://example.com');
    const pa11yCommand = `npx pa11y ${url}`;

    return (
        <>
            <p>
                For one-off scans or simple scripting from your command line, we recommend <a href="https://github.com/pa11y/pa11y" target="_blank" rel="noopener noreferrer">Pa11y</a>. It programmatically launches a headless browser to test pages against accessibility standards.
            </p>
            
            <h4>Quickest Start: `npx`</h4>
            <p>Run a scan directly from your terminal without any installation.</p>

            <div className="not-prose my-6">
                <label htmlFor="url-input" className="block text-sm font-medium text-slate-300 mb-2">Enter a URL to generate a scan command:</label>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="url"
                        id="url-input"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-grow bg-slate-900 text-slate-300 p-2 rounded-md font-mono text-sm border-2 border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                        placeholder="https://example.com"
                    />
                </div>
                 <div className="mt-4">
                    <p className="text-sm text-slate-400">Copy and run this in your terminal:</p>
                    <CodeBlock lang="bash">{pa11yCommand}</CodeBlock>
                </div>
            </div>

            <h4>Advanced Scripting</h4>
            <p>For more complex scenarios, like testing pages behind a login, you can add Pa11y and Playwright to your project.</p>
             <CodeBlock lang="bash">npm install --save-dev pa11y playwright</CodeBlock>
        </>
    );
};

const JestAxeGuide: React.FC = () => (
    <>
        <p>
            Catch accessibility issues in your components before they are even committed. <a href="https://github.com/nickcolley/jest-axe" target="_blank" rel="noopener noreferrer">`jest-axe`</a> integrates `axe-core` directly into your Jest tests.
        </p>
        
        <h4>1. Installation</h4>
        <CodeBlock lang="bash">npm install --save-dev jest-axe</CodeBlock>

        <h4>2. Setup</h4>
        <p>It's helpful to set up a helper file (e.g., `tests/setup.js`) to extend `expect` with `jest-axe` matchers.</p>
        <CodeBlock lang="javascript">
{`// In your jest setup file (e.g., jest.setup.js)
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);`}
        </CodeBlock>
        
        <h4>3. Example Test</h4>
        <p>Now, you can test your rendered components for accessibility violations.</p>
        <CodeBlock lang="javascript">
{`import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import MyComponent from './MyComponent';

it('should have no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  
  // Note: an empty rules object can be passed to disable rules
  // for components that you are knowingly testing with a11y issues.
  expect(results).toHaveNoViolations();
});`}
        </CodeBlock>
    </>
);

const CypressAxeGuide: React.FC = () => (
    <>
        <p>
            Test the accessibility of your application in a real browser during your end-to-end tests with <a href="https://github.com/component-driven/cypress-axe" target="_blank" rel="noopener noreferrer">`cypress-axe`</a>.
        </p>
        
        <h4>1. Installation</h4>
        <CodeBlock lang="bash">npm install --save-dev cypress-axe</CodeBlock>

        <h4>2. Setup</h4>
        <p>Import `cypress-axe` in your Cypress support file (e.g., `cypress/support/e2e.js`).</p>
        <CodeBlock lang="javascript">import 'cypress-axe';</CodeBlock>
        
        <h4>3. Example E2E Test</h4>
        <p>Inject Axe into the page and then call `cy.checkA11y()` to run the scan. You can scan the whole page or target specific elements.</p>
        <CodeBlock lang="javascript">
{`describe('My Page Accessibility', () => {
  beforeEach(() => {
    cy.visit('/my-page');
    // Inject the axe-core runtime
    cy.injectAxe();
  });

  it('Should have no accessibility violations on page load', () => {
    // Scan the entire page
    cy.checkA11y();
  });

  it('Should have no violations within the main content area', () => {
    // Scan a specific element (and its children)
    cy.checkA11y('main');
  });
});`}
        </CodeBlock>
    </>
);

const Pa11yCiGuide: React.FC = () => (
    <>
        <p>
            For a dedicated CI/CD step, <a href="https://github.com/pa11y/pa11y-ci" target="_blank" rel="noopener noreferrer">`pa11y-ci`</a> is an excellent tool. It scans a list of URLs and can be configured to fail your build if it finds issues, preventing regressions.
        </p>

        <h4>1. Installation</h4>
        <CodeBlock lang="bash">npm install --save-dev pa11y-ci</CodeBlock>

        <h4>2. Configuration</h4>
        <p>Create a configuration file named `.pa11yci.json` in your project's root directory.</p>
        <CodeBlock lang="json">
{`{
  "defaults": {
    "timeout": 15000,
    "standard": "WCAG2AA",
    "level": "error"
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/about",
    "http://localhost:3000/contact",
    {
      "url": "http://localhost:3000/dashboard",
      "actions": [
        "wait for path to be /dashboard"
      ]
    }
  ]
}`}
        </CodeBlock>

        <h4>3. Run in CI</h4>
        <p>Add a script to your `package.json` and call it from your CI pipeline.</p>
        <CodeBlock lang="json">
{`"scripts": {
  "test:a11y:ci": "pa11y-ci"
}`}
        </CodeBlock>
        <p>Your CI job would typically start your server, wait for it to be ready, and then run `npm run test:a11y:ci`.</p>
    </>
);


const Automation: React.FC = () => {
    const [activeTool, setActiveTool] = useState<AutomationTool>('cli');
    
    const navItemClasses = "flex-1 px-3 py-2 text-sm font-medium transition-colors text-center rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500";
    const activeClasses = "bg-slate-700 text-white";
    const inactiveClasses = "text-slate-400 hover:bg-slate-800 hover:text-white";

    const guides: Record<AutomationTool, React.ReactNode> = {
        cli: <Pa11yGuide />,
        component: <JestAxeGuide />,
        e2e: <CypressAxeGuide />,
        ci: <Pa11yCiGuide />,
    };

    return (
        <div className="max-w-4xl mx-auto prose prose-invert prose-headings:text-slate-100 prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">Automated Accessibility Testing</h2>
                <p className="mt-2 text-lg text-slate-400">
                    Integrate accessibility checks throughout your entire development workflow, from local testing to CI/CD pipelines.
                </p>
            </div>

            <div className="not-prose my-8">
                 <div className="flex space-x-2 bg-slate-800/50 p-1 rounded-lg">
                    <button onClick={() => setActiveTool('cli')} className={`${navItemClasses} ${activeTool === 'cli' ? activeClasses : inactiveClasses}`}>
                        CLI
                    </button>
                    <button onClick={() => setActiveTool('component')} className={`${navItemClasses} ${activeTool === 'component' ? activeClasses : inactiveClasses}`}>
                        Component Testing
                    </button>
                     <button onClick={() => setActiveTool('e2e')} className={`${navItemClasses} ${activeTool === 'e2e' ? activeClasses : inactiveClasses}`}>
                        E2E Testing
                    </button>
                     <button onClick={() => setActiveTool('ci')} className={`${navItemClasses} ${activeTool === 'ci' ? activeClasses : inactiveClasses}`}>
                        CI/CD
                    </button>
                </div>
            </div>

            <div className="mt-6">
                {guides[activeTool]}
            </div>

        </div>
    );
};

export default Automation;
