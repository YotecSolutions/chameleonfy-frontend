import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeContextType } from '../types/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component for managing theme context.
 * Provides `theme` state and a `toggleTheme` function to its children.
 * @component
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - The child components wrapped by the provider.
 * @returns {JSX.Element} The ThemeProvider with context.
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(savedTheme || (prefersDarkMode ? 'dark' : 'light'));
        document.body.className = savedTheme || (prefersDarkMode ? 'dark' : 'light');
    }, []);

    /**
     * Toggles the theme between 'light' and 'dark'.
     * Updates the theme in localStorage and applies it to the document body.
     */
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.className = newTheme;
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Custom hook to access the ThemeContext.
 * Throws an error if used outside a ThemeProvider.
 * @returns {ThemeContextType} The current theme and the toggleTheme function.
 */
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
