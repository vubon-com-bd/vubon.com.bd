import { BaseQuery } from './base.query';

/**
 * Query Handler Interface
 * কোয়েরি হ্যান্ডলার ইন্টারফেস
 */
export interface IQueryHandler<TQuery extends BaseQuery<TResult>, TResult = unknown> {
  handle(query: TQuery): Promise<TResult>;
}

/**
 * Query Handler Abstract Class
 * কোয়েরি হ্যান্ডলারের বেস ক্লাস
 */
export abstract class BaseQueryHandler<
  TQuery extends BaseQuery<TResult>,
  TResult = unknown,
> implements IQueryHandler<TQuery, TResult> {
  abstract handle(query: TQuery): Promise<TResult>;

  protected handleError(error: unknown): never {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }

  protected async executeWithLogging<T>(
    operation: () => Promise<T>,
    queryName: string
  ): Promise<T> {
    try {
      const result = await operation();
      return result;
    } catch (error) {
      console.error(`Query ${queryName} failed:`, error);
      throw error;
    }
  }
}
