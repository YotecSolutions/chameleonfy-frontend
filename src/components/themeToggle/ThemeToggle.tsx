/**
 * @fileoverview ThemeToggle component that allows users to switch between light and dark themes.
 * @module ThemeToggle
 */

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

/**
 * ThemeToggle component for switching between light and dark themes.
 * @component
 * @returns {JSX.Element} The rendered ThemeToggle component.
 */
const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <label className={styles['theme']}>
            {/* Toggle switch input */}
            <input
                id="theme"
                className={styles['theme-toggle']}
                type="checkbox"
                role="switch"
                name="theme"
                onChange={toggleTheme}
                checked={theme === 'dark'}
            />
            {/* Icon representing the theme state */}
            <span className={styles['theme-icon']}>
                {Array.from({ length: 9 }).map((_, index) => (
                    <span key={index} className={styles['theme-icon-part']}></span>
                ))}
            </span>
        </label>
    );
};

export default ThemeToggle;
