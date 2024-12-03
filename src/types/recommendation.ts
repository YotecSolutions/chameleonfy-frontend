/**
 * Interface representing a music recommendation.
 * @interface Recommendation
 * @property {number} valence - The emotional positivity of the track, ranging from 0 to 1.
 * @property {number} energy - The energy level of the track, ranging from 0 to 1.
 * @property {string} color - A color associated with the recommendation for visualization purposes.
 * @property {string} trackName - The name of the recommended track.
 * @property {string} artistName - The name of the artist who performed the track.
 */
export interface Recommendation {
    valence: number;
    energy: number;
    color: string;
    trackName: string;
    artistName: string;
}
