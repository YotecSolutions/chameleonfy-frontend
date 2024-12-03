/**
 * Interface representing a position with x and y coordinates.
 * @interface Position
 * @property {number} x - The X-coordinate of the position.
 * @property {number} y - The Y-coordinate of the position.
 */
export interface Position {
    x: number;
    y: number;
}

/**
 * Interface representing a single data point in a bubble chart.
 * @interface BubbleDataPoint
 * @property {number} x - The X-coordinate of the bubble.
 * @property {number} y - The Y-coordinate of the bubble.
 * @property {number} r - The radius of the bubble.
 * @property {string} id - A unique identifier for the bubble.
 * @property {string} name - The name of the track represented by the bubble.
 * @property {string} artist - The artist associated with the track.
 * @property {string} genre - The genre of the track.
 * @property {string} decade - The release decade of the track.
 */
export interface BubbleDataPoint {
    x: number;
    y: number;
    r: number;
    id: string;
    name: string;
    artist: string;
    genre: string;
    decade: string;
}

/**
 * Interface representing a dataset for a bubble chart.
 * @interface ChartDataset
 * @property {string} label - The label for the dataset.
 * @property {BubbleDataPoint[]} data - An array of bubble data points in the dataset.
 * @property {string} backgroundColor - The background color of the dataset's bubbles.
 * @property {string} borderColor - The border color of the dataset's bubbles.
 * @property {number} borderWidth - The width of the border around each bubble.
 */
export interface ChartDataset {
    label: string;
    data: BubbleDataPoint[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
}

/**
 * Interface representing the state of bubble chart data.
 * @interface BubblesDataState
 * @property {ChartDataset[]} datasets - An array of datasets used in the bubble chart.
 */
export interface BubblesDataState {
    datasets: ChartDataset[];
}
