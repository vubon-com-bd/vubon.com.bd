import { jest } from '@jest/globals';
import { OrderReturnPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/order-return.prisma.repository.js';
import { ReturnStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/return-status.vo.js';
import { OrderIdVO } from '../../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../../../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { mockPrisma, UUID_ORDER, UUID_CUSTOMER, UUID_ITEM, NOW_DATE } from './_prisma-mock.js';

const UUID_RETURN = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';

function returnRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_RETURN, orderId: UUID_ORDER, customerId: UUID_CUSTOMER,
    status: 'requested', reason: 'defective',
    itemIds: [UUID_ITEM], images: [], notes: null,
    refundAmount: null, restockFee: null, currency: 'BDT',
    requestedAt: NOW_DATE, approvedAt: null, pickedUpAt: null,
    receivedAt: null, refundedAt: null, closedAt: null,
    createdAt: NOW_DATE, updatedAt: NOW_DATE,
    ...o,
  };
}

describe('OrderReturnPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: OrderReturnPrismaRepository;
  beforeEach(() => { prisma = mockPrisma(); repo = new OrderReturnPrismaRepository(prisma as never); });

  it('findById + error', async () => {
    (prisma.orderReturn.findUnique as jest.Mock).mockResolvedValue(returnRow());
    expect((await repo.findById(UUID_RETURN))?.id).toBe(UUID_RETURN);
    (prisma.orderReturn.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_RETURN)).toBeNull();
  });
  it('findByIdVO', async () => {
    (prisma.orderReturn.findUnique as jest.Mock).mockResolvedValue(returnRow());
    await repo.findByIdVO({ value: UUID_RETURN } as never);
    expect(prisma.orderReturn.findUnique).toHaveBeenCalled();
  });
  it('findByOrderId + error', async () => {
    (prisma.orderReturn.findMany as jest.Mock).mockResolvedValue([returnRow()]);
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toHaveLength(1);
    (prisma.orderReturn.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toEqual([]);
  });
  it('findByCustomerId + error', async () => {
    (prisma.orderReturn.findMany as jest.Mock).mockResolvedValue([returnRow()]);
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toHaveLength(1);
    (prisma.orderReturn.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByCustomerId(CustomerIdVO.create(UUID_CUSTOMER))).toEqual([]);
  });
  it('findByStatus + error', async () => {
    (prisma.orderReturn.findMany as jest.Mock).mockResolvedValue([returnRow()]);
    expect(await repo.findByStatus(ReturnStatusVO.requested())).toHaveLength(1);
    (prisma.orderReturn.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByStatus(ReturnStatusVO.requested())).toEqual([]);
  });
  it('findActiveByOrder + error', async () => {
    (prisma.orderReturn.findMany as jest.Mock).mockResolvedValue([returnRow()]);
    expect((await repo.findActiveByOrder(OrderIdVO.create(UUID_ORDER)))?.id).toBe(UUID_RETURN);
    (prisma.orderReturn.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findActiveByOrder(OrderIdVO.create(UUID_ORDER))).toBeNull();
  });
  it('findPendingOlderThan + error', async () => {
    (prisma.orderReturn.findMany as jest.Mock).mockResolvedValue([returnRow()]);
    expect(await repo.findPendingOlderThan(24)).toHaveLength(1);
    (prisma.orderReturn.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findPendingOlderThan(24)).toEqual([]);
  });
  it('findAll + error', async () => {
    (prisma.orderReturn.findMany as jest.Mock).mockResolvedValue([returnRow()]);
    expect(await repo.findAll()).toHaveLength(1);
    (prisma.orderReturn.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('exists + error', async () => {
    (prisma.orderReturn.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_RETURN)).toBe(true);
    (prisma.orderReturn.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_RETURN)).toBe(false);
  });
  it('save + error', async () => {
    (prisma.orderReturn.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.orderReturn.create as jest.Mock).mockResolvedValue(returnRow());
    const e = { id: UUID_RETURN, orderId: { value: UUID_ORDER }, customerId: { value: UUID_CUSTOMER },
      status: { value: 'requested' }, reason: { value: 'defective' },
      itemIds: [{ value: UUID_ITEM }], images: [], notes: undefined,
      refundAmount: undefined, restockFee: undefined, currency: 'BDT',
      requestedAt: NOW_DATE.toISOString(), approvedAt: undefined, pickedUpAt: undefined,
      receivedAt: undefined, refundedAt: undefined, closedAt: undefined,
      updatedAt: NOW_DATE.toISOString() };
    expect((await repo.save(e as never)).id).toBe(UUID_RETURN);
    (prisma.orderReturn.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_RETURN } as never)).rejects.toThrow();
  });
  it('delete + error', async () => {
    (prisma.orderReturn.update as jest.Mock).mockResolvedValue(returnRow());
    await repo.delete(UUID_RETURN);
    (prisma.orderReturn.update as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_RETURN)).resolves.toBeUndefined();
  });
});
