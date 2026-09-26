/**
 * AuthTokenPrismaRepository — Unit Tests
 */
import { AuthTokenPrismaRepository } from './auth-token.prisma.repository';
import { TokenValueVO } from '../../../../domain/value-objects/primitives/token-value.vo';

const mockPrisma = () => ({
  authToken: {
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
const future = new Date(now.getTime() + 900_000);

const prismaToken = (overrides: Record<string, unknown> = {}) => ({
  id: 'tok-1',
  userId: 'user-1',
  tokenValue: 'a'.repeat(64),
  tokenType: 'access',
  expiry: future,
  issuedAt: now,
  revokedAt: null,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('AuthTokenPrismaRepository', () => {
  let repo: AuthTokenPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthTokenPrismaRepository(prisma as never);
  });

  describe('findByValue()', () => {
    it('should return null when not found', async () => {
      prisma.authToken.findUnique.mockResolvedValue(null);
      const result = await repo.findByValue(TokenValueVO.of('a'.repeat(64)));
      expect(result).toBeNull();
    });

    it('should map to domain entity', async () => {
      prisma.authToken.findUnique.mockResolvedValue(prismaToken());
      const result = await repo.findByValue(TokenValueVO.of('a'.repeat(64)));
      expect(result?.id).toBe('tok-1');
      expect(result?.subjectId).toBe('user-1');
      expect(result?.type.value).toBe('access');
    });
  });

  describe('revokeAllForSubject()', () => {
    it('should return count', async () => {
      prisma.authToken.updateMany.mockResolvedValue({ count: 5 });
      const count = await repo.revokeAllForSubject('user-1', now.getTime());
      expect(count).toBe(5);
    });
  });

  describe('deleteExpired()', () => {
    it('should delete expired tokens', async () => {
      prisma.authToken.deleteMany.mockResolvedValue({ count: 20 });
      const count = await repo.deleteExpired(now.getTime());
      expect(count).toBe(20);
    });
  });
});
