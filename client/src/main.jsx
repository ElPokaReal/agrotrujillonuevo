import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeContext.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider>
                <App />
        </ThemeProvider>
    </React.StrictMode>
)