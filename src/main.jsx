import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./components/theme-provider.tsx"
import { Provider } from "react-redux";
import store from "./store/index.js";
import { I18nProvider } from "./context/i18n-context.jsx"; // Import the I18nProvider
import { HelmetProvider } from "react-helmet-async";



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <I18nProvider>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </I18nProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>,
  </Provider>
)
