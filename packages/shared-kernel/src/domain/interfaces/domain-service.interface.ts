/**
 * Domain Service Interface
 * @module shared-kernel/domain/interfaces
 *
 * Pure interface — কোনো external import নেই।
 */
export interface DomainService {
  readonly name: string;
}

export interface StatelessDomainService extends DomainService {
  execute(...args: readonly unknown[]): unknown;
}

export interface StatefulDomainService<TState = unknown> extends DomainService {
  getState(): TState;
  setState(state: TState): void;
}
