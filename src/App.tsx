import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/styles/global.css';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Spectrum = React.lazy(() => import('./pages/Spectrum/Spectrum'));
const Blablu = React.lazy(() => import('./pages/Blablu/Blablu'));

const LoadingFallback = () => (
    <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
    </div>
);

/**
 * Router configuration with error boundaries and loading states
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: '/spectrum',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Spectrum />
                    </Suspense>
                ),
            },
            {
                path: '/blablu',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Blablu />
                    </Suspense>
                ),
            },
        ],
    },
], {
    future: {
        v7_relativeSplatPath: true,
        v7_startTransition: true,
        v7_skipActionErrorRevalidation: true,
        v7_enableNewPendingState: true, // Added future flag for new pending state management.
    },
});

/**
 * Root application component
 * @returns {JSX.Element} The rendered App with providers and routing
 */
const App: React.FC = () => (
    <React.StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);

export default App;
