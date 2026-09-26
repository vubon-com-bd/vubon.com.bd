/**
 * Factory Pattern Base
 * @module shared-kernel/domain/base
 *
 * Pure abstraction — কোনো external import নেই।
 */
export abstract class BaseFactory<TInput, TOutput> {
  abstract create(input: TInput): TOutput;
}

export interface AsyncFactory<TInput, TOutput> {
  create(input: TInput): Promise<TOutput>;
}

export abstract class AbstractFactory<TKey extends string | number | symbol, TInput, TOutput> {
  private readonly registry = new Map<TKey, (input: TInput) => TOutput>();

  protected register(key: TKey, factory: (input: TInput) => TOutput): void {
    this.registry.set(key, factory);
  }

  create(key: TKey, input: TInput): TOutput {
    const factory = this.registry.get(key);
    if (!factory) {
      throw new Error(`No factory registered for key: ${String(key)}`);
    }
    return factory(input);
  }

  has(key: TKey): boolean {
    return this.registry.has(key);
  }
}
