/**
 * @fileoverview Home page genre selection component
 * @module
 */

import React from 'react';
import styles from './GenreSelectorHome.module.css';
import { GenreSelectorHomeProps } from '../../types/genre';

/**
 * Home page genre selection component
 * @component
 * @param {GenreSelectorHomeProps} props - Component props
 * @returns {JSX.Element} Rendered genre selector
 */
const GenreSelectorHome: React.FC<GenreSelectorHomeProps> = ({
    genres,
    selectedGenre,
    onGenreSelect
}) => {
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor="genre-select">
                Select Music Genre
            </label>
            <select
                id="genre-select"
                className={styles.select}
                value={selectedGenre}
                onChange={(e) => onGenreSelect(e.target.value)}
            >
                <option value="">Choose a genre</option>
                {genres.map((genre) => (
                    <option key={genre.name} value={genre.name}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GenreSelectorHome;