/**
 * UserVerificationPrismaRepository — Unit Tests
 */
import { UserVerificationPrismaRepository } from './user-verification.prisma.repository';

const mockPrisma = () => ({
  userVerification: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');
const future = new Date(now.getTime() + 900_000);

const prismaVerification = (overrides: Record<string, unknown> = {}) => ({
  id: 'v-1',
  userId: 'user-1',
  type: 'email',
  code: '123456',
  status: 'pending',
  verifiedAt: null,
  expiresAt: future,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('UserVerificationPrismaRepository', () => {
  let repo: UserVerificationPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new UserVerificationPrismaRepository(prisma as never);
  });

  it('findLatestByUserAndType returns null when missing', async () => {
    prisma.userVerification.findFirst.mockResolvedValue(null);
    expect(
      await repo.findLatestByUserAndType('user-1' as never, 'email'),
    ).toBeNull();
  });

  it('findLatestByUserAndType maps entity', async () => {
    prisma.userVerification.findFirst.mockResolvedValue(prismaVerification());
    const result = await repo.findLatestByUserAndType('user-1' as never, 'email');
    expect(result?.type.value).toBe('email');
    expect(result?.status.value).toBe('pending');
  });

  it('deleteExpired returns count', async () => {
    prisma.userVerification.deleteMany.mockResolvedValue({ count: 5 });
    const count = await repo.deleteExpired(now.getTime());
    expect(count).toBe(5);
  });
});
