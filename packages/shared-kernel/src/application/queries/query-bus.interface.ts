/**
 * Query Bus Interface
 * @module shared-kernel/application/queries
 *
 * References BaseQuery।
 */
import type { BaseQuery } from './base.query';

export interface QueryBus {
  execute<TResult = unknown>(query: BaseQuery): Promise<TResult>;
  register(queryType: string, handler: (query: BaseQuery) => Promise<unknown>): void;
}
