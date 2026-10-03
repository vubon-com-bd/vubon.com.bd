import { jest } from '@jest/globals';
import { CheckoutPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/checkout.prisma.repository.js';
import { CheckoutSessionPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/checkout-session.prisma.repository.js';
import { CheckoutIdVO } from '../../../../../../src/module/domain/value-objects/primitives/checkout-id.vo.js';
import { CustomerIdVO } from '../../../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { CheckoutStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/checkout-status.vo.js';
import { mockPrisma, UUID_CUSTOMER, NOW_DATE } from './_prisma-mock.js';

const UUID_CHECKOUT = '77777777-7777-4777-8777-777777777777';
const UUID_SESSION = '88888888-8888-4888-8888-888888888888';

function checkoutRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_CHECKOUT, customerId: UUID_CUSTOMER, cartId: null,
    status: 'pending', step: 'cart_review', type: 'registered',
    subtotal: 0, discountAmount: 0, taxAmount: 0, shippingAmount: 0,
    total: 0, currency: 'BDT', shippingAddressId: null, billingAddressId: null,
    shippingMethodId: null, paymentMethod: null, orderId: null,
    expiresAt: new Date('2027-01-01'), createdAt: NOW_DATE, updatedAt: NOW_DATE, deletedAt: null,
    ...o,
  };
}
function sessionRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_SESSION, checkoutId: UUID_CHECKOUT, customerId: UUID_CUSTOMER,
    token: 'a'.repeat(32), stepData: null, ipAddress: null, userAgent: null,
    expiresAt: new Date('2027-01-01'), createdAt: NOW_DATE, updatedAt: NOW_DATE,
    ...o,
  };
}

describe('CheckoutPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: CheckoutPrismaRepository;
  beforeEach(() => { prisma = mockPrisma(); repo = new CheckoutPrismaRepository(prisma as never); });

  it('findById', async () => {
    (prisma.checkout.findUnique as jest.Mock).mockResolvedValue(checkoutRow());
    expect((await repo.findById(UUID_CHECKOUT))?.id).toBe(UUID_CHECKOUT);
  });
  it('findById null', async () => {
    (prisma.checkout.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(UUID_CHECKOUT)).toBeNull();
  });
  it('findById error', async () => {
    (prisma.checkout.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_CHECKOUT)).toBeNull();
  });
  it('findByIdVO', async () => {
    (prisma.checkout.findUnique as jest.Mock).mockResolvedValue(checkoutRow());
    await repo.findByIdVO({ value: UUID_CHECKOUT } as never);
    expect(prisma.checkout.findUnique).toHaveBeenCalled();
  });
  it('findByCustomerId', async () => {
    (prisma.checkout.findMany as jest.Mock).mockResolvedValue([checkoutRow()]);
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toHaveLength(1);
  });
  it('findByCustomerId error', async () => {
    (prisma.checkout.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toEqual([]);
  });
  it('findActiveByCustomer', async () => {
    (prisma.checkout.findFirst as jest.Mock).mockResolvedValue(checkoutRow());
    expect((await repo.findActiveByCustomer(CustomerIdVO.create(UUID_CUSTOMER)))?.id).toBe(UUID_CHECKOUT);
  });
  it('findActiveByCustomer error', async () => {
    (prisma.checkout.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findActiveByCustomer(CustomerIdVO.create(UUID_CUSTOMER))).toBeNull();
  });
  it('findByCartId', async () => {
    (prisma.checkout.findFirst as jest.Mock).mockResolvedValue(checkoutRow());
    expect((await repo.findByCartId('cart-1'))?.id).toBe(UUID_CHECKOUT);
  });
  it('findByCartId error', async () => {
    (prisma.checkout.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByCartId('cart-1')).toBeNull();
  });
  it('findByStatus', async () => {
    (prisma.checkout.findMany as jest.Mock).mockResolvedValue([checkoutRow()]);
    expect(await repo.findByStatus(CheckoutStatusVO.pending())).toHaveLength(1);
  });
  it('findByStatus error', async () => {
    (prisma.checkout.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByStatus(CheckoutStatusVO.pending())).toEqual([]);
  });
  it('findByOrderId', async () => {
    (prisma.checkout.findFirst as jest.Mock).mockResolvedValue(checkoutRow());
    expect((await repo.findByOrderId('order-1'))?.id).toBe(UUID_CHECKOUT);
  });
  it('findByOrderId error', async () => {
    (prisma.checkout.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByOrderId('order-1')).toBeNull();
  });
  it('findExpired', async () => {
    (prisma.checkout.findMany as jest.Mock).mockResolvedValue([checkoutRow()]);
    expect(await repo.findExpired(new Date().toISOString())).toHaveLength(1);
  });
  it('findExpired error', async () => {
    (prisma.checkout.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findExpired(new Date().toISOString())).toEqual([]);
  });
  it('findAll', async () => {
    (prisma.checkout.findMany as jest.Mock).mockResolvedValue([checkoutRow()]);
    expect(await repo.findAll()).toHaveLength(1);
  });
  it('findAll error', async () => {
    (prisma.checkout.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('exists', async () => {
    (prisma.checkout.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_CHECKOUT)).toBe(true);
  });
  it('exists error', async () => {
    (prisma.checkout.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_CHECKOUT)).toBe(false);
  });
  it('save creates', async () => {
    (prisma.checkout.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.checkout.create as jest.Mock).mockResolvedValue(checkoutRow());
    const e = {
      id: UUID_CHECKOUT, customerId: { value: UUID_CUSTOMER }, cartId: undefined,
      status: { value: 'pending' }, currentStep: { value: 'cart_review' }, type: 'registered',
      currency: 'BDT', subtotal: 0, discountAmount: 0, taxAmount: 0, shippingAmount: 0,
      total: 0, shippingAddressId: undefined, billingAddressId: undefined,
      shippingMethodId: undefined, paymentMethod: undefined, orderId: undefined,
      expiresAt: '2027-01-01T00:00:00Z', updatedAt: NOW_DATE.toISOString(),
    };
    expect((await repo.save(e as never)).id).toBe(UUID_CHECKOUT);
  });
  it('save updates', async () => {
    (prisma.checkout.findUnique as jest.Mock).mockResolvedValue(checkoutRow());
    (prisma.checkout.update as jest.Mock).mockResolvedValue(checkoutRow());
    const e = { id: UUID_CHECKOUT, customerId: { value: UUID_CUSTOMER }, status: { value: 'pending' },
      currentStep: { value: 'cart_review' }, type: 'registered', currency: 'BDT',
      subtotal: 0, discountAmount: 0, taxAmount: 0, shippingAmount: 0, total: 0,
      expiresAt: '2027-01-01', updatedAt: NOW_DATE.toISOString() };
    await repo.save(e as never);
    expect(prisma.checkout.update).toHaveBeenCalled();
  });
  it('save throws', async () => {
    (prisma.checkout.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_CHECKOUT } as never)).rejects.toThrow();
  });
  it('delete / softDelete', async () => {
    (prisma.checkout.update as jest.Mock).mockResolvedValue(checkoutRow());
    await repo.delete(UUID_CHECKOUT);
    await repo.softDelete(UUID_CHECKOUT);
    expect(prisma.checkout.update).toHaveBeenCalledTimes(2);
  });
  it('delete swallows error', async () => {
    (prisma.checkout.update as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_CHECKOUT)).resolves.toBeUndefined();
  });
});

describe('CheckoutSessionPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: CheckoutSessionPrismaRepository;
  beforeEach(() => { prisma = mockPrisma(); repo = new CheckoutSessionPrismaRepository(prisma as never); });

  it('findById', async () => {
    (prisma.checkoutSession.findUnique as jest.Mock).mockResolvedValue(sessionRow());
    expect((await repo.findById(UUID_SESSION))?.id).toBe(UUID_SESSION);
  });
  it('findById error', async () => {
    (prisma.checkoutSession.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_SESSION)).toBeNull();
  });
  it('findByCheckoutId', async () => {
    (prisma.checkoutSession.findFirst as jest.Mock).mockResolvedValue(sessionRow());
    expect((await repo.findByCheckoutId(CheckoutIdVO.create(UUID_CHECKOUT)))?.id).toBe(UUID_SESSION);
  });
  it('findByCheckoutId error', async () => {
    (prisma.checkoutSession.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByCheckoutId(CheckoutIdVO.create(UUID_CHECKOUT))).toBeNull();
  });
  it('findByToken', async () => {
    (prisma.checkoutSession.findFirst as jest.Mock).mockResolvedValue(sessionRow());
    expect((await repo.findByToken('a'.repeat(32)))?.id).toBe(UUID_SESSION);
  });
  it('findByToken error', async () => {
    (prisma.checkoutSession.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByToken('a'.repeat(32))).toBeNull();
  });
  it('findByCustomerId', async () => {
    (prisma.checkoutSession.findMany as jest.Mock).mockResolvedValue([sessionRow()]);
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toHaveLength(1);
  });
  it('findByCustomerId error', async () => {
    (prisma.checkoutSession.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toEqual([]);
  });
  it('findExpired', async () => {
    (prisma.checkoutSession.findMany as jest.Mock).mockResolvedValue([sessionRow()]);
    expect(await repo.findExpired(new Date().toISOString())).toHaveLength(1);
  });
  it('findExpired error', async () => {
    (prisma.checkoutSession.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findExpired(new Date().toISOString())).toEqual([]);
  });
  it('findAll / error', async () => {
    (prisma.checkoutSession.findMany as jest.Mock).mockResolvedValue([sessionRow()]);
    expect(await repo.findAll()).toHaveLength(1);
    (prisma.checkoutSession.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('exists', async () => {
    (prisma.checkoutSession.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_SESSION)).toBe(true);
    (prisma.checkoutSession.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_SESSION)).toBe(false);
  });
  it('save creates + throws', async () => {
    (prisma.checkoutSession.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.checkoutSession.create as jest.Mock).mockResolvedValue(sessionRow());
    const e = { id: UUID_SESSION, checkoutId: { value: UUID_CHECKOUT }, customerId: { value: UUID_CUSTOMER },
      token: 'a'.repeat(32), stepData: undefined, ipAddress: undefined, userAgent: undefined,
      expiresAt: '2027-01-01', updatedAt: NOW_DATE.toISOString() };
    expect((await repo.save(e as never)).id).toBe(UUID_SESSION);

    (prisma.checkoutSession.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_SESSION } as never)).rejects.toThrow();
  });
  it('delete + deleteByCheckoutId + errors', async () => {
    (prisma.checkoutSession.delete as jest.Mock).mockResolvedValue(sessionRow());
    await repo.delete(UUID_SESSION);
    (prisma.checkoutSession.delete as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_SESSION)).resolves.toBeUndefined();

    (prisma.checkoutSession.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });
    await repo.deleteByCheckoutId(CheckoutIdVO.create(UUID_CHECKOUT));
    (prisma.checkoutSession.deleteMany as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.deleteByCheckoutId(CheckoutIdVO.create(UUID_CHECKOUT))).resolves.toBeUndefined();
  });
});
