/**
 * UserAddressPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserAddressPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-address.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

const addressRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.USER_ID,
  userId: TEST_IDS.USER_ID,
  type: 'home',
  label: 'Home',
  fullName: 'Test User',
  phone: '+8801700000000',
  addressLine1: '123 Main St',
  addressLine2: null,
  city: 'Dhaka',
  state: 'Dhaka',
  division: 'Dhaka',
  district: 'Dhaka',
  upazila: null,
  postalCode: '1200',
  country: 'BD',
  isDefault: true,
  isDefaultShipping: true,
  isDefaultBilling: false,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('UserAddressPrismaRepository', () => {
  let repo: UserAddressPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['userAddress'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['userAddress']);
    model = prisma.userAddress as never;
    repo = new UserAddressPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(addressRow());
    expect(await repo.findById(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findByIdVO delegates', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(addressRow());
    expect(await repo.findByIdVO({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findByUserId list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([addressRow()]);
    expect((await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('findByUserIdRaw delegates', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([addressRow()]);
    expect((await repo.findByUserIdRaw(TEST_IDS.USER_ID)).length).toBe(1);
  });

  it('findDefaultByUserId queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(addressRow());
    expect(await repo.findDefaultByUserId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findDefaultShippingByUserId queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(addressRow());
    expect(await repo.findDefaultShippingByUserId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findDefaultBillingByUserId queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(addressRow());
    expect(await repo.findDefaultBillingByUserId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('countByUserId returns count', async () => {
    (model.count as jest.Mock).mockResolvedValue(3);
    expect(await repo.countByUserId({ value: TEST_IDS.USER_ID } as never)).toBe(3);
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([addressRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(addressRow());
    (model.update as jest.Mock).mockResolvedValue(addressRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(addressRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(addressRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('findPaginated returns result', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    (model.count as jest.Mock).mockResolvedValue(0);
    const r = await repo.findPaginated({ page: 1, limit: 10 });
    expect(r.total).toBe(0);
  });

  it('unsetAllDefault count', async () => {
    (model.updateMany as jest.Mock).mockResolvedValue({ count: 2 });
    expect(await repo.unsetAllDefault({ value: TEST_IDS.USER_ID } as never)).toBe(2);
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(addressRow());
    await repo.delete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(addressRow());
    await repo.softDelete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });
});
