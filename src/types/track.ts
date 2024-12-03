/**
 * Interface representing a basic track recommendation.
 * @interface TrackRecommendation
 * @property {string} name - The name of the track.
 * @property {string} artist - The artist of the track.
 * @property {string} url - The URL of the track (e.g., Spotify link).
 * @property {number} valence - The emotional positivity of the track, ranging from 0 to 1.
 * @property {number} energy - The energy level of the track, ranging from 0 to 1.
 */
export interface TrackRecommendation {
    name: string;
    artist: string;
    url: string;
    valence: number;
    energy: number;
}

/**
 * Interface extending TrackRecommendation with an additional color property.
 * @interface TrackRecommendationWithColor
 * @extends TrackRecommendation
 * @property {string} color - A color associated with the track for visualization purposes.
 */
export interface TrackRecommendationWithColor extends TrackRecommendation {
    color: string;
}

/**
 * Interface representing detailed information about a music track.
 * @interface Track
 * @property {string} trackName - The name of the track.
 * @property {string} artistName - The name of the artist.
 * @property {string} spotifyUrl - The Spotify URL for the track.
 * @property {string} albumPhotoUrl - The URL of the album cover image.
 * @property {number} energy - The energy level of the track, ranging from 0 to 1.
 * @property {number} valence - The emotional positivity of the track, ranging from 0 to 1.
 * @property {string} genre - The genre of the track.
 * @property {string} decade - The decade of the track's release.
 * @property {string} releaseDate - The full release date of the track.
 */
export interface Track {
    trackName: string;
    artistName: string;
    spotifyUrl: string;
    albumPhotoUrl: string;
    energy: number;
    valence: number;
    genre: string;
    decade: string;
    releaseDate: string;
}

/**
 * Interface representing raw track data, typically retrieved from an external source.
 * @interface RawTrackData
 * @property {string} id - The unique identifier of the track.
 * @property {string} name - The name of the track.
 * @property {string} artist - The name of the artist.
 * @property {string} genre - The genre of the track.
 * @property {string} decade - The decade of the track's release.
 * @property {number} energy - The energy level of the track, ranging from 0 to 1.
 * @property {number} valence - The emotional positivity of the track, ranging from 0 to 1.
 * @property {number} danceability - The danceability level of the track.
 * @property {number} tempo - The tempo of the track in beats per minute (BPM).
 * @property {number} durationMs - The duration of the track in milliseconds.
 * @property {string | undefined} previewUrl - Optional URL to a preview of the track.
 * @property {string | undefined} albumCover - Optional URL to the album cover image.
 */
export interface RawTrackData {
    id: string;
    name: string;
    artist: string;
    genre: string;
    decade: string;
    energy: number;
    valence: number;
    danceability: number;
    tempo: number;
    durationMs: number;
    previewUrl?: string;
    albumCover?: string;
}

/**
 * Interface representing processed track data, typically used within the application.
 * @interface ProcessedTrack
 * @property {string} id - The unique identifier of the track.
 * @property {string} name - The name of the track.
 * @property {string} artist - The name of the artist.
 * @property {string} genre - The genre of the track.
 * @property {string} decade - The decade of the track's release.
 * @property {number} energy - The energy level of the track, ranging from 0 to 1.
 * @property {number} valence - The emotional positivity of the track, ranging from 0 to 1.
 * @property {number} danceability - The danceability level of the track.
 * @property {number} tempo - The tempo of the track in beats per minute (BPM).
 * @property {number} duration - The duration of the track in seconds.
 * @property {string | null} previewUrl - URL to a preview of the track, or null if not available.
 * @property {string | null} albumCover - URL to the album cover image, or null if not available.
 */
export interface ProcessedTrack {
    id: string;
    name: string;
    artist: string;
    genre: string;
    decade: string;
    energy: number;
    valence: number;
    danceability: number;
    tempo: number;
    duration: number;
    previewUrl: string | null;
    albumCover: string | null;
}
