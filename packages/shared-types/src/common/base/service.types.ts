/**
 * Service Interface Types
 * @module shared-types/common/base
 *
 * Application + domain service contracts।
 */

export interface Service<TInput = unknown, TOutput = unknown> {
  execute(input: TInput): Promise<TOutput>;
}

export interface DomainService {
  readonly name: string;
}

export interface ApplicationService<TInput = unknown, TOutput = unknown> extends Service<
  TInput,
  TOutput
> {
  readonly name: string;
}

export interface Handler<TInput = unknown, TOutput = unknown> {
  handle(input: TInput): Promise<TOutput>;
}

export interface Validator<TInput = unknown> {
  validate(input: TInput): boolean;
}
