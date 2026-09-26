/**
 * Base Query Handler
 * @module shared-kernel/application/queries
 *
 * References BaseQuery।
 */
import type { BaseQuery } from './base.query';

export abstract class BaseQueryHandler<TQuery extends BaseQuery = BaseQuery, TResult = unknown> {
  abstract readonly queryType: string;
  abstract execute(query: TQuery): Promise<TResult>;
}
