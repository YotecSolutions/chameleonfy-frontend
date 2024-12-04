/** 
 * @fileoverview Logo component that adapts to current theme
 * @module Logo
 */
import React, { useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import LogoLight from '../../assets/images/chameleonfy-text-light-theme.svg';
import LogoDark from '../../assets/images/chameleonfy-text-dark-theme.svg';
import styles from './Logo.module.css';

/**
 * Logo component that adapts to current theme
 * @component
 * @returns {JSX.Element} Theme-aware logo image
 */
const Logo: React.FC = () => {
    const { theme } = useTheme();

    const logoProps = useMemo(() => ({
        src: theme === 'dark' ? LogoDark : LogoLight,
        alt: "Chameleonfy - Music Mood Visualizer",
        className: styles['logo-image'],
        loading: "lazy" as const,
        width: "320",
        height: "80",
        onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            console.error('Logo failed to load:', target.src);
        }
    }), [theme]);

    return <img {...logoProps} />;
};

export default React.memo(Logo);