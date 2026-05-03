import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './lib/i18n';
import './index.css';

// On GitHub Pages, the site is served from /repo-name/.
// Vite injects this via import.meta.env.BASE_URL (matches the `base` config).
// Strip trailing slash since BrowserRouter expects "/repo-name" not "/repo-name/".
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <App />
        <Toaster position="top-center" />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
