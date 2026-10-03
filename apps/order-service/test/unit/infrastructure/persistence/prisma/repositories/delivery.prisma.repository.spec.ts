import { jest } from '@jest/globals';
import { DeliveryPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/delivery.prisma.repository.js';
import { DeliveryMethodPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/delivery-method.prisma.repository.js';
import { DeliveryStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryMethodTypeVO } from '../../../../../../src/module/domain/value-objects/primitives/delivery-method-type.vo.js';
import { OrderIdVO } from '../../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { mockPrisma, UUID_ORDER, NOW_DATE } from './_prisma-mock.js';

const UUID_DEL = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
const UUID_METHOD = 'mmmmmmmm-mmmm-4mmm-8mmm-mmmmmmmmmmmm';

function delRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_DEL, orderId: UUID_ORDER, deliveryMethodId: null,
    status: 'scheduled', type: 'standard', trackingNumber: null,
    courierId: null, estimatedAt: null, deliveredAt: null,
    attempts: 0, notes: null, createdAt: NOW_DATE, updatedAt: NOW_DATE, deletedAt: null,
    ...o,
  };
}
function methodRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_METHOD, name: 'Standard', type: 'standard', carrier: null,
    baseCost: 50, currency: 'BDT', estimatedDays: 3, isActive: true,
    createdAt: NOW_DATE, updatedAt: NOW_DATE, ...o,
  };
}

describe('DeliveryPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: DeliveryPrismaRepository;
  beforeEach(() => { prisma = mockPrisma(); repo = new DeliveryPrismaRepository(prisma as never); });

  it('findById + null + error', async () => {
    (prisma.delivery.findUnique as jest.Mock).mockResolvedValue(delRow());
    expect((await repo.findById(UUID_DEL))?.id).toBe(UUID_DEL);
    (prisma.delivery.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(UUID_DEL)).toBeNull();
    (prisma.delivery.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_DEL)).toBeNull();
  });
  it('findByIdVO', async () => {
    (prisma.delivery.findUnique as jest.Mock).mockResolvedValue(delRow());
    await repo.findByIdVO({ value: UUID_DEL } as never);
    expect(prisma.delivery.findUnique).toHaveBeenCalled();
  });
  it('findByOrderId + error', async () => {
    (prisma.delivery.findMany as jest.Mock).mockResolvedValue([delRow()]);
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toHaveLength(1);
    (prisma.delivery.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toEqual([]);
  });
  it('findByStatus + error', async () => {
    (prisma.delivery.findMany as jest.Mock).mockResolvedValue([delRow()]);
    expect(await repo.findByStatus(DeliveryStatusVO.scheduled())).toHaveLength(1);
    (prisma.delivery.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByStatus(DeliveryStatusVO.scheduled())).toEqual([]);
  });
  it('findByTrackingNumber + error', async () => {
    (prisma.delivery.findFirst as jest.Mock).mockResolvedValue(delRow());
    expect((await repo.findByTrackingNumber('TRK-AAA'))?.id).toBe(UUID_DEL);
    (prisma.delivery.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByTrackingNumber('TRK-AAA')).toBeNull();
  });
  it('findByCourierId + error', async () => {
    (prisma.delivery.findMany as jest.Mock).mockResolvedValue([delRow()]);
    expect(await repo.findByCourierId('c1')).toHaveLength(1);
    (prisma.delivery.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByCourierId('c1')).toEqual([]);
  });
  it('findActiveByOrder + error', async () => {
    (prisma.delivery.findFirst as jest.Mock).mockResolvedValue(delRow());
    expect((await repo.findActiveByOrder(OrderIdVO.create(UUID_ORDER)))?.id).toBe(UUID_DEL);
    (prisma.delivery.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findActiveByOrder(OrderIdVO.create(UUID_ORDER))).toBeNull();
  });
  it('findOverdue + error', async () => {
    (prisma.delivery.findMany as jest.Mock).mockResolvedValue([delRow()]);
    expect(await repo.findOverdue(new Date().toISOString())).toHaveLength(1);
    (prisma.delivery.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findOverdue(new Date().toISOString())).toEqual([]);
  });
  it('findAll + error', async () => {
    (prisma.delivery.findMany as jest.Mock).mockResolvedValue([delRow()]);
    expect(await repo.findAll()).toHaveLength(1);
    (prisma.delivery.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('exists + error', async () => {
    (prisma.delivery.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_DEL)).toBe(true);
    (prisma.delivery.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_DEL)).toBe(false);
  });
  it('save + error', async () => {
    (prisma.delivery.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.delivery.create as jest.Mock).mockResolvedValue(delRow());
    const e = { id: UUID_DEL, orderId: { value: UUID_ORDER }, methodId: undefined,
      status: { value: 'scheduled' }, type: { value: 'standard' },
      trackingNumber: undefined, courierId: undefined, estimatedAt: undefined,
      deliveredAt: undefined, attempts: 0, notes: undefined,
      updatedAt: NOW_DATE.toISOString() };
    expect((await repo.save(e as never)).id).toBe(UUID_DEL);

    (prisma.delivery.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_DEL } as never)).rejects.toThrow();
  });
  it('delete + softDelete + error', async () => {
    (prisma.delivery.update as jest.Mock).mockResolvedValue(delRow());
    await repo.delete(UUID_DEL);
    await repo.softDelete(UUID_DEL);
    expect(prisma.delivery.update).toHaveBeenCalledTimes(2);
    (prisma.delivery.update as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_DEL)).resolves.toBeUndefined();
  });
});

describe('DeliveryMethodPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: DeliveryMethodPrismaRepository;
  beforeEach(() => { prisma = mockPrisma(); repo = new DeliveryMethodPrismaRepository(prisma as never); });

  it('findById + error', async () => {
    (prisma.deliveryMethod.findUnique as jest.Mock).mockResolvedValue(methodRow());
    expect((await repo.findById(UUID_METHOD))?.id).toBe(UUID_METHOD);
    (prisma.deliveryMethod.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_METHOD)).toBeNull();
  });
  it('findByIdVO', async () => {
    (prisma.deliveryMethod.findUnique as jest.Mock).mockResolvedValue(methodRow());
    await repo.findByIdVO({ value: UUID_METHOD } as never);
    expect(prisma.deliveryMethod.findUnique).toHaveBeenCalled();
  });
  it('findByName + error', async () => {
    (prisma.deliveryMethod.findFirst as jest.Mock).mockResolvedValue(methodRow());
    expect((await repo.findByName('Standard'))?.id).toBe(UUID_METHOD);
    (prisma.deliveryMethod.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByName('Standard')).toBeNull();
  });
  it('findByType + error', async () => {
    (prisma.deliveryMethod.findMany as jest.Mock).mockResolvedValue([methodRow()]);
    expect(await repo.findByType(DeliveryMethodTypeVO.create('standard'))).toHaveLength(1);
    (prisma.deliveryMethod.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByType(DeliveryMethodTypeVO.create('standard'))).toEqual([]);
  });
  it('findActive + error', async () => {
    (prisma.deliveryMethod.findMany as jest.Mock).mockResolvedValue([methodRow()]);
    expect(await repo.findActive()).toHaveLength(1);
    (prisma.deliveryMethod.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findActive()).toEqual([]);
  });
  it('findActiveByType + error', async () => {
    (prisma.deliveryMethod.findMany as jest.Mock).mockResolvedValue([methodRow()]);
    expect(await repo.findActiveByType(DeliveryMethodTypeVO.create('standard'))).toHaveLength(1);
    (prisma.deliveryMethod.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findActiveByType(DeliveryMethodTypeVO.create('standard'))).toEqual([]);
  });
  it('findAll + error', async () => {
    (prisma.deliveryMethod.findMany as jest.Mock).mockResolvedValue([methodRow()]);
    expect(await repo.findAll()).toHaveLength(1);
    (prisma.deliveryMethod.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('exists + error', async () => {
    (prisma.deliveryMethod.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_METHOD)).toBe(true);
    (prisma.deliveryMethod.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_METHOD)).toBe(false);
  });
  it('existsByName + error', async () => {
    (prisma.deliveryMethod.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.existsByName('Standard')).toBe(true);
    (prisma.deliveryMethod.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.existsByName('Standard')).toBe(false);
  });
  it('save + error + delete', async () => {
    (prisma.deliveryMethod.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.deliveryMethod.create as jest.Mock).mockResolvedValue(methodRow());
    const e = { id: UUID_METHOD, name: 'Standard', type: { value: 'standard' },
      carrier: undefined, baseCost: 50, currency: 'BDT', estimatedDays: 3,
      isActive: true, updatedAt: NOW_DATE.toISOString() };
    expect((await repo.save(e as never)).id).toBe(UUID_METHOD);

    (prisma.deliveryMethod.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_METHOD } as never)).rejects.toThrow();

    (prisma.deliveryMethod.update as jest.Mock).mockResolvedValue(methodRow());
    await repo.delete(UUID_METHOD);
    (prisma.deliveryMethod.update as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_METHOD)).resolves.toBeUndefined();
  });
});
