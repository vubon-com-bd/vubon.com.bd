import { UserActivityPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-activity.prisma.repository';
import { createPrismaServiceMock } from '../../../../helpers/prisma-mock';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

describe('UserActivityPrismaRepository (mocked)', () => {
  let repo: UserActivityPrismaRepository;
  let prisma: ReturnType<typeof createPrismaServiceMock>;

  beforeEach(() => {
    prisma = createPrismaServiceMock();
    repo = new UserActivityPrismaRepository(prisma as never);
  });

  it('findById returns null when not found', async () => {
    prisma.userActivity.findUnique.mockResolvedValue(null);
    expect(await repo.findById('missing')).toBeNull();
  });

  it('findByUserId returns list', async () => {
    prisma.userActivity.findMany.mockResolvedValue([
      {
        id: 'a-1',
        userId: 'user-1',
        type: 'login',
        timestamp: new Date(),
        createdAt: new Date(),
      },
    ]);
    const r = await repo.findByUserId(UserIdVO.create('user-1'));
    expect(r.length).toBe(1);
  });

  it('countByUserId returns count', async () => {
    prisma.userActivity.count.mockResolvedValue(42);
    expect(await repo.countByUserId(UserIdVO.create('user-1'))).toBe(42);
  });

  it('deleteOlderThan returns count', async () => {
    prisma.userActivity.deleteMany.mockResolvedValue({ count: 5 });
    const n = await repo.deleteOlderThan(new Date());
    expect(n).toBe(5);
  });

  it('findPaginated returns items and total', async () => {
    prisma.userActivity.findMany.mockResolvedValue([]);
    prisma.userActivity.count.mockResolvedValue(0);
    const r = await repo.findPaginated(UserIdVO.create('user-1'), {
      page: 1,
      limit: 20,
    });
    expect(r.items.length).toBe(0);
    expect(r.total).toBe(0);
  });
});
