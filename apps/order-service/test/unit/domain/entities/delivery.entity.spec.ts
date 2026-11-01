/**
 * DeliveryEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryEntity } from '@domain/entities/delivery.entity.js';
import { DeliveryVO } from '@domain/composites/delivery.vo.js';
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '@domain/primitives/delivery-type.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  fixtureDeliveryId,
  fixtureOrderId,
  fixtureDeliveryMethodId,
} from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeDeliveryVO(status: string = 'pending') {
  return DeliveryVO.create({
    id: fixtureDeliveryId,
    orderId: fixtureOrderId,
    methodId: fixtureDeliveryMethodId,
    status: DeliveryStatusVO.create(status),
    type: DeliveryTypeVO.create('standard'),
    attempts: 0,
    ...(status === 'delivered' ? { deliveredAt: NOW } : {}),
  });
}

function makeCreateParams(overrides: Partial<Parameters<typeof DeliveryEntity.create>[0]> = {}) {
  return {
    id: fixtureDeliveryId.value,
    vo: makeDeliveryVO(),
    now: NOW,
    ...overrides,
  };
}

describe('DeliveryEntity', () => {
  describe('create', () => {
    it('creates pending delivery', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      expect(entity.id).toBe(fixtureDeliveryId.value);
      expect(entity.isPending()).toBe(true);
    });

    it('throws for non-pending status', () => {
      expect(() =>
        DeliveryEntity.create({
          id: fixtureDeliveryId.value,
          vo: makeDeliveryVO('scheduled'),
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('state machine', () => {
    it('full lifecycle: pending → scheduled → picked_up → in_transit → out_for_delivery → delivered', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      entity.schedule(undefined, undefined, undefined, NOW);
      entity.pickUp(NOW);
      entity.markInTransit(NOW);
      entity.markOutForDelivery(NOW);
      entity.markDelivered('customer', 'sig', NOW);
      expect(entity.isDelivered()).toBe(true);
      expect(entity.deliveredAt).toBe(NOW);
    });

    it('throws on invalid transition', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      expect(() => entity.markDelivered(undefined, undefined, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('schedule', () => {
    it('schedules delivery and emits event', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      const beforeCount = entity.domainEvents.length;
      entity.schedule(undefined, 'courier-1', '2024-01-05', NOW);
      expect(entity.isScheduled()).toBe(true);
      expect(entity.domainEvents.length).toBeGreaterThan(beforeCount);
    });
  });

  describe('reschedule', () => {
    it('reschedules non-terminal delivery', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      entity.schedule(undefined, undefined, undefined, NOW);
      entity.reschedule('customer request', '2024-01-10', NOW);
      expect(entity.estimatedAt).toBe('2024-01-10');
    });

    it('throws when rescheduling delivered', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      entity.schedule(undefined, undefined, undefined, NOW);
      entity.pickUp(NOW);
      entity.markInTransit(NOW);
      entity.markOutForDelivery(NOW);
      entity.markDelivered(undefined, undefined, NOW);
      expect(() => entity.reschedule('reason', undefined, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('fail', () => {
    it('increments attempts on failure', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      entity.schedule(undefined, undefined, undefined, NOW);
      entity.fail('customer unavailable', NOW);
      expect(entity.isFailed()).toBe(true);
      expect(entity.attempts).toBe(1);
    });
  });

  describe('cancel', () => {
    it('cancels pending delivery', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      entity.cancel(NOW);
      expect(entity.isCancelled()).toBe(true);
    });
  });
});

// ═══════════════ Branch edge cases ═══════════════
describe('DeliveryEntity — branch coverage', () => {
  describe('cancel on terminal', () => {
    it('throws on cancelled delivery', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      entity.cancel(NOW);
      expect(() => entity.cancel(NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('tracking/getters', () => {
    it('trackingNumber undefined when none', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      expect(entity.trackingNumber).toBeUndefined();
    });

    it('estimatedAt undefined by default', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      expect(entity.estimatedAt).toBeUndefined();
    });

    it('deliveredAt undefined by default', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      expect(entity.deliveredAt).toBeUndefined();
    });
  });

  describe('predicates on all statuses', () => {
    it('isPending', () => {
      expect(DeliveryEntity.create(makeCreateParams()).isPending()).toBe(true);
    });

    it('isScheduled after schedule', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      entity.schedule(undefined, undefined, undefined, NOW);
      expect(entity.isScheduled()).toBe(true);
    });

    it('isFailed after fail', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      entity.schedule(undefined, undefined, undefined, NOW);
      entity.fail('customer unavailable', NOW);
      expect(entity.isFailed()).toBe(true);
    });

    it('isCancelled after cancel', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      entity.cancel(NOW);
      expect(entity.isCancelled()).toBe(true);
    });

    it('isOutForDelivery', () => {
      const entity = DeliveryEntity.create(makeCreateParams());
      entity.schedule(undefined, undefined, undefined, NOW);
      entity.pickUp(NOW);
      entity.markInTransit(NOW);
      entity.markOutForDelivery(NOW);
      expect(entity.isOutForDelivery()).toBe(true);
    });
  });
});
