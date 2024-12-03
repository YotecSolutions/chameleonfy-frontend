import { Position } from './chart';

/**
 * Interface representing a genre button with name, color, and position.
 */
export interface GenreButton {
    name: string;
    color: string;
    position: Position;
}

/**
 * Props interface for the GenreSelectorHome component
 * @interface GenreSelectorHomeProps
 * @property {string[]} genres - List of genres
 * @property {string} selectedGenre - Selected genre
 * @property {(genre: string) => void} onGenreSelect - Function to handle genre selection
 */
export interface GenreSelectorHomeProps {
    genres: { name: string; color: string; }[];
    selectedGenre: string;
    onGenreSelect: (genre: string) => void;
}



