import { useState } from 'react';
import styles from './Navbar.module.css';
import ThemeToggle from '../themeToggle/ThemeToggle';
import LogoText from '../logoText/LogoText';

/**
 * Navbar component for navigation and theme toggle.
 * @component
 * @returns {JSX.Element} The rendered Navbar component.
 */
function Navbar() {
    const navigation = {
        home: 'Home',
        spectrum: 'Spectrum',
        blablu: 'Blablu',
    };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    /**
     * Toggles the mobile menu state.
     */
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prevState => !prevState);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles['navbar-left-side']}>
                <a href="/" className={styles.logo}>
                    <LogoText />
                </a>
            </div>
            <input
                type="checkbox"
                id="navbar-toggle"
                className={styles['navbar-toggle']}
                checked={isMobileMenuOpen}
                onChange={toggleMobileMenu}
            />
            <div className={styles['navbar-links-container']}>
                <ul className={styles['navbar-links']}>
                    <li className={styles['navbar-links-list']}>
                        <a href="/" className={styles['navbar-link']}>{navigation.home}</a>
                    </li>
                    <li className={styles['navbar-links-list']}>
                        <a href="/spectrum" className={styles['navbar-link']}>{navigation.spectrum}</a>
                    </li>
                    <li className={styles['navbar-links-list']}>
                        <a href="/blablu" className={styles['navbar-link']}>{navigation.blablu}</a>
                    </li>
                </ul>
            </div>
            <div className={styles['theme-toggle']}>
                <ThemeToggle />
            </div>
        </nav>
    );
}

export default Navbar;
