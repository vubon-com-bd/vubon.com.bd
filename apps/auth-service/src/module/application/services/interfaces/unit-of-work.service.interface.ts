/**
 * UnitOfWorkServiceInterface — Transaction boundary abstraction
 * @module auth-service/application/services/interfaces
 *
 * Impl lives in Infrastructure (Prisma $transaction).
 */
export interface UnitOfWorkServiceInterface {
  readonly name: string;
  execute<T>(work: () => Promise<T>): Promise<T>;
}
