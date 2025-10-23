
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('a11y-inspector-root');
if (!rootElement) {
  // Gracefully fail if the mount point isn't found.
  // This prevents crashes when the script is injected into a page without the required div.
  console.warn("A11y Inspector mount point '#a11y-inspector-root' not found. The tool will not be loaded.");
} else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
}
