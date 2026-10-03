import { UserSettingsPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-settings.prisma.repository';
import { createPrismaServiceMock } from '../../../../helpers/prisma-mock';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

describe('UserSettingsPrismaRepository (mocked)', () => {
  let repo: UserSettingsPrismaRepository;
  let prisma: ReturnType<typeof createPrismaServiceMock>;

  beforeEach(() => {
    prisma = createPrismaServiceMock();
    repo = new UserSettingsPrismaRepository(prisma as never);
  });

  it('findByUserId returns null when no rows', async () => {
    prisma.userSetting.findMany.mockResolvedValue([]);
    expect(await repo.findByUserId(UserIdVO.create('user-1'))).toBeNull();
  });

  it('findByUserId maps rows to entity', async () => {
    prisma.userSetting.findMany.mockResolvedValue([
      {
        id: 's-1',
        userId: 'user-1',
        key: 'theme',
        value: 'dark',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const r = await repo.findByUserId(UserIdVO.create('user-1'));
    expect(r).not.toBeNull();
    expect(r!.userId).toBe('user-1');
  });
});
