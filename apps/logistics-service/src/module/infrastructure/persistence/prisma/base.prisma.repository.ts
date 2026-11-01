/**
 * BasePrismaRepository — Re-export from shared-kernel
 * @module logistics-service/infrastructure/persistence/prisma
 */
export { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

export interface PrismaTransactionClient {
  readonly [key: string]: unknown;
}
