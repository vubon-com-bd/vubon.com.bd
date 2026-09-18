/**
 * Base Service Interface
 * @module shared-kernel/application/services
 *
 * Pure interface — কোনো external import নেই।
 */
export interface BaseServiceInterface<TInput = unknown, TOutput = unknown> {
  readonly name: string;
  execute(input: TInput): Promise<TOutput>;
}

export interface ReadServiceInterface<TQuery = unknown, TOutput = unknown> {
  readonly name: string;
  read(query: TQuery): Promise<TOutput>;
}
