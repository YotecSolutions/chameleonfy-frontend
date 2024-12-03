import React, { useState } from 'react';
import styles from './DecadeSelectorHome.module.css';
import { DecadeSelectorHomeProps } from '../../types/decade';

const allowedDecades = [
    { label: '>60s', value: '>1960' },
    { label: '70s', value: '1970-1979' },
    { label: '80s', value: '1980-1989' },
    { label: '90s', value: '1990-1999' },
    { label: '2000s', value: '2000-2009' },
    { label: '2010s', value: '2010-2019' },
    { label: '2020s', value: '2020-2029' },
];

const DecadeSelectorHome: React.FC<DecadeSelectorHomeProps> = ({ startDecade, onDecadeChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(
        allowedDecades.findIndex((decade) => decade.value === startDecade) || 0
    );

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
