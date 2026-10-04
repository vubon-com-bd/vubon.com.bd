import { jest } from '@jest/globals';
import { OrderHistoryPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/order-history.prisma.repository.js';
import { HistoryTypeVO } from '../../../../../../src/module/domain/value-objects/primitives/history-type.vo.js';
import { OrderIdVO } from '../../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { mockPrisma, UUID_ORDER, NOW_DATE } from './_prisma-mock.js';

const UUID_HIST = 'hhhhhhhh-hhhh-4hhh-8hhh-hhhhhhhhhhhh';

function histRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_HIST, orderId: UUID_ORDER, type: 'status_changed',
    fromValue: 'pending', toValue: 'confirmed',
    actorId: null, actorType: null, metadata: null, createdAt: NOW_DATE,
    ...o,
  };
}

describe('OrderHistoryPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: OrderHistoryPrismaRepository;
  beforeEach(() => { prisma = mockPrisma(); repo = new OrderHistoryPrismaRepository(prisma as never); });

  it('findById + error', async () => {
    (prisma.orderHistory.findUnique as jest.Mock).mockResolvedValue(histRow());
    expect((await repo.findById(UUID_HIST))?.id).toBe(UUID_HIST);
    (prisma.orderHistory.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_HIST)).toBeNull();
  });
  it('findByIdVO', async () => {
    (prisma.orderHistory.findUnique as jest.Mock).mockResolvedValue(histRow());
    await repo.findByIdVO({ value: UUID_HIST } as never);
    expect(prisma.orderHistory.findUnique).toHaveBeenCalled();
  });
  it('findByOrderId + error', async () => {
    (prisma.orderHistory.findMany as jest.Mock).mockResolvedValue([histRow()]);
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toHaveLength(1);
    (prisma.orderHistory.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toEqual([]);
  });
  it('findByType + error', async () => {
    (prisma.orderHistory.findMany as jest.Mock).mockResolvedValue([histRow()]);
    expect(await repo.findByType(OrderIdVO.create(UUID_ORDER), HistoryTypeVO.create('status_changed'))).toHaveLength(1);
    (prisma.orderHistory.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByType(OrderIdVO.create(UUID_ORDER), HistoryTypeVO.create('status_changed'))).toEqual([]);
  });
  it('findRecentByOrder + error', async () => {
    (prisma.orderHistory.findMany as jest.Mock).mockResolvedValue([histRow()]);
    expect(await repo.findRecentByOrder(OrderIdVO.create(UUID_ORDER), 10)).toHaveLength(1);
    (prisma.orderHistory.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findRecentByOrder(OrderIdVO.create(UUID_ORDER), 10)).toEqual([]);
  });
  it('countByOrder + error', async () => {
    (prisma.orderHistory.count as jest.Mock).mockResolvedValue(5);
    expect(await repo.countByOrder(OrderIdVO.create(UUID_ORDER))).toBe(5);
    (prisma.orderHistory.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.countByOrder(OrderIdVO.create(UUID_ORDER))).toBe(0);
  });
  it('deleteByOrder + error', async () => {
    (prisma.orderHistory.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });
    await repo.deleteByOrder(OrderIdVO.create(UUID_ORDER));
    (prisma.orderHistory.deleteMany as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.deleteByOrder(OrderIdVO.create(UUID_ORDER))).resolves.toBeUndefined();
  });
  it('findAll + error', async () => {
    (prisma.orderHistory.findMany as jest.Mock).mockResolvedValue([histRow()]);
    expect(await repo.findAll()).toHaveLength(1);
    (prisma.orderHistory.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('exists + error', async () => {
    (prisma.orderHistory.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_HIST)).toBe(true);
    (prisma.orderHistory.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_HIST)).toBe(false);
  });
  it('save + error + delete', async () => {
    (prisma.orderHistory.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.orderHistory.create as jest.Mock).mockResolvedValue(histRow());
    const e = { id: UUID_HIST, orderId: { value: UUID_ORDER }, type: { value: 'status_changed' },
      fromValue: 'pending', toValue: 'confirmed', actorId: undefined, actorType: undefined, metadata: undefined };
    expect((await repo.save(e as never)).id).toBe(UUID_HIST);
    (prisma.orderHistory.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_HIST } as never)).rejects.toThrow();

    (prisma.orderHistory.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });
    await repo.delete(UUID_HIST);
    (prisma.orderHistory.deleteMany as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_HIST)).resolves.toBeUndefined();
  });
});
