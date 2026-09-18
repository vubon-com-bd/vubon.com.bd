/**
 * Query Types
 * @module shared-kernel/application/queries
 *
 * Pure types — কোনো external import নেই।
 */
export interface QueryResult<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
}

export interface QueryMetadata {
  readonly queryId: string;
  readonly issuedAt: number;
  readonly issuerId?: string;
  readonly cached: boolean;
}

export type QueryHandlerFn<TQuery = unknown, TResult = unknown> = (
  query: TQuery
) => Promise<TResult>;
