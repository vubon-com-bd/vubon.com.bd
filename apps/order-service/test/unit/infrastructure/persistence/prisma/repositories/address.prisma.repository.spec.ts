import { jest } from '@jest/globals';
import { ShippingAddressPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/shipping-address.prisma.repository.js';
import { BillingAddressPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/billing-address.prisma.repository.js';
import { CustomerIdVO } from '../../../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { mockPrisma, UUID_ORDER, UUID_CUSTOMER, NOW_DATE } from './_prisma-mock.js';

const UUID_ADDR = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

function addrRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_ADDR, orderId: UUID_ORDER, customerId: UUID_CUSTOMER,
    fullName: 'John', phone: '017', line1: '123', line2: null,
    city: 'Dhaka', state: null, postalCode: null, country: 'BD', label: null,
    createdAt: NOW_DATE, ...o,
  };
}

describe('ShippingAddressPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: ShippingAddressPrismaRepository;
  beforeEach(() => { prisma = mockPrisma(); repo = new ShippingAddressPrismaRepository(prisma as never); });

  it('findById + error', async () => {
    (prisma.shippingAddress.findUnique as jest.Mock).mockResolvedValue(addrRow());
    expect((await repo.findById(UUID_ADDR))?.id).toBe(UUID_ADDR);
    (prisma.shippingAddress.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_ADDR)).toBeNull();
  });
  it('findByIdVO', async () => {
    (prisma.shippingAddress.findUnique as jest.Mock).mockResolvedValue(addrRow());
    await repo.findByIdVO({ value: UUID_ADDR } as never);
    expect(prisma.shippingAddress.findUnique).toHaveBeenCalled();
  });
  it('findByOrderId + error', async () => {
    (prisma.shippingAddress.findFirst as jest.Mock).mockResolvedValue(addrRow());
    expect((await repo.findByOrderId(UUID_ORDER))?.id).toBe(UUID_ADDR);
    (prisma.shippingAddress.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByOrderId(UUID_ORDER)).toBeNull();
  });
  it('findByCustomerId + error', async () => {
    (prisma.shippingAddress.findMany as jest.Mock).mockResolvedValue([addrRow()]);
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toHaveLength(1);
    (prisma.shippingAddress.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toEqual([]);
  });
  it('findAll + error', async () => {
    (prisma.shippingAddress.findMany as jest.Mock).mockResolvedValue([addrRow()]);
    expect(await repo.findAll()).toHaveLength(1);
    (prisma.shippingAddress.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('exists + error', async () => {
    (prisma.shippingAddress.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_ADDR)).toBe(true);
    (prisma.shippingAddress.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_ADDR)).toBe(false);
  });
  it('save + error', async () => {
    (prisma.shippingAddress.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.shippingAddress.create as jest.Mock).mockResolvedValue(addrRow());
    const e = { id: UUID_ADDR, orderId: UUID_ORDER, customerId: { value: UUID_CUSTOMER },
      line: { value: { fullName: 'John', phone: '017', line1: '123', city: 'Dhaka', country: 'BD' } },
      label: undefined };
    expect((await repo.save(e as never)).id).toBe(UUID_ADDR);
    (prisma.shippingAddress.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_ADDR } as never)).rejects.toThrow();
  });
  it('delete + deleteByOrderId + errors', async () => {
    (prisma.shippingAddress.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });
    await repo.delete(UUID_ADDR);
    await repo.deleteByOrderId(UUID_ORDER);
    expect(prisma.shippingAddress.deleteMany).toHaveBeenCalledTimes(2);
    (prisma.shippingAddress.deleteMany as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_ADDR)).resolves.toBeUndefined();
    await expect(repo.deleteByOrderId(UUID_ORDER)).resolves.toBeUndefined();
  });
});

describe('BillingAddressPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: BillingAddressPrismaRepository;
  beforeEach(() => { prisma = mockPrisma(); repo = new BillingAddressPrismaRepository(prisma as never); });

  it('findById + error', async () => {
    (prisma.billingAddress.findUnique as jest.Mock).mockResolvedValue(addrRow());
    expect((await repo.findById(UUID_ADDR))?.id).toBe(UUID_ADDR);
    (prisma.billingAddress.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_ADDR)).toBeNull();
  });
  it('findByIdVO', async () => {
    (prisma.billingAddress.findUnique as jest.Mock).mockResolvedValue(addrRow());
    await repo.findByIdVO({ value: UUID_ADDR } as never);
    expect(prisma.billingAddress.findUnique).toHaveBeenCalled();
  });
  it('findByOrderId + error', async () => {
    (prisma.billingAddress.findFirst as jest.Mock).mockResolvedValue(addrRow());
    expect((await repo.findByOrderId(UUID_ORDER))?.id).toBe(UUID_ADDR);
    (prisma.billingAddress.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByOrderId(UUID_ORDER)).toBeNull();
  });
  it('findByCustomerId + error', async () => {
    (prisma.billingAddress.findMany as jest.Mock).mockResolvedValue([addrRow()]);
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toHaveLength(1);
    (prisma.billingAddress.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toEqual([]);
  });
  it('findAll + error', async () => {
    (prisma.billingAddress.findMany as jest.Mock).mockResolvedValue([addrRow()]);
    expect(await repo.findAll()).toHaveLength(1);
    (prisma.billingAddress.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('exists + error', async () => {
    (prisma.billingAddress.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_ADDR)).toBe(true);
    (prisma.billingAddress.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_ADDR)).toBe(false);
  });
  it('save + error', async () => {
    (prisma.billingAddress.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.billingAddress.create as jest.Mock).mockResolvedValue(addrRow());
    const e = { id: UUID_ADDR, orderId: UUID_ORDER, customerId: { value: UUID_CUSTOMER },
      line: { value: { fullName: 'John', phone: '017', line1: '123', city: 'Dhaka', country: 'BD' } } };
    expect((await repo.save(e as never)).id).toBe(UUID_ADDR);
    (prisma.billingAddress.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_ADDR } as never)).rejects.toThrow();
  });
  it('delete + deleteByOrderId + errors', async () => {
    (prisma.billingAddress.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });
    await repo.delete(UUID_ADDR);
    await repo.deleteByOrderId(UUID_ORDER);
    (prisma.billingAddress.deleteMany as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_ADDR)).resolves.toBeUndefined();
    await expect(repo.deleteByOrderId(UUID_ORDER)).resolves.toBeUndefined();
  });
});
