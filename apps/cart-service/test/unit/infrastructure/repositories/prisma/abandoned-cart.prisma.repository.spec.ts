import { jest } from '@jest/globals';

jest.mock('@vubon/shared-kernel/prisma', () => ({
  PrismaService: class PrismaService {},
}));

import { AbandonedCartPrismaRepository } from '../../../../../src/module/infrastructure/persistence/prisma/repositories/abandoned-cart.prisma.repository.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makePrisma(): Record<string, unknown> {
  return {
    abandonedCart: {
      findUnique: jest.fn(() => Promise.reject(new Error('engine fail'))),
      findMany: jest.fn(() => Promise.reject(new Error('engine fail'))),
      findFirst: jest.fn(() => Promise.reject(new Error('engine fail'))),
      count: jest.fn(() => Promise.reject(new Error('engine fail'))),
      create: jest.fn(),
      update: jest.fn(),
    },
  };
}

describe('AbandonedCartPrismaRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findById returns null on error', async () => {
    const repo = new AbandonedCartPrismaRepository(makePrisma() as never);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findPending returns empty array on error', async () => {
    const repo = new AbandonedCartPrismaRepository(makePrisma() as never);
    expect(await repo.findPending()).toEqual([]);
  });

  it('getStats returns zeros on error', async () => {
    const repo = new AbandonedCartPrismaRepository(makePrisma() as never);
    const r = await repo.getStats();
    expect(r.total).toBe(0);
  });
});
