/**
 * UserActivityPrismaRepository — Unit Tests
 */
import { UserActivityPrismaRepository } from './user-activity.prisma.repository';

const mockPrisma = () => ({
  userActivity: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaActivity = (overrides: Record<string, unknown> = {}) => ({
  id: 'act-1',
  userId: 'user-1',
  type: 'login',
  category: 'auth',
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0',
  metadata: { device: 'iPhone' },
  timestamp: now,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('UserActivityPrismaRepository', () => {
  let repo: UserActivityPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new UserActivityPrismaRepository(prisma as never);
  });

  it('findByUserId returns list', async () => {
    prisma.userActivity.findMany.mockResolvedValue([prismaActivity()]);
    const result = await repo.findByUserId('user-1' as never, 50);
    expect(result).toHaveLength(1);
    expect(result[0]?.type).toBe('login');
    expect(result[0]?.ipAddress).toBe('192.168.1.1');
  });

  it('findByUserId uses default limit', async () => {
    prisma.userActivity.findMany.mockResolvedValue([]);
    await repo.findByUserId('user-1' as never);
    const call = prisma.userActivity.findMany.mock.calls[0]![0] as { take: number };
    expect(call.take).toBe(50);
  });

  it('coerces metadata to Record<string, string>', async () => {
    prisma.userActivity.findMany.mockResolvedValue([prismaActivity()]);
    const result = await repo.findByUserId('user-1' as never);
    expect(result[0]?.metadata).toEqual({ device: 'iPhone' });
  });

  it('handles null metadata', async () => {
    prisma.userActivity.findMany.mockResolvedValue([prismaActivity({ metadata: null })]);
    const result = await repo.findByUserId('user-1' as never);
    expect(result[0]?.metadata).toBeUndefined();
  });

  it('deleteOlderThan returns count', async () => {
    prisma.userActivity.deleteMany.mockResolvedValue({ count: 100 });
    const count = await repo.deleteOlderThan(now.getTime());
    expect(count).toBe(100);
  });

  it('findRecentByUser filters by sinceEpochMs', async () => {
    prisma.userActivity.findMany.mockResolvedValue([]);
    await repo.findRecentByUser('user-1' as never, now.getTime());
    expect(prisma.userActivity.findMany).toHaveBeenCalled();
  });
});
