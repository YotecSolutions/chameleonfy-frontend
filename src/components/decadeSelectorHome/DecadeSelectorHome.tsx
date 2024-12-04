/**  
 * @fileoverview DecadeSelectorHome component that allows the user to select a decade.
 * @module DecadeSelectorHome
*/

import React, { useState } from 'react';
import styles from './DecadeSelectorHome.module.css';
import { DecadeSelectorHomeProps } from '../../types/decade';

/**
 * The allowed decades to be displayed in the decade selector.
 * @type {Array<{ label: string, value: string }>}
 */
const allowedDecades = [
    { label: '>60s', value: '>1960' },
    { label: '70s', value: '1970-1979' },
    { label: '80s', value: '1980-1989' },
    { label: '90s', value: '1990-1999' },
    { label: '2000s', value: '2000-2009' },
    { label: '2010s', value: '2010-2019' },
    { label: '2020s', value: '2020-2029' },
];

/**
 * A component for selecting a decade, with options to navigate through the decades.
 *
 * @component
 * @example
 * const startDecade = '1990-1999';
 * const onDecadeChange = (decade) => console.log(decade);
 * <DecadeSelectorHome startDecade={startDecade} onDecadeChange={onDecadeChange} />
 * 
 * @param {DecadeSelectorHomeProps} props - Component props.
 * @param {string} props.startDecade - The initial decade value.
 * @param {function} props.onDecadeChange - Callback to be called when the selected decade changes.
 * 
 * @returns {React.FC} The DecadeSelectorHome component.
 */
const DecadeSelectorHome: React.FC<DecadeSelectorHomeProps> = ({ startDecade, onDecadeChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(
        allowedDecades.findIndex((decade) => decade.value === startDecade) || 0
    );

    /**
     * Handles the decade change event and updates the selected decade.
     * 
     * @param {number} index - The index of the new selected decade.
     */
    const handleDecadeChange = (index: number) => {
        if (index >= 0 && index < allowedDecades.length) {
            setSelectedIndex(index);
            onDecadeChange(allowedDecades[index].value);
        }
    };

    const canDecrease = selectedIndex > 0;
    const canIncrease = selectedIndex < allowedDecades.length - 1;

    return (
        <div className={styles['container']}>
            <button
                onClick={() => handleDecadeChange(selectedIndex - 1)}
                className={styles['button']}
                aria-label="Previous Decade"
                disabled={!canDecrease}
            >
                -
            </button>
            <span className={styles['decade-display']}>{allowedDecades[selectedIndex].label}</span>
            <button
                onClick={() => handleDecadeChange(selectedIndex + 1)}
                className={styles['button']}
                aria-label="Next Decade"
                disabled={!canIncrease}
            >
                +
            </button>
        </div>
    );
};

export default DecadeSelectorHome;
