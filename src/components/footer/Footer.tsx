import React from 'react';
import styles from './Footer.module.css';

/**
 * Footer component for the application
 * @component
 * @returns {JSX.Element} Renders the footer with copyright and branding
 */
const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>
                © {currentYear}{' '}
                <span className={styles.footerBrand}>
                    Made by <span className={styles['footer-brand']}>Yotec</span>
                </span>
            </p>
        </footer>
    );
};

export default Footer;