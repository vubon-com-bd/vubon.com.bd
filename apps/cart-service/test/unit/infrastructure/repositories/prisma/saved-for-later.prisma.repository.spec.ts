import { jest } from '@jest/globals';

// Mock the entire shared-kernel prisma module so no engine loads
jest.mock('@vubon/shared-kernel/prisma', () => ({
  PrismaService: class PrismaService {},
}));

/**
 * SavedForLaterPrismaRepository — Unit Tests
 */
import { SavedForLaterPrismaRepository } from '../../../../../src/module/infrastructure/persistence/prisma/repositories/saved-for-later.prisma.repository.js';
import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makePrisma(): Record<string, unknown> {
  return {
    savedItem: {
      findUnique: jest.fn(() => Promise.reject(new Error('engine fail'))),
      findMany: jest.fn(() => Promise.reject(new Error('engine fail'))),
      findFirst: jest.fn(() => Promise.reject(new Error('engine fail'))),
      count: jest.fn(() => Promise.reject(new Error('engine fail'))),
      create: jest.fn(),
      update: jest.fn(),
    },
  };
}

describe('SavedForLaterPrismaRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findById returns null on error', async () => {
    const repo = new SavedForLaterPrismaRepository(makePrisma() as never);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('countByUserId returns 0 on error', async () => {
    const repo = new SavedForLaterPrismaRepository(makePrisma() as never);
    expect(await repo.countByUserId(CartUserIdVO.create(UUID))).toBe(0);
  });

  it('findByUserId returns empty array on error', async () => {
    const repo = new SavedForLaterPrismaRepository(makePrisma() as never);
    expect(await repo.findByUserId(CartUserIdVO.create(UUID))).toEqual([]);
  });
});
