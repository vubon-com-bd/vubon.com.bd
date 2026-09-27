import { UserAddressPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-address.prisma.repository';
import { createPrismaServiceMock } from '../../../../helpers/prisma-mock';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo';

describe('UserAddressPrismaRepository (mocked)', () => {
  let repo: UserAddressPrismaRepository;
  let prisma: ReturnType<typeof createPrismaServiceMock>;

  beforeEach(() => {
    prisma = createPrismaServiceMock();
    repo = new UserAddressPrismaRepository(prisma as never);
  });

  it('findById returns null when not found', async () => {
    prisma.userAddress.findUnique.mockResolvedValue(null);
    expect(await repo.findById('missing')).toBeNull();
  });

  it('findByUserId returns list', async () => {
    prisma.userAddress.findMany.mockResolvedValue([
      {
        id: 'addr-1',
        userId: 'user-1',
        label: 'home',
        line1: '123 Main',
        city: 'Dhaka',
        district: 'dhaka',
        division: 'dhaka',
        postalCode: '1200',
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
    const r = await repo.findByUserId(UserIdVO.create('user-1'));
    expect(r.length).toBe(1);
  });

  it('countByUserId returns count', async () => {
    prisma.userAddress.count.mockResolvedValue(5);
    expect(await repo.countByUserId(UserIdVO.create('user-1'))).toBe(5);
  });

  it('clearDefaultForUser calls updateMany', async () => {
    prisma.userAddress.updateMany.mockResolvedValue({ count: 1 });
    await repo.clearDefaultForUser(UserIdVO.create('user-1'));
    expect(prisma.userAddress.updateMany).toHaveBeenCalled();
  });

  it('existsById returns boolean', async () => {
    prisma.userAddress.count.mockResolvedValue(1);
    expect(await repo.existsById(AddressIdVO.create('addr-1'))).toBe(true);
  });
});
