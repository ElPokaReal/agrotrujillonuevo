import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './components/ThemeContext'
import Background from './components/Background.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
            <ThemeProvider>
            <Background>
                <App />
            </Background>
        </ThemeProvider>
  </React.StrictMode>,
);