'use client';

import { Suspense, type ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Loading } from './Loading';

export interface SuspenseBoundaryProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly errorFallback?: (error: Error, reset: () => void) => ReactNode;
}

/**
 * Combines ErrorBoundary + Suspense.
 * Rule: "Missing suspense boundary" — Forbidden.
 */
export function SuspenseBoundary({
  children,
  fallback,
  errorFallback,
}: SuspenseBoundaryProps): JSX.Element {
  return (
    <ErrorBoundary {...(errorFallback !== undefined && { fallback: errorFallback })}>
      <Suspense fallback={fallback ?? <Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
