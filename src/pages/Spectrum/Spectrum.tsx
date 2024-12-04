/**
 * @fileoverview Spectrum page component. Displays the spectrum page with a bubble chart visualization.
 * @module Spectrum
 */

import React from 'react';
import styles from './Spectrum.module.css';
import BubbleChart from '../../components/bubbleChart/BubbleChart';

/**
 * Spectrum component.
 * @component
 * @description Displays the spectrum page with a bubble chart visualization.
 * @returns {JSX.Element} The rendered Spectrum page.
 */
const Spectrum: React.FC = () => {
    return (
        <main className={styles.main}>
            {/* Bubble chart visualization */}
            <BubbleChart />
        </main>
    );
}

export default Spectrum;
