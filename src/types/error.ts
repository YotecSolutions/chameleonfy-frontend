import { ReactNode, ErrorInfo } from 'react';

/**
 * Props interface for the ErrorBoundary component
 * @interface ErrorBoundaryProps
 * @example
 * <ErrorBoundary>
 *   <ChildComponent />
 * </ErrorBoundary>
 */
export interface ErrorBoundaryProps {
    children?: ReactNode;
}

/**
 * State interface for the ErrorBoundary component
 * @interface ErrorBoundaryState
 * @property {boolean} hasError - Indicates if an error has occurred
 * @property {Error | null} error - The caught error object or null
 * @property {ErrorInfo | null} errorInfo - React error information or null
 */
export interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}