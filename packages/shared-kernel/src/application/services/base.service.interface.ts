/**
 * Base Service Interface
 * @module shared-kernel/application/services
 *
 * Pure interface — কোনো external import নেই।
 */

/**
 * Domain Service Interface (লিংকের pattern)
 *
 * Domain services expose multiple use-case methods (login, register, ...)।
 * Entity + Id — domain context binding।
 */
export interface BaseServiceInterface<
  TEntity = unknown,
  TId = string,
> {
  readonly name: string;
  /**
   * Phantom type markers — domain binding।
   * Runtime-এ ব্যবহার হয় না, শুধু compile-time discrimination-এর জন্য।
   */
  readonly __entity?: TEntity;
  readonly __id?: TId;
}

/**
 * Read Service Interface
 */
export interface ReadServiceInterface<
  TQuery = unknown,
  TOutput = unknown,
> {
  readonly name: string;
  read(query: TQuery): Promise<TOutput>;
}

/**
 * Single-method Service Interface (legacy-compatible)
 */
export interface SingleMethodServiceInterface<
  TInput = unknown,
  TOutput = unknown,
> {
  readonly name: string;
  execute(input: TInput): Promise<TOutput>;
}
