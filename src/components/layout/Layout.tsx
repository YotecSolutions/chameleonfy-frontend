import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';

/**
 * Layout component providing consistent page structure with navigation and footer
 * @component
 * @returns {JSX.Element} Layout wrapper with Outlet for route content
 */
const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;