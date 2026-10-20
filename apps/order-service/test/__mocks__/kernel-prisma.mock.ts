/**
 * Mock for @vubon/shared-kernel/infrastructure/persistence/prisma
 * @module order-service/test/__mocks__
 */
export abstract class PrismaService {
  protected engineAvailable = false;

  async onModuleInit(): Promise<void> {
    /* noop */
  }
  async onModuleDestroy(): Promise<void> {
    /* noop */
  }
  async isHealthy(): Promise<boolean> {
    return false;
  }
  isEngineAvailable(): boolean {
    return false;
  }
  getModel<T>(_name: string): T {
    throw new Error('Prisma engine unavailable (test mock)');
  }
  get $transaction(): unknown {
    return () => Promise.resolve([]);
  }
  get $queryRaw(): unknown {
    return () => Promise.resolve([{ 1: 1 }]);
  }
  get $connect(): unknown {
    return () => Promise.resolve();
  }
  get $disconnect(): unknown {
    return () => Promise.resolve();
  }
}

export class PrismaModule {}

export abstract class BasePrismaRepository<TEntity = unknown> {
  protected abstract findById(id: string): Promise<TEntity | null>;
}

export type PrismaClientType = unknown;
export interface PrismaClientOptions {
  readonly url?: string;
}
