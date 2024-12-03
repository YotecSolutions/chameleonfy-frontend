/**
 * List of genres used in the application.
 * @constant {string[]}
 */
const genres = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
    "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut",
    "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris",
    "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure",
    "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore",
    "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non",
    "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
    "est", "laborum", "praesentium", "autem", "asperiores", "minima", "accusamus", "vel",
    "nemo", "quibusdam", "consequuntur", "sapiente", "natus", "distinctio", "ratione",
    "voluptates", "molestias", "deleniti", "omnis", "aliquid", "quisquam", "maxime", "quod",
    "fugiat", "quasi", "necessitatibus", "doloremque", "adipisci", "laboriosam", "culpa",
    "impedit", "tempore", "quas", "eius", "facilis", "rerum", "suscipit", "delectus", "velit",
    "itaque", "similique", "aspernatur", "ullam", "ducimus", "saepe", "dignissimos", "error",
    "odio", "veritatis", "exercitationem", "neque", "maiores", "aut", "temporibus"
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
