/**
 * Infrastructure Error Types
 * @module shared-types/common/errors
 */

export interface InfrastructureError {
  readonly name: 'InfrastructureError';
  readonly code: string;
  readonly message: string;
  readonly service: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface DatabaseError extends InfrastructureError {
  readonly service: 'database';
  readonly operation: string;
  readonly table?: string;
}

export interface CacheError extends InfrastructureError {
  readonly service: 'cache';
  readonly key?: string;
}

export interface QueueError extends InfrastructureError {
  readonly service: 'queue';
  readonly queueName: string;
  readonly jobId?: string;
}

export interface ExternalServiceError extends InfrastructureError {
  readonly service: string;
  readonly endpoint?: string;
  readonly statusCode?: number;
}

export interface TimeoutError extends InfrastructureError {
  readonly service: string;
  readonly timeoutMs: number;
}
