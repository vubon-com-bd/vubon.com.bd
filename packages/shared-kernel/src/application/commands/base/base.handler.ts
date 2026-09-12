import { BaseCommand } from './base.command';

/**
 * Command Handler Interface
 * কমান্ড হ্যান্ডলার ইন্টারফেস
 */
export interface ICommandHandler<TCommand extends BaseCommand<TResult>, TResult = unknown> {
  handle(command: TCommand): Promise<TResult>;
}

/**
 * Command Handler Abstract Class
 * কমান্ড হ্যান্ডলারের বেস ক্লাস
 */
export abstract class BaseCommandHandler<
  TCommand extends BaseCommand<TResult>,
  TResult = unknown,
> implements ICommandHandler<TCommand, TResult> {
  abstract handle(command: TCommand): Promise<TResult>;

  protected handleError(error: unknown): never {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }

  protected async executeWithLogging<T>(
    operation: () => Promise<T>,
    commandName: string
  ): Promise<T> {
    try {
      const result = await operation();
      return result;
    } catch (error) {
      console.error(`Command ${commandName} failed:`, error);
      throw error;
    }
  }
}
