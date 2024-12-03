/**
 * Props for the DecadeSelectorHome component.
 * @interface DecadeSelectorHomeProps
 * @property {string} startDecade - The initially selected decade.
 * @property {(decade: string) => void} onDecadeChange - Callback function triggered when the decade is changed.
 */
export interface DecadeSelectorHomeProps {
    startDecade: string;
    onDecadeChange: (decade: string) => void;
}

/**
 * Props for the DecadeSelectorSpectrum component.
 * @interface DecadeSelectorSpectrumProps
 * @property {string[]} decades - Array of available decades for selection.
 * @property {string} selectedDecade - The currently selected decade.
 * @property {(decade: string) => void} onSelectDecade - Callback function triggered when a decade is selected.
 */
export interface DecadeSelectorSpectrumProps {
    decades: string[];
    selectedDecade: string;
    onSelectDecade: (decade: string) => void;
}
