'use client';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorState } from './ErrorState';

export interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback?: (error: Error, reset: () => void) => ReactNode;
  readonly onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  readonly error: Error | null;
}

/**
 * Error boundary.
 * ⚠️ MUST be a class component — React has no hook API for this.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  private reset = (): void => {
    this.setState({ error: null });
  };

  override render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(error, this.reset);
    return <ErrorState error={error} onRetry={this.reset} />;
  }
}
