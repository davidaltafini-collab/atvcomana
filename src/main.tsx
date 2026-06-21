import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

let hasRendered = false;

const renderApp = () => {
  if (hasRendered) return;
  hasRendered = true;

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

const appStylesheet = document.querySelector<HTMLLinkElement>('link[data-app-css]');
if (appStylesheet && appStylesheet.rel !== 'stylesheet') {
  appStylesheet.addEventListener('load', renderApp, {once: true});

  window.setTimeout(() => {
    if (appStylesheet.rel !== 'stylesheet') {
      appStylesheet.rel = 'stylesheet';
    }

    window.setTimeout(renderApp, 3000);
  }, 1000);
} else {
  renderApp();
}
