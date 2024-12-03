/**
 * Adjusts the transparency of an RGB color by adding an alpha channel.
 * @function transparentize
 * @param {string} color - The original color in `rgb` format (e.g., "rgb(255, 255, 255)").
 * @param {number} opacity - The desired opacity level (range: 0 to 1).
 * @returns {string} The resulting color in `rgba` format with the specified opacity.
 * @example
 * // Converts "rgb(255, 255, 255)" to "rgba(255, 255, 255, 0.5)"
 * transparentize("rgb(255, 255, 255)", 0.5);
 */
export function transparentize(color: string, opacity: number): string {
    const alpha = Math.min(Math.max(0, opacity), 1); // Ensure opacity is between 0 and 1
    return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
}

/**
 * Generates an array of random bubble data points.
 * @function generateBubbles
 * @param {Object} config - Configuration for bubble generation.
 * @param {number} config.min - Minimum value for the `x` and `y` coordinates.
 * @param {number} config.max - Maximum value for the `x` and `y` coordinates.
 * @param {number} config.rmin - Minimum value for the bubble radius (`r`).
 * @param {number} config.rmax - Maximum value for the bubble radius (`r`).
 * @param {number} [count=10] - Number of bubbles to generate (default: 10).
 * @returns {Array<{ x: number; y: number; r: number }>} An array of bubble objects, each with random `x`, `y`, and `r` values.
 * @example
 * // Generates 5 bubbles with coordinates and radii within the specified ranges
 * generateBubbles({ min: 10, max: 100, rmin: 5, rmax: 20 }, 5);
 */
export const generateBubbles = (
    config: { min: number; max: number; rmin: number; rmax: number },
    count: number = 10
) => {
    return Array.from({ length: count }, () => ({
        x: Math.floor(Math.random() * (config.max - config.min) + config.min),
        y: Math.floor(Math.random() * (config.max - config.min) + config.min),
        r: Math.floor(Math.random() * (config.rmax - config.rmin) + config.rmin),
    }));
};
