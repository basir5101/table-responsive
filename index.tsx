
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('Grid App: Initializing...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Grid App: Target container 'root' not found in document.");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('Grid App: React render cycle initiated.');
  } catch (err) {
    console.error('Grid App: Critical mount error:', err);
  }
}
