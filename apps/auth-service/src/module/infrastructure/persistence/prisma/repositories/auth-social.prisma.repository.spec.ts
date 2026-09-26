/**
 * AuthSocialPrismaRepository — Unit Tests
 */
import { AuthSocialPrismaRepository } from './auth-social.prisma.repository';
import { SocialProviderVO } from '../../../../domain/value-objects/primitives/social-provider.vo';

const mockPrisma = () => ({
  authSocial: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaSocial = () => ({
  id: 'soc-1',
  userId: 'user-1',
  provider: 'google',
  providerUserId: 'g-123',
  accessToken: 'token-123',
  refreshToken: null,
  status: 'active',
  linkedAt: now,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
});

describe('AuthSocialPrismaRepository', () => {
  let repo: AuthSocialPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthSocialPrismaRepository(prisma as never);
  });

  it('findByUser maps results', async () => {
    prisma.authSocial.findMany.mockResolvedValue([prismaSocial()]);
    const result = await repo.findByUser('user-1' as never);
    expect(result).toHaveLength(1);
    expect(result[0]?.provider.value).toBe('google');
  });

  it('existsByProvider returns true when count > 0', async () => {
    prisma.authSocial.count.mockResolvedValue(1);
    const result = await repo.existsByProvider(
      'user-1' as never,
      SocialProviderVO.of('google'),
    );
    expect(result).toBe(true);
  });

  it('existsByProvider returns false when count = 0', async () => {
    prisma.authSocial.count.mockResolvedValue(0);
    const result = await repo.existsByProvider(
      'user-1' as never,
      SocialProviderVO.of('google'),
    );
    expect(result).toBe(false);
  });
});
