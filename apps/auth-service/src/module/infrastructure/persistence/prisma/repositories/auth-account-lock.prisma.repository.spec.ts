/**
 * AuthAccountLockPrismaRepository — Unit Tests
 */
import { jest } from '@jest/globals';

import { AuthAccountLockPrismaRepository } from './auth-account-lock.prisma.repository.js';

const mockPrisma = () => ({
  authAccountLock: {
    findUnique: jest.fn() as jest.Mock,
    findFirst: jest.fn() as jest.Mock,
    findMany: jest.fn() as jest.Mock,
    create: jest.fn() as jest.Mock,
    update: jest.fn() as jest.Mock,
    delete: jest.fn() as jest.Mock,
    count: jest.fn() as jest.Mock,
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');
const future = new Date(now.getTime() + 3_600_000);

const prismaLock = (overrides: Record<string, unknown> = {}) => ({
  id: 'lock-1',
  userId: 'user-1',
  reason: 'too_many_attempts',
  lockedAt: now,
  expiresAt: future,
  unlockedAt: null,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('AuthAccountLockPrismaRepository', () => {
  let repo: AuthAccountLockPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthAccountLockPrismaRepository(prisma as never);
  });

  describe('findActiveByUser()', () => {
    it('should return null when no active lock', async () => {
      prisma.authAccountLock.findFirst.mockResolvedValue(null);
      expect(await repo.findActiveByUser('user-1' as never, now.getTime())).toBeNull();
    });

    it('should map to domain entity', async () => {
      prisma.authAccountLock.findFirst.mockResolvedValue(prismaLock());
      const result = await repo.findActiveByUser('user-1' as never, now.getTime());
      expect(result?.id).toBe('lock-1');
      expect(result?.reason.value).toBe('too_many_attempts');
    });
  });

  describe('findAllByUser()', () => {
    it('should return mapped list', async () => {
      prisma.authAccountLock.findMany.mockResolvedValue([prismaLock()]);
      const result = await repo.findAllByUser('user-1' as never);
      expect(result).toHaveLength(1);
    });
  });

  describe('findAutoUnlockable()', () => {
    it('should query expired locks', async () => {
      prisma.authAccountLock.findMany.mockResolvedValue([prismaLock()]);
      const result = await repo.findAutoUnlockable(now.getTime());
      expect(result).toHaveLength(1);
    });
  });
});
