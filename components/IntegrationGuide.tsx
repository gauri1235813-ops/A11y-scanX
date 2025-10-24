import React from 'react';
import CodeBlock from './CodeBlock';

const IntegrationGuide: React.FC = () => {
    // Dynamically get the base URL. Works for localhost and deployed environments.
    const inspectorBaseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-deployed-url.com';
    const inspectorUrl = `${inspectorBaseUrl}/index.tsx`;

    // The bookmarklet code now uses the dynamically generated URL.
    const bookmarkletHref = `javascript:(function(){if(document.getElementById('a11y-inspector-root')){return;}var r=document.createElement('div');r.id='a11y-inspector-root';document.body.appendChild(r);var s=document.createElement('script');s.src='${inspectorUrl}';s.type='module';document.body.appendChild(s);})();`;

    const bookmarkletDisplayCode = `
javascript:(function() {
  // Check if the inspector is already loaded
  if (document.getElementById('a11y-inspector-root')) {
    alert('A11y Inspector is already loaded.');
    return;
  }

  // 1. Create the mount point div
  const rootDiv = document.createElement('div');
  rootDiv.id = 'a11y-inspector-root';
  document.body.appendChild(rootDiv);

  // 2. Create and inject the script tag
  const script = document.createElement('script');
  script.src = '${inspectorUrl}';
  script.type = 'module';
  document.body.appendChild(script);
})();
`.trim();

    return (
        <div className="max-w-4xl mx-auto prose prose-invert prose-headings:text-slate-100 prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">Integration Guide</h2>
                <p className="mt-2 text-lg text-slate-400">
                    Two ways to use the A11y Inspector on your own project during development.
                </p>
            </div>

            <h3>Method 1: Zero-Setup Bookmarklet (Recommended)</h3>
            <p>
                This is the easiest way to use the inspector on any site, including your local development environment. It requires no changes to your project's code.
            </p>
            <div className="not-prose my-6 flex items-center justify-center">
                 <a 
                    href={bookmarkletHref}
                    onClick={(e) => e.preventDefault()}
                    className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-150 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
                 >
                    Drag me to your bookmarks bar
                </a>
            </div>
            <p>
                Simply drag the button above to your browser's bookmarks bar. Then, navigate to any page you want to test and click the bookmark. The A11y Inspector will appear.
            </p>

            <hr className="border-slate-700 my-12" />

            <h3>Method 2: Add Script to Project (Manual Setup)</h3>
            <p>
                If you prefer, you can add the tool directly to a project by editing its main HTML file (usually `public/index.html`).
            </p>

            <h4>Step 1: Add the Mount Point</h4>
            <p>
                The inspector needs a dedicated `&lt;div&gt;` to render into. This prevents it from conflicting with your application's own root element. Add the following line just before the closing `&lt;/body&gt;` tag in your HTML file.
            </p>
            <CodeBlock lang="html">
                {`<!-- Add this div for the A11y Inspector to mount itself -->
<div id="a11y-inspector-root"></div>`}
            </CodeBlock>

            <h4>Step 2: Add the Script Tag</h4>
            <p>
                Next, include the inspector's JavaScript bundle from this tool's URL. This script will find the mount point and load the tool.
            </p>
            <CodeBlock lang="html">
                {`<!-- Load the A11y Inspector script -->
<script src="${inspectorUrl}" type="module" defer></script>`}
            </CodeBlock>
            <div className="not-prose my-4 p-4 border-l-4 border-yellow-500 bg-yellow-900/30 text-yellow-300 rounded-r-md">
                <p className="font-semibold">Note</p>
                <p className="text-sm">
                    The URL is generated based on where you're currently viewing this tool. When you deploy the A11y Inspector, the URL in the script tag will automatically point to your production host.
                </p>
            </div>

        </div>
    );
};

export default IntegrationGuide;