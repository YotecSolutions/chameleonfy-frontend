/**
 * @fileoverview LogoText component that displays the Chameleonfy logo text
 * @module LogoText
 */

import React, { useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import LogoTextLight from '../../assets/images/chameleonfy-just-text-light-theme.svg';
import LogoTextDark from '../../assets/images/chameleonfy-just-text-dark-theme.svg';
import styles from './LogoText.module.css';

/**
 * Theme-aware logo text component
 * @component
 * @returns {JSX.Element} Theme-sensitive logo text image
 */
const LogoText: React.FC = () => {
    const { theme } = useTheme();

    const logoProps = useMemo(() => ({
        src: theme === 'dark' ? LogoTextDark : LogoTextLight,
        alt: "Chameleonfy",
        className: styles['logo-text'],
        loading: "lazy" as const,
        width: "144",
        height: "32",
        onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            console.error('LogoText failed to load:', target.src);
        }
    }), [theme]);

    return <img {...logoProps} />;
};

export default React.memo(LogoText);