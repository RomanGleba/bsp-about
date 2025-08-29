import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './appRouter';
import './styles/global.scss';
import './i18n.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={appRouter} />
    </React.StrictMode>
);
