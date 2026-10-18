/**
 * MockPrismaService — supports both `prisma.user` AND `prisma.getModel('user')`
 * @module identity-service/test/fixtures/infrastructure
 */
import { jest } from '@jest/globals';

export interface MockDelegate {
  findUnique: jest.Mock;
  findFirst: jest.Mock;
  findMany: jest.Mock;
  create: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
  count: jest.Mock;
  updateMany: jest.Mock;
  deleteMany: jest.Mock;
  aggregate: jest.Mock;
  groupBy: jest.Mock;
}

export function makeMockDelegate(): MockDelegate {
  return {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    updateMany: jest.fn(),
    deleteMany: jest.fn(),
    aggregate: jest.fn(),
    groupBy: jest.fn(),
  };
}

export interface MockPrismaService {
  getModel: <T = MockDelegate>(name: string) => T;
  getDelegate: (name: string) => MockDelegate;
  isHealthy: jest.Mock;
  isEngineAvailable: jest.Mock;
  $connect: jest.Mock;
  $disconnect: jest.Mock;
  $transaction: jest.Mock;
  [modelName: string]: MockDelegate | jest.Mock | ((...args: unknown[]) => unknown);
}

/**
 * Make a fake AuthPrismaService that mimics the kernel PrismaService API:
 *   - prisma.getModel('authToken') → MockDelegate
 *   - prisma.user / prisma.authSession (Proxy convenience)
 *   - isHealthy, isEngineAvailable, $connect, $disconnect
 */
export function makeMockPrismaService(modelNames: string[] = []): MockPrismaService {
  const delegates = new Map<string, MockDelegate>();

  const getOrCreate = (name: string): MockDelegate => {
    if (!delegates.has(name)) delegates.set(name, makeMockDelegate());
    return delegates.get(name)!;
  };

  for (const name of modelNames) getOrCreate(name);

  const base: Record<string, unknown> = {
    getModel: <T = MockDelegate>(name: string): T => getOrCreate(name) as unknown as T,
    getDelegate: getOrCreate,
    isHealthy: jest.fn(async () => true),
    isEngineAvailable: jest.fn(() => true),
    $connect: jest.fn(async () => undefined),
    $disconnect: jest.fn(async () => undefined),
    $transaction: jest.fn(async (fn: (tx: unknown) => Promise<unknown>) => {
      return fn(base);
    }),
  };

  return new Proxy(base, {
    get(target: Record<string, unknown>, prop: string | symbol): unknown {
      if (typeof prop === 'symbol') return target[prop as never];
      if (prop in target) return target[prop];
      return getOrCreate(prop);
    },
  }) as unknown as MockPrismaService;
}

export type MockPrisma = ReturnType<typeof makeMockPrismaService>;
