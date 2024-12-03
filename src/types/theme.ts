/**
 * Interface representing the theme context for the application.
 * @interface ThemeContextType
 * @property {'light' | 'dark'} theme - The current theme mode of the application, either 'light' or 'dark'.
 * @property {() => void} toggleTheme - A function to toggle between light and dark themes.
 */
export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}
