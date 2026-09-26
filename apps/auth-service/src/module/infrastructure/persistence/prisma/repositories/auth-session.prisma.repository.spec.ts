/**
 * AuthSessionPrismaRepository — Unit Tests
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { AuthSessionPrismaRepository } from './auth-session.prisma.repository';
import { SessionTokenVO } from '../../../../domain/value-objects/primitives/session-token.vo';

const mockPrisma = () => ({
  authSession: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
    count: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');
const future = new Date(now.getTime() + 3_600_000);

const prismaSession = (overrides: Record<string, unknown> = {}) => ({
  id: 'sess-1',
  userId: 'user-1',
  token: 'a'.repeat(32),
  expiry: future,
  ip: '192.168.1.1',
  userAgent: 'agent',
  deviceId: null,
  revokedAt: null,
  revokeReason: null,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('AuthSessionPrismaRepository', () => {
  let repo: AuthSessionPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthSessionPrismaRepository(prisma as never);
  });

  describe('findByToken()', () => {
    it('should return null when not found', async () => {
      prisma.authSession.findUnique.mockResolvedValue(null);
      const result = await repo.findByToken(SessionTokenVO.of('a'.repeat(32)));
      expect(result).toBeNull();
    });

    it('should map to domain entity', async () => {
      prisma.authSession.findUnique.mockResolvedValue(prismaSession());
      const result = await repo.findByToken(SessionTokenVO.of('a'.repeat(32)));
      expect(result?.id).toBe('sess-1');
      expect(result?.userId).toBe('user-1');
      expect(result?.ipAddress).toBe('192.168.1.1');
    });
  });

  describe('findActiveByUser()', () => {
    it('should query with revokedAt: null and expiry > now', async () => {
      prisma.authSession.findMany.mockResolvedValue([prismaSession()]);
      await repo.findActiveByUser('user-1' as never, now.getTime());
      const call = prisma.authSession.findMany.mock.calls[0]![0] as {
        where: { userId: string; revokedAt: null };
      };
      expect(call.where.userId).toBe('user-1');
      expect(call.where.revokedAt).toBeNull();
    });

    it('should return mapped list', async () => {
      prisma.authSession.findMany.mockResolvedValue([
        prismaSession({ id: 's1' }),
        prismaSession({ id: 's2' }),
      ]);
      const result = await repo.findActiveByUser('user-1' as never, now.getTime());
      expect(result).toHaveLength(2);
    });
  });

  describe('revokeAllForUser()', () => {
    it('should update many and return count', async () => {
      prisma.authSession.updateMany.mockResolvedValue({ count: 3 });
      const count = await repo.revokeAllForUser('user-1' as never, now.getTime(), 'bulk');
      expect(count).toBe(3);
      expect(prisma.authSession.updateMany).toHaveBeenCalled();
    });
  });

  describe('deleteExpired()', () => {
    it('should delete expired sessions', async () => {
      prisma.authSession.deleteMany.mockResolvedValue({ count: 10 });
      const count = await repo.deleteExpired(now.getTime());
      expect(count).toBe(10);
    });
  });
});
