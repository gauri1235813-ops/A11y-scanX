import React from 'react';
import CodeBlock from './CodeBlock';

const IntegrationGuide: React.FC = () => {
    const inspectorPort = '5173'; // Assuming a common dev port
    const inspectorUrl = `http://localhost:${inspectorPort}/index.js`;
    
    // Minified bookmarklet for the href attribute for a cleaner link
    const bookmarkletHref = `javascript:(function(){if(document.getElementById('a11y-inspector-root')){alert('A11y Inspector is already loaded.');return;}var r=document.createElement('div');r.id='a11y-inspector-root';document.body.appendChild(r);var s=document.createElement('script');s.src='${inspectorUrl}';s.type='module';document.body.appendChild(s);})();`;
    
    // Formatted code for display in the code block
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
                    Two ways to use the A11y Inspector on your own running project.
                </p>
            </div>

            <h3>Method 1: Add Script to Project (Recommended)</h3>
            <p>
                This method is reliable and ensures the inspector is always available during development. You only need to make two small additions to your project's main HTML file (usually `public/index.html`).
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
                Next, include the inspector's JavaScript bundle. This script will find the mount point you just added and load the tool. Add this line right after the mount point `div`.
            </p>
            <CodeBlock lang="html">
                {`<!-- Load the A11y Inspector script -->
<script src="${inspectorUrl}" defer></script>`}
            </CodeBlock>
            <div className="not-prose my-4 p-4 border-l-4 border-yellow-500 bg-yellow-900/30 text-yellow-300 rounded-r-md">
                <p className="font-semibold">Important!</p>
                <p className="text-sm">
                    Make sure the port in the URL (`${inspectorPort}` in this example) matches the port where your A11y Inspector project is running.
                </p>
            </div>
            
            <hr className="border-slate-700 my-12" />

            <h3>Method 2: Zero-Setup Bookmarklet</h3>
            <p>
                If you prefer not to modify any project files, you can use a bookmarklet. This is a browser bookmark that runs JavaScript to inject the inspector onto any page you're viewing.
            </p>
            <ol>
                <li>First, ensure the A11y Inspector project is running locally (e.g., via `npm start`).</li>
                <li className="my-2">
                    Drag the following link to your browser's bookmarks bar.
                    <div className="not-prose my-4">
                        <a 
                            href={bookmarkletHref}
                            className="inline-block bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
                            onClick={(e) => e.preventDefault()}
                        >
                            A11y Inspector
                        </a>
                    </div>
                </li>
                <li>Navigate to your own project's page in the browser.</li>
                <li>Click the "A11y Inspector" bookmark you just created. The tool will appear on the page.</li>
            </ol>
            <p>
                Alternatively, you can manually create a bookmark and paste the following code into the URL/Location field.
            </p>
            <CodeBlock lang="javascript">
                {bookmarkletDisplayCode}
            </CodeBlock>
        </div>
    );
};

export default IntegrationGuide;
