import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import styles from './Layout.module.css';

/**
 * Layout component for wrapping application content with a Navbar and Footer.
 * @component
 * @param {Object} props - Props for the Layout component.
 * @param {React.ReactNode} props.children - The content to be displayed between the Navbar and Footer.
 * @returns {JSX.Element} The rendered Layout component.
 */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
