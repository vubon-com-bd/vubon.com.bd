/**
 * Prisma Service Mock — for repository unit tests
 * @module user-service/test/helpers
 *
 * Since Prisma engine cannot load on Termux/Android, we test
 * repositories by mocking PrismaService directly.
 */
import { jest } from '@jest/globals';

export interface MockPrismaDelegate {
  findUnique: jest.Mock;
  findFirst: jest.Mock;
  findMany: jest.Mock;
  create: jest.Mock;
  update: jest.Mock;
  upsert: jest.Mock;
  delete: jest.Mock;
  deleteMany: jest.Mock;
  updateMany: jest.Mock;
  count: jest.Mock;
  createMany: jest.Mock;
}

export function createPrismaDelegateMock(): MockPrismaDelegate {
  return {
    findUnique: jest.fn().mockResolvedValue(null),
    findFirst: jest.fn().mockResolvedValue(null),
    findMany: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(null),
    upsert: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue(null),
    deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
    updateMany: jest.fn().mockResolvedValue({ count: 0 }),
    count: jest.fn().mockResolvedValue(0),
    createMany: jest.fn().mockResolvedValue({ count: 0 }),
  };
}

export function createPrismaServiceMock() {
  return {
    user: createPrismaDelegateMock(),
    userProfile: createPrismaDelegateMock(),
    userSetting: createPrismaDelegateMock(),
    userPreference: createPrismaDelegateMock(),
    userAddress: createPrismaDelegateMock(),
    userContact: createPrismaDelegateMock(),
    userKyc: createPrismaDelegateMock(),
    userActivity: createPrismaDelegateMock(),
    $transaction: jest.fn().mockImplementation(async (fn: (tx: unknown) => Promise<unknown>) => {
      return fn(createPrismaServiceMock());
    }),
  };
}

export function buildUserRow(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    id: 'user-1',
    email: 'user@example.com',
    name: 'John Doe',
    phone: null,
    status: 'active',
    type: 'individual',
    emailVerified: true,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    deletedAt: null,
    ...overrides,
  };
}
