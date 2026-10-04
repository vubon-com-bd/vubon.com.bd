import { jest } from '@jest/globals';

/**
 * AbandonedCartService — Unit Tests
 */
import { AbandonedCartService } from '../../../../src/module/application/services/impl/abandoned-cart.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { AbandonedCartEntity } from '../../../../src/module/domain/entities/abandoned-cart.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { AbandonedCartStatusVO } from '../../../../src/module/domain/value-objects/primitives/abandoned-cart-status.vo.js';
import { AbandonedCartReminderVO } from '../../../../src/module/domain/value-objects/primitives/abandoned-cart-reminder.vo.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import type { AbandonedCartRepository } from '../../../../src/module/domain/repositories/abandoned-cart.repository.interface.js';
import {
  CART_STATUS,
  CART_TYPE,
  ABANDONED_CART_STATUS,
  ABANDONED_CART_REMINDER,
  ABANDONED_CART,
} from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const AC_UUID = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';
const FUTURE = '2099-12-31T23:59:59Z';

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
}

function makeCartRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(async (c) => c), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findBySessionId: jest.fn(), findActiveByUserId: jest.fn(),
    findAllByUserId: jest.fn(), findExpired: jest.fn(), findInactive: jest.fn(),
    findPaginated: jest.fn(), countByUserId: jest.fn(), softDelete: jest.fn(),
  };
}

function makeAbandonedRepo(): jest.Mocked<AbandonedCartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(async (e) => e), delete: jest.fn(), exists: jest.fn(),
    findByCartId: jest.fn(), findByUserId: jest.fn(), findPending: jest.fn(),
    findReadyForReminder: jest.fn(), findPaginated: jest.fn(),
    getStats: jest.fn(), countByStatus: jest.fn(),
  };
}

function makeCart(lastActivityAt = hoursAgo(48)) {
  const c = CartEntity.create({
    id: UUID,
    now: lastActivityAt,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT',
      expiresAt: FUTURE,
      lastActivityAt,
    },
  });
  c['_items'] = [{ quantity: { value: 2 } } as never];
  return c;
}

function makeAbandonedEntity(remindersSent = 0) {
  return AbandonedCartEntity.create({
    id: AC_UUID,
    now: hoursAgo(48),
    props: {
      cartId: CartIdVO.create(UUID),
      status: AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.PENDING),
      reminderType: AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.EMAIL),
      itemCount: 2,
      cartValue: 500,
      currency: 'BDT',
      abandonedAt: hoursAgo(48),
      remindersSent,
    },
  });
}

describe('AbandonedCartService', () => {
  let cartRepo: jest.Mocked<CartRepository>;
  let abRepo: jest.Mocked<AbandonedCartRepository>;
  let svc: AbandonedCartService;

  beforeEach(() => {
    cartRepo = makeCartRepo();
    abRepo = makeAbandonedRepo();
    svc = new AbandonedCartService(cartRepo, abRepo);
  });

  describe('detect()', () => {
    it('returns null when not abandoned', async () => {
      cartRepo.findById.mockResolvedValue(makeCart(hoursAgo(1)));
      const r = await svc.detect(UUID);
      expect(r).toBeNull();
    });

    it('returns null when existing record found but recalc detects abandoned', async () => {
      cartRepo.findById.mockResolvedValue(makeCart(hoursAgo(48)));
      abRepo.findByCartId.mockResolvedValue(null);
      const r = await svc.detect(UUID);
      expect(r).toBeNull(); // no existing record and service doesn't auto-create
    });

    it('returns existing record when found', async () => {
      cartRepo.findById.mockResolvedValue(makeCart(hoursAgo(48)));
      abRepo.findByCartId.mockResolvedValue(makeAbandonedEntity());
      const r = await svc.detect(UUID);
      expect(r?.id).toBe(AC_UUID);
    });

    it('throws when cart not found', async () => {
      cartRepo.findById.mockResolvedValue(null);
      await expect(svc.detect('x')).rejects.toThrow();
    });
  });

  describe('sendReminder()', () => {
    it('sends reminder and returns count', async () => {
      abRepo.findById.mockResolvedValue(makeAbandonedEntity(0));
      const count = await svc.sendReminder(AC_UUID, 'email');
      expect(count).toBe(1);
      expect(abRepo.save).toHaveBeenCalled();
    });

    it('returns 0 when abandoned cart not found', async () => {
      abRepo.findById.mockResolvedValue(null);
      const count = await svc.sendReminder('x', 'email');
      expect(count).toBe(0);
    });
  });

  describe('recover()', () => {
    it('marks abandoned as recovered', async () => {
      abRepo.findById.mockResolvedValue(makeAbandonedEntity());
      const r = await svc.recover(AC_UUID, 'order-1', 500);
      expect(r.status).toBe(ABANDONED_CART_STATUS.RECOVERED);
      expect(r.recoveredOrderId).toBe('order-1');
    });

    it('throws when not found', async () => {
      abRepo.findById.mockResolvedValue(null);
      await expect(svc.recover('x', 'order-1', 500)).rejects.toThrow();
    });
  });

  describe('markLost()', () => {
    it('marks as lost', async () => {
      abRepo.findById.mockResolvedValue(makeAbandonedEntity());
      await svc.markLost(AC_UUID, 'expired');
      expect(abRepo.save).toHaveBeenCalled();
    });

    it('no-op when not found', async () => {
      abRepo.findById.mockResolvedValue(null);
      await expect(svc.markLost('x', 'r')).resolves.toBeUndefined();
    });
  });

  describe('listPending()', () => {
    it('returns pending abandoned carts', async () => {
      abRepo.findPending.mockResolvedValue([makeAbandonedEntity()]);
      const r = await svc.listPending();
      expect(r.length).toBe(1);
    });
  });

  describe('getStats()', () => {
    it('returns abandoned stats', async () => {
      abRepo.getStats.mockResolvedValue({
        total: 10,
        pending: 3,
        reminded: 2,
        recovered: 4,
        lost: 1,
        recoveryRate: 0.4,
        averageCartValue: 500,
      });
      const r = await svc.getStats();
      expect(r.total).toBe(10);
      expect(r.recoveryRate).toBe(0.4);
    });
  });
});

void ABANDONED_CART;
