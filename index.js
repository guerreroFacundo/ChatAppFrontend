import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App'; // Asegúrate de que App.js esté presente en tu proyecto

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
