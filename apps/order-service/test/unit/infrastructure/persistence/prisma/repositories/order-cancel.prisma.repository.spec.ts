import { jest } from '@jest/globals';
import { OrderCancelPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/order-cancel.prisma.repository.js';
import { CancelStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/cancel-status.vo.js';
import { OrderIdVO } from '../../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../../../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { mockPrisma, UUID_ORDER, UUID_CUSTOMER, NOW_DATE } from './_prisma-mock.js';

const UUID_CANCEL = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';

function cancelRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_CANCEL, orderId: UUID_ORDER, reason: 'customer_request',
    status: 'requested', requestedBy: UUID_CUSTOMER, approvedBy: null,
    notes: null, refundAmount: null, currency: 'BDT', restockInventory: true,
    requestedAt: NOW_DATE, processedAt: null, createdAt: NOW_DATE, updatedAt: NOW_DATE,
    ...o,
  };
}

describe('OrderCancelPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: OrderCancelPrismaRepository;
  beforeEach(() => { prisma = mockPrisma(); repo = new OrderCancelPrismaRepository(prisma as never); });

  it('findById + error', async () => {
    (prisma.orderCancel.findUnique as jest.Mock).mockResolvedValue(cancelRow());
    expect((await repo.findById(UUID_CANCEL))?.id).toBe(UUID_CANCEL);
    (prisma.orderCancel.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_CANCEL)).toBeNull();
  });
  it('findByIdVO', async () => {
    (prisma.orderCancel.findUnique as jest.Mock).mockResolvedValue(cancelRow());
    await repo.findByIdVO({ value: UUID_CANCEL } as never);
    expect(prisma.orderCancel.findUnique).toHaveBeenCalled();
  });
  it('findByOrderId + error', async () => {
    (prisma.orderCancel.findMany as jest.Mock).mockResolvedValue([cancelRow()]);
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toHaveLength(1);
    (prisma.orderCancel.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toEqual([]);
  });
  it('findActiveByOrder + error', async () => {
    (prisma.orderCancel.findFirst as jest.Mock).mockResolvedValue(cancelRow());
    expect((await repo.findActiveByOrder(OrderIdVO.create(UUID_ORDER)))?.id).toBe(UUID_CANCEL);
    (prisma.orderCancel.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findActiveByOrder(OrderIdVO.create(UUID_ORDER))).toBeNull();
  });
  it('findByStatus + error', async () => {
    (prisma.orderCancel.findMany as jest.Mock).mockResolvedValue([cancelRow()]);
    expect(await repo.findByStatus(CancelStatusVO.requested())).toHaveLength(1);
    (prisma.orderCancel.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByStatus(CancelStatusVO.requested())).toEqual([]);
  });
  it('findByCustomerId + error', async () => {
    (prisma.orderCancel.findMany as jest.Mock).mockResolvedValue([cancelRow()]);
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toHaveLength(1);
    (prisma.orderCancel.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toEqual([]);
  });
  it('existsByOrderId + error', async () => {
    (prisma.orderCancel.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.existsByOrderId(OrderIdVO.create(UUID_ORDER))).toBe(true);
    (prisma.orderCancel.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.existsByOrderId(OrderIdVO.create(UUID_ORDER))).toBe(false);
  });
  it('findAll + error', async () => {
    (prisma.orderCancel.findMany as jest.Mock).mockResolvedValue([cancelRow()]);
    expect(await repo.findAll()).toHaveLength(1);
    (prisma.orderCancel.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('exists + error', async () => {
    (prisma.orderCancel.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_CANCEL)).toBe(true);
    (prisma.orderCancel.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_CANCEL)).toBe(false);
  });
  it('save + error', async () => {
    (prisma.orderCancel.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.orderCancel.create as jest.Mock).mockResolvedValue(cancelRow());
    const e = { id: UUID_CANCEL, orderId: { value: UUID_ORDER }, reason: { value: 'customer_request' },
      status: { value: 'requested' }, requestedBy: { value: UUID_CUSTOMER }, approvedBy: undefined,
      notes: undefined, refundAmount: undefined, currency: 'BDT', restockInventory: true,
      requestedAt: NOW_DATE.toISOString(), processedAt: undefined, updatedAt: NOW_DATE.toISOString() };
    expect((await repo.save(e as never)).id).toBe(UUID_CANCEL);
    (prisma.orderCancel.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_CANCEL } as never)).rejects.toThrow();
  });
  it('delete + error', async () => {
    (prisma.orderCancel.update as jest.Mock).mockResolvedValue(cancelRow());
    await repo.delete(UUID_CANCEL);
    (prisma.orderCancel.update as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_CANCEL)).resolves.toBeUndefined();
  });
});
