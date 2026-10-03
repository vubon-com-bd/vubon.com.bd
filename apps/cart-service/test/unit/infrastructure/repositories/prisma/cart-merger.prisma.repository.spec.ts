import { jest } from '@jest/globals';

jest.mock('@vubon/shared-kernel/prisma', () => ({
  PrismaService: class PrismaService {},
}));

import { CartMergerPrismaRepository } from '../../../../../src/module/infrastructure/persistence/prisma/repositories/cart-merger.prisma.repository.js';
import { CartIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makePrisma(): Record<string, unknown> {
  return {
    cartMerger: {
      findUnique: jest.fn(() => Promise.reject(new Error('engine fail'))),
      findMany: jest.fn(() => Promise.reject(new Error('engine fail'))),
      findFirst: jest.fn(() => Promise.reject(new Error('engine fail'))),
      count: jest.fn(() => Promise.reject(new Error('engine fail'))),
      create: jest.fn(),
      update: jest.fn(),
    },
  };
}

describe('CartMergerPrismaRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findById returns null on error', async () => {
    const repo = new CartMergerPrismaRepository(makePrisma() as never);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findBySourceCartId returns empty array on error', async () => {
    const repo = new CartMergerPrismaRepository(makePrisma() as never);
    expect(await repo.findBySourceCartId(CartIdVO.create(UUID))).toEqual([]);
  });

  it('findLatestByTargetCartId returns null on error', async () => {
    const repo = new CartMergerPrismaRepository(makePrisma() as never);
    expect(await repo.findLatestByTargetCartId(CartIdVO.create(UUID))).toBeNull();
  });
});
