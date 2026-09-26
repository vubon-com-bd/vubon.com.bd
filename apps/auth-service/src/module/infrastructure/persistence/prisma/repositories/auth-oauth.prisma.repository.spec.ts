/**
 * AuthOAuthPrismaRepository — Unit Tests
 */
import { AuthOAuthPrismaRepository } from './auth-oauth.prisma.repository';
import { OAuthProviderVO } from '../../../../domain/value-objects/primitives/oauth-provider.vo';

const mockPrisma = () => ({
  authOAuth: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaOAuth = (overrides: Record<string, unknown> = {}) => ({
  id: 'oa-1',
  userId: 'user-1',
  provider: 'google',
  accessToken: 'tok_12345678',  // ✅ 12 chars — valid (>8)
  refreshToken: null,
  scope: 'email profile',
  status: 'active',
  expiresAt: null,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('AuthOAuthPrismaRepository', () => {
  let repo: AuthOAuthPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthOAuthPrismaRepository(prisma as never);
  });

  it('findByUser returns list', async () => {
    prisma.authOAuth.findMany.mockResolvedValue([prismaOAuth()]);
    const result = await repo.findByUser('user-1' as never);
    expect(result).toHaveLength(1);
    expect(result[0]?.provider.value).toBe('google');
  });

  it('splits scopes by space', async () => {
    prisma.authOAuth.findMany.mockResolvedValue([prismaOAuth()]);
    const result = await repo.findByUser('user-1' as never);
    expect(result[0]?.scopes).toEqual(['email', 'profile']);
  });

  it('handles empty scope', async () => {
    prisma.authOAuth.findMany.mockResolvedValue([prismaOAuth({ scope: '' })]);
    const result = await repo.findByUser('user-1' as never);
    expect(result[0]?.scopes).toEqual([]);
  });

  it('findByProvider returns null when missing', async () => {
    prisma.authOAuth.findFirst.mockResolvedValue(null);
    expect(
      await repo.findByProvider(OAuthProviderVO.of('google'), 'missing'),
    ).toBeNull();
  });
});
