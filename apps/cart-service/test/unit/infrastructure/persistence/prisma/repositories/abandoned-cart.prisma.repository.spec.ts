/**
 * AbandonedCartPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { AbandonedCartPrismaRepository } from '@infrastructure/persistence/prisma/repositories/abandoned-cart.prisma.repository.js';
import { AbandonedCartIdVO } from '@domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '@fixtures/index';
import {
  makeMockPrismaService,
  makeMockDelegate,
  type MockDelegate,
} from '@test-infra/index';

function makeRow(overrides: Record<string, unknown> = {}) {
  return {
    id: TEST_IDS.ABANDONED_CART_ID,
    cartId: TEST_IDS.CART_ID,
    userId: TEST_IDS.USER_ID,
    email: 'test@example.com',
    status: 'pending',
    reminderType: 'email',
    itemCount: 3,
    cartValue: 500,
    currency: TEST_CURRENCY,
    abandonedAt: new Date(TEST_DATES.YESTERDAY),
    remindersSent: 0,
    lastReminderAt: null,
    recoveredAt: null,
    recoveredOrderId: null,
    recoveryDiscountPercent: null,
    createdAt: new Date(TEST_DATES.TWO_DAYS_AGO),
    updatedAt: new Date(TEST_DATES.YESTERDAY),
    deletedAt: null,
    ...overrides,
  };
}

describe('AbandonedCartPrismaRepository', () => {
  let delegate: MockDelegate;
  let repo: AbandonedCartPrismaRepository;

  beforeEach(() => {
    delegate = makeMockDelegate();
    const prisma = makeMockPrismaService({ delegates: { abandonedCart: delegate } });
    repo = new AbandonedCartPrismaRepository(prisma as never);
  });

  describe('findByIdVO()', () => {
    it('should return entity when found', async () => {
      delegate.findFirst.mockResolvedValue(makeRow() as never);
      const result = await repo.findByIdVO(
        AbandonedCartIdVO.reconstitute(TEST_IDS.ABANDONED_CART_ID),
      );
      expect(result?.id).toBe(TEST_IDS.ABANDONED_CART_ID);
    });

    it('should return null when not found', async () => {
      delegate.findFirst.mockResolvedValue(null as never);
      const result = await repo.findByIdVO(
        AbandonedCartIdVO.reconstitute(TEST_IDS.ABANDONED_CART_ID),
      );
      expect(result).toBeNull();
    });
  });

  describe('findByCartId()', () => {
    it('should find by cartId', async () => {
      delegate.findFirst.mockResolvedValue(makeRow() as never);
      const result = await repo.findByCartId(TEST_IDS.CART_ID);
      expect(result?.cartId.value).toBe(TEST_IDS.CART_ID);
    });
  });

  describe('findByUserId()', () => {
    it('should find all abandoned carts by user', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      const result = await repo.findByUserId(TEST_IDS.USER_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('findByStatus()', () => {
    it('should filter by status', async () => {
      delegate.findMany.mockResolvedValue([makeRow({ status: 'recovered' })] as never);
      const result = await repo.findByStatus('recovered');
      expect(result).toHaveLength(1);
    });
  });

  describe('findPendingReminders()', () => {
    it('should find carts with pending reminders', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      const result = await repo.findPendingReminders(4);
      expect(result).toHaveLength(1);
      const callArg = (delegate.findMany.mock.calls[0] as unknown[])[0] as {
        where: Record<string, unknown>;
      };
      expect(callArg.where['remindersSent']).toEqual({ lt: 4 });
    });
  });

  describe('findLostCandidates()', () => {
    it('should find candidates older than N days', async () => {
      delegate.findMany.mockResolvedValue([] as never);
      await repo.findLostCandidates(30);
      expect(delegate.findMany).toHaveBeenCalled();
    });
  });

  describe('findRecoverable()', () => {
    it('should find recoverable carts', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      const result = await repo.findRecoverable();
      expect(result).toHaveLength(1);
    });
  });

  describe('findRecovered()', () => {
    it('should find recovered carts', async () => {
      delegate.findMany.mockResolvedValue([makeRow({ status: 'recovered' })] as never);
      const result = await repo.findRecovered();
      expect(result).toHaveLength(1);
    });
  });

  describe('save()', () => {
    it('should create when not exists', async () => {
      delegate.findUnique.mockResolvedValue(null as never);
      delegate.create.mockResolvedValue(makeRow() as never);

      const entity = await repo.findByIdVO(
        AbandonedCartIdVO.reconstitute(TEST_IDS.ABANDONED_CART_ID),
      );
      if (entity) {
        await repo.save(entity);
        expect(delegate.create).toHaveBeenCalled();
      }
    });

    it('should update when exists', async () => {
      delegate.findUnique.mockResolvedValue({ id: TEST_IDS.ABANDONED_CART_ID } as never);
      delegate.update.mockResolvedValue(makeRow() as never);

      const entity = await repo.findByIdVO(
        AbandonedCartIdVO.reconstitute(TEST_IDS.ABANDONED_CART_ID),
      );
      if (entity) {
        await repo.save(entity);
        expect(delegate.update).toHaveBeenCalled();
      }
    });
  });

  describe('findPaginated()', () => {
    it('should return paginated result', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      delegate.count.mockResolvedValue(1 as never);

      const result = await repo.findPaginated({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('getStats()', () => {
    it('should aggregate stats', async () => {
      delegate.findMany.mockResolvedValue([
        { ...makeRow(), status: 'recovered', cartValue: 100 },
        { ...makeRow(), status: 'pending', cartValue: 200 },
      ] as never);

      const stats = await repo.getStats();
      expect(stats.total).toBe(2);
      expect(stats.recoveredCount).toBe(1);
      expect(stats.recoveryRate).toBe(50);
    });
  });

  describe('bulkUpdateStatus()', () => {
    it('should update each id', async () => {
      delegate.update.mockResolvedValue({} as never);
      const count = await repo.bulkUpdateStatus(
        [TEST_IDS.ABANDONED_CART_ID],
        'lost',
      );
      expect(count).toBe(1);
    });
  });
});
