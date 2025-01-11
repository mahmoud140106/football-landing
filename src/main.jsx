import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./components/theme-provider.tsx"
import { Provider } from "react-redux";
import store from "./store/index.js";


createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>,
  </Provider>
)
