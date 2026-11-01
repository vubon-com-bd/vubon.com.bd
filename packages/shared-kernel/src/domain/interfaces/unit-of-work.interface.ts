/**
 * Unit of Work Interface
 * @module shared-kernel/domain/interfaces
 *
 * Pure interface — কোনো external import নেই।
 */
export interface UnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export interface UnitOfWorkContext {
  readonly id: string;
  readonly startedAt: number;
  readonly transaction?: unknown;
}
