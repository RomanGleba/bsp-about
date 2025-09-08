import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './appRouter';
import './styles/global.scss';
import './i18n.js';
import Errors from "./components/Errors/Errors.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Errors>
        <RouterProvider router={appRouter} />
        </Errors>
    </React.StrictMode>
);
