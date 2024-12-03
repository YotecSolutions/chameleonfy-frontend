/**
 * List of genres used in the application.
 * @constant {string[]}
 */
const genres = [
    "acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues",
    "bossa-nova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical",
    "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco",
    "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french",
    "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock",
    "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie",
    "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin",
    "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age",
    "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep",
    "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton",
    "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes",
    "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish",
    "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"
];

/**
 * Generates an array of HSLA rainbow colors.
 * @function generateRainbowColors
 * @param {number} count - Number of colors to generate.
 * @param {number} [alpha=0.8] - Alpha transparency for the colors.
 * @returns {string[]} Array of HSLA color strings.
 */
const generateRainbowColors = (count: number, alpha: number = 0.8): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
        const hue = (i * 360 / count); // Distributes colors evenly across the hue spectrum
        const lightness = 45 + (i % 2) * 10; // Alternates between lightness levels for distinction
        const saturation = 75; // Fixed saturation for vivid colors
        const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        colors.push(color);
    }
    return colors;
};

/**
 * Array of colors corresponding to the genres.
 * @constant {string[]}
 */
const genreColors = generateRainbowColors(genres.length);

/**
 * Combines genres with their associated colors.
 * @constant {Object[]}
 * @property {string} name - The name of the genre.
 * @property {string} color - The HSLA color associated with the genre.
 */
const genresWithColors = genres.map((genre, index) => ({
    name: genre,
    color: genreColors[index]
}));

export default genresWithColors;
