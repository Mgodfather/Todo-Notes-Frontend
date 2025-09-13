import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'
// import { ToastProvider } from './context/toast-context.jsx';
// import ToastContainer from '../src/components/toast/toast-container.jsx'


createRoot(document.getElementById('root')).render(
    // <ToastProvider>
        <App />
        // <ToastContainer />
    // </ToastProvider>
);