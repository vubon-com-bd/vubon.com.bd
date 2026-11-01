/**
 * OrderCancelEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderCancelEntity } from '@domain/entities/order-cancel.entity.js';
import { OrderCancelVO } from '@domain/composites/order-cancel.vo.js';
import { CancelReasonVO } from '@domain/primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '@domain/primitives/cancel-status.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { fixtureCancelId, fixtureOrderId } from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeVO(status: string = 'requested') {
  return OrderCancelVO.create({
    id: fixtureCancelId,
    orderId: fixtureOrderId,
    reason: CancelReasonVO.create('customer_request'),
    status: CancelStatusVO.create(status),
    requestedBy: 'user-1',
    requestedAt: NOW,
    ...(status === 'approved' ? { approvedBy: 'admin-1' } : {}),
  });
}

function makeCreateParams(overrides: Partial<Parameters<typeof OrderCancelEntity.create>[0]> = {}) {
  return {
    id: fixtureCancelId.value,
    vo: makeVO(),
    now: NOW,
    ...overrides,
  };
}

describe('OrderCancelEntity', () => {
  describe('create', () => {
    it('creates requested cancel', () => {
      const entity = OrderCancelEntity.create(makeCreateParams());
      expect(entity.isPending()).toBe(true);
    });
  });

  describe('reconstitute', () => {
    it('rehydrates existing cancel', () => {
      const entity = OrderCancelEntity.reconstitute({
        id: fixtureCancelId.value,
        createdAt: NOW,
        updatedAt: NOW,
        vo: makeVO(),
      });
      expect(entity.id).toBe(fixtureCancelId.value);
    });
  });

  describe('approve', () => {
    it('approves requested cancel', () => {
      const entity = OrderCancelEntity.create(makeCreateParams());
      entity.approve('admin-1', NOW);
      expect(entity.status.isApproved()).toBe(true);
    });

    it('throws when approving non-requested', () => {
      const entity = OrderCancelEntity.create(
        makeCreateParams({ vo: makeVO('approved') }),
      );
      expect(() => entity.approve('admin-1', NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('reject', () => {
    it('rejects requested cancel', () => {
      const entity = OrderCancelEntity.create(makeCreateParams());
      entity.reject('admin-1', 'not eligible', NOW);
      expect(entity.status.isRejected()).toBe(true);
    });

    it('throws when rejecting non-requested', () => {
      const entity = OrderCancelEntity.create(
        makeCreateParams({ vo: makeVO('approved') }),
      );
      expect(() => entity.reject('admin-1', 'reason', NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('process', () => {
    it('processes approved cancel', () => {
      const entity = OrderCancelEntity.create(
        makeCreateParams({ vo: makeVO('approved') }),
      );
      entity.process(NOW);
      expect(entity.status.isProcessed()).toBe(true);
    });

    it('throws when processing non-approved', () => {
      const entity = OrderCancelEntity.create(makeCreateParams());
      expect(() => entity.process(NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('refund', () => {
    it('refunds processed cancel', () => {
      const entity = OrderCancelEntity.create(
        makeCreateParams({ vo: makeVO('processed') }),
      );
      entity.refund(NOW);
      expect(entity.status.isRefunded()).toBe(true);
    });

    it('throws when refunding non-processed', () => {
      const entity = OrderCancelEntity.create(makeCreateParams());
      expect(() => entity.refund(NOW)).toThrow(BusinessRuleError);
    });
  });
});

// ═══════════════ Branch edge cases ═══════════════
describe('OrderCancelEntity — branch coverage', () => {
  it('getters return VO', () => {
    const entity = OrderCancelEntity.create(makeCreateParams());
    expect(entity.vo).toBeDefined();
    expect(entity.orderId).toBeDefined();
    expect(entity.status).toBeDefined();
  });

  it('isTerminal false for approved', () => {
    const entity = OrderCancelEntity.create(
      makeCreateParams({ vo: makeVO('approved') }),
    );
    expect(entity.isTerminal()).toBe(false);
  });

  it('isTerminal true for refunded', () => {
    const entity = OrderCancelEntity.create(
      makeCreateParams({ vo: makeVO('refunded') }),
    );
    expect(entity.isTerminal()).toBe(true);
  });
});
