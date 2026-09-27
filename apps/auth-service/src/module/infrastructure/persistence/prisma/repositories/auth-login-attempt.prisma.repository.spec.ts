/**
 * AuthLoginAttemptPrismaRepository — Unit Tests
 */
import { jest } from '@jest/globals';

import { AuthLoginAttemptPrismaRepository } from './auth-login-attempt.prisma.repository.js';
import { LoginAttemptIpVO } from '../../../../domain/value-objects/primitives/login-attempt-ip.vo.js';

const mockPrisma = () => ({
  authLoginAttempt: {
    findUnique: jest.fn() as jest.Mock,
    findMany: jest.fn() as jest.Mock,
    create: jest.fn() as jest.Mock,
    update: jest.fn() as jest.Mock,
    delete: jest.fn() as jest.Mock,
    count: jest.fn() as jest.Mock,
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaAttempt = (overrides: Record<string, unknown> = {}) => ({
  id: 'att-1',
  userId: 'user-1',
  email: 'john@example.com',
  ip: '192.168.1.1',
  userAgent: 'Mozilla',
  status: 'failure',
  attemptedAt: now,
  createdAt: now,
  updatedAt: now,
  ...overrides,
});

describe('AuthLoginAttemptPrismaRepository', () => {
  let repo: AuthLoginAttemptPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthLoginAttemptPrismaRepository(prisma as never);
  });

  it('countRecentFailures returns count', async () => {
    prisma.authLoginAttempt.count.mockResolvedValue(3);
    const count = await repo.countRecentFailures(
      'john@example.com',
      LoginAttemptIpVO.of('192.168.1.1'),
      now.getTime() - 900_000,
    );
    expect(count).toBe(3);
  });

  it('findRecentByUser returns list', async () => {
    prisma.authLoginAttempt.findMany.mockResolvedValue([prismaAttempt()]);
    const result = await repo.findRecentByUser('user-1' as never, 20);
    expect(result).toHaveLength(1);
  });

  it('findByIp returns list', async () => {
    prisma.authLoginAttempt.findMany.mockResolvedValue([prismaAttempt()]);
    const result = await repo.findByIp(
      LoginAttemptIpVO.of('192.168.1.1'),
      now.getTime() - 60_000,
    );
    expect(result).toHaveLength(1);
  });

  it('handles attempt without userId', async () => {
    prisma.authLoginAttempt.findMany.mockResolvedValue([
      prismaAttempt({ userId: null }),
    ]);
    const result = await repo.findRecentByUser('user-1' as never, 20);
    expect(result[0]?.userId).toBeUndefined();
  });
});
