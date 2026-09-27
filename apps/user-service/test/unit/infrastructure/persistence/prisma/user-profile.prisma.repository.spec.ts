import { UserProfilePrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-profile.prisma.repository';
import { createPrismaServiceMock } from '../../../../helpers/prisma-mock';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

describe('UserProfilePrismaRepository (mocked)', () => {
  let repo: UserProfilePrismaRepository;
  let prisma: ReturnType<typeof createPrismaServiceMock>;

  beforeEach(() => {
    prisma = createPrismaServiceMock();
    repo = new UserProfilePrismaRepository(prisma as never);
  });

  it('findById returns null when not found', async () => {
    prisma.userProfile.findUnique.mockResolvedValue(null);
    expect(await repo.findById('missing')).toBeNull();
  });

  it('findByUserId maps row to entity', async () => {
    prisma.userProfile.findUnique.mockResolvedValue({
      id: 'p-1',
      userId: 'user-1',
      avatarUrl: null,
      bio: null,
      visibility: 'public',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    const r = await repo.findByUserId(UserIdVO.create('user-1'));
    expect(r).not.toBeNull();
    expect(r!.userId.value).toBe('user-1');
  });

  it('existsByUserId returns true when count > 0', async () => {
    prisma.userProfile.count.mockResolvedValue(1);
    expect(await repo.existsByUserId(UserIdVO.create('user-1'))).toBe(true);
  });
});
