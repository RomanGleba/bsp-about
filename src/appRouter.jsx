import { createBrowserRouter } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import App from './App.jsx';
import Products from './pages/products/Products.jsx';
import Contacts from "@/pages/contact/Contact.jsx";

// Ліниві сторінки
const Home  = lazy(() => import('./pages/home/Home.jsx'));
const About = lazy(() => import('./pages/about/About.jsx'));

const Fallback = <div style={{ padding: 24 }} />;

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Suspense fallback={Fallback}><Home /></Suspense> },
            { path: 'about', element: <Suspense fallback={Fallback}><About /></Suspense> },
            { path: 'products', element: <Suspense fallback={Fallback}><Products /></Suspense> },
            { path: 'contacts', element: <Contacts /> },
        ],
    },
]);
