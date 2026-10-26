/**
 * @nestjs/cqrs shim — used ONLY in unit tests.
 * @module notification-service/test/shims
 */
/* istanbul ignore file */
import { jest } from '@jest/globals';
import { filter, type OperatorFunction } from 'rxjs';

export const CommandHandler = (_cmd?: unknown): ClassDecorator => () => {};
export const QueryHandler = (_q?: unknown): ClassDecorator => () => {};
export const EventsHandler = (_ev?: unknown): ClassDecorator => () => {};

export const ICommandHandler = Symbol('ICommandHandler');
export const IQueryHandler = Symbol('IQueryHandler');
export const IEventHandler = Symbol('IEventHandler');

export const CommandBus = class {
  execute = jest.fn();
  register = jest.fn();
};

export const QueryBus = class {
  execute = jest.fn();
  register = jest.fn();
};

export const EventBus = class {
  publish = jest.fn();
  publishAll = jest.fn();
};

export const Saga = (): MethodDecorator => () => {};

/* istanbul ignore next */
export function ofType<TInput = unknown, TOutput extends TInput = TInput>(
  ...types: readonly unknown[]
): OperatorFunction<TInput, TOutput> {
  return (source) =>
    source.pipe(
      filter((value: TInput): value is TOutput & TInput => {
        for (const type of types) {
          if (type instanceof Function && value instanceof type) {
            return true;
          }
        }
        return false;
      }),
    ) as never;
}

export class BaseCommand {}
export class BaseQuery {}

export default {};
