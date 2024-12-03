import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/global.css';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import Spectrum from './pages/Spectrum/Spectrum';
import Blablu from './pages/Blablu/Blablu';
import { ThemeProvider } from './context/ThemeContext';

/**
 * The root component of the application.
 * @component
 * @description Sets up global providers, routing, and the main layout structure.
 * @returns {JSX.Element} The rendered App component.
 */
const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/spectrum" element={<Spectrum />} />
                        <Route path="/blablu" element={<Blablu />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;
