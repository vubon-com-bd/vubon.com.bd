/**
 * OrderReturnEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderReturnEntity } from '@domain/entities/order-return.entity.js';
import { OrderReturnVO } from '@domain/composites/order-return.vo.js';
import { ReturnReasonVO } from '@domain/primitives/return-reason.vo.js';
import { ReturnStatusVO } from '@domain/primitives/return-status.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import {
  fixtureReturnId,
  fixtureOrderId,
  fixtureCustomerId,
} from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeVO(status: string = 'requested') {
  return OrderReturnVO.create({
    id: fixtureReturnId,
    orderId: fixtureOrderId,
    customerId: fixtureCustomerId,
    reason: ReturnReasonVO.create('defective'),
    status: ReturnStatusVO.create(status),
    itemIds: ['item-1'],
    requestedAt: NOW,
  });
}

function makeCreateParams(overrides: Partial<Parameters<typeof OrderReturnEntity.create>[0]> = {}) {
  return {
    id: fixtureReturnId.value,
    vo: makeVO(),
    now: NOW,
    ...overrides,
  };
}

describe('OrderReturnEntity', () => {
  describe('create', () => {
    it('creates requested return', () => {
      const entity = OrderReturnEntity.create(makeCreateParams());
      expect(entity.isPending()).toBe(true);
    });
  });

  describe('reconstitute', () => {
    it('rehydrates existing return', () => {
      const entity = OrderReturnEntity.reconstitute({
        id: fixtureReturnId.value,
        createdAt: NOW,
        updatedAt: NOW,
        vo: makeVO(),
      });
      expect(entity.id).toBe(fixtureReturnId.value);
    });
  });

  describe('approve', () => {
    it('approves requested return', () => {
      const entity = OrderReturnEntity.create(makeCreateParams());
      entity.approve(NOW);
      expect(entity.status.isApproved()).toBe(true);
    });

    it('throws on invalid transition', () => {
      const entity = OrderReturnEntity.create(
        makeCreateParams({ vo: makeVO('rejected') }),
      );
      expect(() => entity.approve(NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('reject', () => {
    it('rejects requested return', () => {
      const entity = OrderReturnEntity.create(makeCreateParams());
      entity.reject('not eligible', NOW);
      expect(entity.status.isRejected()).toBe(true);
    });

    it('throws when rejecting non-requested', () => {
      const entity = OrderReturnEntity.create(
        makeCreateParams({ vo: makeVO('approved') }),
      );
      expect(() => entity.reject('reason', NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('full lifecycle', () => {
    it('requested → approved → pickup_scheduled → picked_up → received → inspected → refunded', () => {
      const entity = OrderReturnEntity.create(makeCreateParams());
      entity.approve(NOW);
      entity.schedulePickup(NOW);
      entity.pickUp(NOW);
      entity.receive(NOW);
      entity.inspect(NOW);
      entity.refund(NOW);
      expect(entity.status.isRefunded()).toBe(true);
    });
  });
});

// ═══════════════ Branch edge cases ═══════════════
describe('OrderReturnEntity — branch coverage', () => {
  it('getters', () => {
    const entity = OrderReturnEntity.create(makeCreateParams());
    expect(entity.vo).toBeDefined();
    expect(entity.customerId).toBeDefined();
    expect(entity.itemIds.length).toBeGreaterThan(0);
  });

  it('isTerminal true for closed', () => {
    const entity = OrderReturnEntity.create(
      makeCreateParams({ vo: makeVO('closed') }),
    );
    expect(entity.isTerminal()).toBe(true);
  });

  it('isTerminal false for approved', () => {
    const entity = OrderReturnEntity.create(
      makeCreateParams({ vo: makeVO('approved') }),
    );
    expect(entity.isTerminal()).toBe(false);
  });
});
