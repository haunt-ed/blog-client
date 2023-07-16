import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './styles/globals.scss';
import { ThemeContextProvider } from './context/ThemeContext';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ModalProvider } from './context/modalContext/ModalContextProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HashRouter>
      <ThemeContextProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ThemeContextProvider>
    </HashRouter>
  </Provider>
);

reportWebVitals();
