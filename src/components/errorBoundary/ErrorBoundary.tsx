/**
 * @fileoverview Error Boundary component to catch and handle React rendering errors
 * @component ErrorBoundary
 */

import React, { Component, ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.css';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/error';

/**
 * Error Boundary component to catch and handle React rendering errors
 * @component
 * @extends {Component<ErrorBoundaryProps, ErrorBoundaryState>}
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
            errorInfo: null
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <div className={styles.errorContainer}>
                    <h1>Something went wrong</h1>
                    <p>{this.state.error?.message}</p>
                    <button
                        onClick={this.handleReset}
                        className={styles.resetButton}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;