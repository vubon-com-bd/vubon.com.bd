/**
 * AuthRecoveryCodePrismaRepository — Unit Tests
 */
import { AuthRecoveryCodePrismaRepository } from './auth-recovery-code.prisma.repository';
import { RecoveryCodeVO } from '../../../../domain/value-objects/primitives/recovery-code.vo';

const mockPrisma = () => ({
  authRecoveryCode: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    delete: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaCode = (overrides: Record<string, unknown> = {}) => ({
  id: 'rc-1',
  userId: 'user-1',
  code: 'ABCD-1234',
  status: 'active',
  usedAt: null,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('AuthRecoveryCodePrismaRepository', () => {
  let repo: AuthRecoveryCodePrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthRecoveryCodePrismaRepository(prisma as never);
  });

  it('findByUserId returns list', async () => {
    prisma.authRecoveryCode.findMany.mockResolvedValue([prismaCode()]);
    const result = await repo.findByUserId('user-1' as never);
    expect(result).toHaveLength(1);
    expect(result[0]?.status.value).toBe('active');
  });

  it('findActiveByUserId returns only active', async () => {
    prisma.authRecoveryCode.findMany.mockResolvedValue([prismaCode()]);
    await repo.findActiveByUserId('user-1' as never);
    const call = prisma.authRecoveryCode.findMany.mock.calls[0]![0] as {
      where: { status: string };
    };
    expect(call.where.status).toBe('active');
  });

  it('findByCode returns null when missing', async () => {
    prisma.authRecoveryCode.findFirst.mockResolvedValue(null);
    expect(
      await repo.findByCode('user-1' as never, RecoveryCodeVO.of('ABCD-1234')),
    ).toBeNull();
  });

  it('invalidateAllForUser returns count', async () => {
    prisma.authRecoveryCode.updateMany.mockResolvedValue({ count: 10 });
    const count = await repo.invalidateAllForUser('user-1' as never, now.getTime());
    expect(count).toBe(10);
  });
});
