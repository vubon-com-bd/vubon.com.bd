/**
 * Auth2FaPrismaRepository — Unit Tests
 */
import { jest } from '@jest/globals';

import { Auth2FaPrismaRepository } from './auth-2fa.prisma.repository.js';

const mockPrisma = () => ({
  auth2Fa: {
    findUnique: jest.fn() as jest.Mock,
    findMany: jest.fn() as jest.Mock,
    create: jest.fn() as jest.Mock,
    update: jest.fn() as jest.Mock,
    delete: jest.fn() as jest.Mock,
    count: jest.fn() as jest.Mock,
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prisma2Fa = () => ({
  id: '2fa-1',
  userId: 'user-1',
  isEnabled: true,
  method: 'totp',
  backupCodesRemaining: 0,
  enabledAt: now,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
});

describe('Auth2FaPrismaRepository', () => {
  let repo: Auth2FaPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new Auth2FaPrismaRepository(prisma as never);
  });

  it('findByUser returns mapped entity', async () => {
    prisma.auth2Fa.findUnique.mockResolvedValue(prisma2Fa());
    const result = await repo.findByUser('user-1' as never);
    expect(result?.id).toBe('2fa-1');
    expect(result?.isEnabled()).toBe(true);
  });

  it('findByUser returns null when missing', async () => {
    prisma.auth2Fa.findUnique.mockResolvedValue(null);
    expect(await repo.findByUser('missing' as never)).toBeNull();
  });

  it('findEnabledByUsers returns empty for empty input', async () => {
    expect(await repo.findEnabledByUsers([])).toEqual([]);
    expect(prisma.auth2Fa.findMany).not.toHaveBeenCalled();
  });
});
