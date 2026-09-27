import { UserContactPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-contact.prisma.repository';
import { createPrismaServiceMock } from '../../../../helpers/prisma-mock';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';

describe('UserContactPrismaRepository (mocked)', () => {
  let repo: UserContactPrismaRepository;
  let prisma: ReturnType<typeof createPrismaServiceMock>;

  beforeEach(() => {
    prisma = createPrismaServiceMock();
    repo = new UserContactPrismaRepository(prisma as never);
  });

  it('findById returns null when not found', async () => {
    prisma.userContact.findUnique.mockResolvedValue(null);
    expect(await repo.findById('missing')).toBeNull();
  });

  it('findByUserId returns list', async () => {
    prisma.userContact.findMany.mockResolvedValue([
      {
        id: 'c-1',
        userId: 'user-1',
        type: 'email',
        value: 'user@example.com',
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const r = await repo.findByUserId(UserIdVO.create('user-1'));
    expect(r.length).toBe(1);
  });

  it('countByUserId returns count', async () => {
    prisma.userContact.count.mockResolvedValue(2);
    expect(await repo.countByUserId(UserIdVO.create('user-1'))).toBe(2);
  });

  it('existsById returns boolean', async () => {
    prisma.userContact.count.mockResolvedValue(1);
    expect(await repo.existsById(ContactIdVO.create('c-1'))).toBe(true);
  });

  it('findByType queries with type filter', async () => {
    prisma.userContact.findMany.mockResolvedValue([]);
    await repo.findByType(UserIdVO.create('user-1'), ContactTypeVO.create('email'));
    expect(prisma.userContact.findMany).toHaveBeenCalled();
  });
});
