/**
 * AuthSsoPrismaRepository — Unit Tests
 */
import { AuthSsoPrismaRepository } from './auth-sso.prisma.repository';
import { SsoProviderVO } from '../../../../domain/value-objects/primitives/sso-provider.vo';

const mockPrisma = () => ({
  authSso: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaSso = (overrides: Record<string, unknown> = {}) => ({
  id: 'sso-1',
  userId: 'user-1',
  provider: 'saml',
  externalId: 'ext-123',
  sessionToken: 's'.repeat(32),  // ✅ 32 chars — valid
  status: 'active',
  linkedAt: now,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('AuthSsoPrismaRepository', () => {
  let repo: AuthSsoPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthSsoPrismaRepository(prisma as never);
  });

  it('findByUser returns list', async () => {
    prisma.authSso.findMany.mockResolvedValue([prismaSso()]);
    const result = await repo.findByUser('user-1' as never);
    expect(result).toHaveLength(1);
    expect(result[0]?.provider.value).toBe('saml');
    expect(result[0]?.tenantId).toBe('default');
  });

  it('findByProviderAndTenant returns null when missing', async () => {
    prisma.authSso.findFirst.mockResolvedValue(null);
    expect(
      await repo.findByProviderAndTenant(
        SsoProviderVO.of('saml'),
        'acme',
        'ext-123',
      ),
    ).toBeNull();
  });

  it('findByProviderAndTenant maps entity', async () => {
    prisma.authSso.findFirst.mockResolvedValue(prismaSso());
    const result = await repo.findByProviderAndTenant(
      SsoProviderVO.of('saml'),
      'acme',
      'ext-123',
    );
    expect(result?.providerUserId).toBe('ext-123');
  });
});
