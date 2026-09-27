import { UserPreferencesPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-preferences.prisma.repository';
import { createPrismaServiceMock } from '../../../../helpers/prisma-mock';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

describe('UserPreferencesPrismaRepository (mocked)', () => {
  let repo: UserPreferencesPrismaRepository;
  let prisma: ReturnType<typeof createPrismaServiceMock>;

  beforeEach(() => {
    prisma = createPrismaServiceMock();
    repo = new UserPreferencesPrismaRepository(prisma as never);
  });

  it('findByUserId returns null when no rows', async () => {
    prisma.userPreference.findMany.mockResolvedValue([]);
    expect(await repo.findByUserId(UserIdVO.create('user-1'))).toBeNull();
  });

  it('findByUserId maps rows', async () => {
    prisma.userPreference.findMany.mockResolvedValue([
      {
        id: 'pref-1',
        userId: 'user-1',
        key: 'newsletter',
        value: 'true',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const r = await repo.findByUserId(UserIdVO.create('user-1'));
    expect(r).not.toBeNull();
  });
});
