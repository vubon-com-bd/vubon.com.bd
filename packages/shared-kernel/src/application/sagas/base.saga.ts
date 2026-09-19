/**
 * Base Saga
 * @module shared-kernel/application/sagas
 *
 * Pure abstraction — কোনো external import নেই।
 */
export abstract class BaseSaga<TContext = unknown> {
  abstract readonly name: string;
  protected context!: TContext;

  protected setContext(context: TContext): void {
    this.context = context;
  }

  getContext(): TContext {
    return this.context;
  }

  abstract execute(input: unknown): Promise<void>;
  abstract compensate(): Promise<void>;
}
