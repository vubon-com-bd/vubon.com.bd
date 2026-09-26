/**
 * AuthMfaPrismaRepository — Unit Tests
 */
import { AuthMfaPrismaRepository } from './auth-mfa.prisma.repository';

const mockPrisma = () => ({
  authMfa: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaMfa = (overrides: Record<string, unknown> = {}) => ({
  id: 'mfa-1',
  userId: 'user-1',
  secret: 'JBSWY3DPEHPK3PXP',
  type: 'totp',
  status: 'enabled',
  enabledAt: now,
  lastVerifiedAt: now,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('AuthMfaPrismaRepository', () => {
  let repo: AuthMfaPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthMfaPrismaRepository(prisma as never);
  });

  describe('findByUserId()', () => {
    it('should return null when not found', async () => {
      prisma.authMfa.findUnique.mockResolvedValue(null);
      expect(await repo.findByUserId('user-1' as never)).toBeNull();
    });

    it('should map to domain entity', async () => {
      prisma.authMfa.findUnique.mockResolvedValue(prismaMfa());
      const result = await repo.findByUserId('user-1' as never);
      expect(result?.id).toBe('mfa-1');
      expect(result?.type.value).toBe('totp');
      expect(result?.isEnabled()).toBe(true);
    });
  });

  describe('findEnabledByUserIds()', () => {
    it('should return empty for empty list', async () => {
      const result = await repo.findEnabledByUserIds([]);
      expect(result).toEqual([]);
      expect(prisma.authMfa.findMany).not.toHaveBeenCalled();
    });

    it('should query with status enabled', async () => {
      prisma.authMfa.findMany.mockResolvedValue([prismaMfa()]);
      const result = await repo.findEnabledByUserIds(['user-1' as never]);
      expect(result).toHaveLength(1);
    });
  });
});
