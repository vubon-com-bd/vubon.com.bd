/**
 * UserAddressPrismaRepository — Unit Tests
 */
import { UserAddressPrismaRepository } from './user-address.prisma.repository';

const mockPrisma = () => ({
  userAddress: {
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

const prismaAddress = (overrides: Record<string, unknown> = {}) => ({
  id: 'addr-1',
  userId: 'user-1',
  label: 'Home',
  fullName: 'John Doe',
  phone: '01712345678',
  division: 'Dhaka',
  district: 'Dhaka',
  upazila: 'Dhanmondi',
  addressLine: '123 Main St',
  postalCode: '1205',
  isDefault: false,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('UserAddressPrismaRepository', () => {
  let repo: UserAddressPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new UserAddressPrismaRepository(prisma as never);
  });

  it('findByUserId returns list', async () => {
    prisma.userAddress.findMany.mockResolvedValue([prismaAddress()]);
    const result = await repo.findByUserId('user-1' as never);
    expect(result).toHaveLength(1);
    expect(result[0]?.postalCode).toBe('1205');
  });

  it('findDefaultByUserId returns null when none', async () => {
    prisma.userAddress.findFirst.mockResolvedValue(null);
    expect(await repo.findDefaultByUserId('user-1' as never)).toBeNull();
  });

  it('findDefaultByUserId returns default address', async () => {
    prisma.userAddress.findFirst.mockResolvedValue(prismaAddress({ isDefault: true }));
    const result = await repo.findDefaultByUserId('user-1' as never);
    expect(result?.isDefault).toBe(true);
  });

  it('clearDefaultForUser calls updateMany with correct where', async () => {
    prisma.userAddress.updateMany.mockResolvedValue({ count: 2 });
    await repo.clearDefaultForUser('user-1' as never);
    expect(prisma.userAddress.updateMany).toHaveBeenCalled();
    const call = prisma.userAddress.updateMany.mock.calls[0]![0] as {
      where: { userId: string; isDefault: boolean };
    };
    expect(call.where.userId).toBe('user-1');
    expect(call.where.isDefault).toBe(true);
  });
});
