/**
 * @fileoverview A component that displays a spectrum of decade buttons for selection
 * @module DecadeSelectorSpectrum 
 */

import React from 'react';
import styles from './DecadeSelectorSpectrum.module.css';
import { DecadeSelectorSpectrumProps } from '../../types/decade';

/**
 * A component that displays a spectrum of decade buttons for selection
 * @component
 * @param {DecadeSelectorSpectrumProps} props - Component props
 * @returns {JSX.Element} Rendered decade selector component
 */
const DecadeSelectorSpectrum: React.FC<DecadeSelectorSpectrumProps> = ({
    decades,
    selectedDecade,
    onSelectDecade
}) => {
    return (
        <div className={styles.container}>
            <h3>Select Decade:</h3>
            <div className={styles.decadeButtons}>
                {decades.map((decade) => (
                    <button
                        key={decade}
                        className={`${styles.button} ${selectedDecade === decade ? styles.active : ''}`}
                        onClick={() => onSelectDecade(decade)}
                    >
                        {decade}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DecadeSelectorSpectrum;