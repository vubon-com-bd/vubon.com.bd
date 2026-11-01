/**
 * DeliveryMethodEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryMethodEntity } from '@domain/entities/delivery-method.entity.js';
import { DeliveryMethodVO } from '@domain/composites/delivery-method.vo.js';
import { DeliveryMethodTypeVO } from '@domain/primitives/delivery-method-type.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { fixtureDeliveryMethodId } from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeVO(overrides: Partial<Parameters<typeof DeliveryMethodVO.create>[0]> = {}) {
  return DeliveryMethodVO.create({
    id: fixtureDeliveryMethodId,
    name: 'Standard Delivery',
    type: DeliveryMethodTypeVO.create('flat_rate'),
    baseCost: 100,
    currency: 'BDT',
    estimatedDays: 3,
    isActive: true,
    ...overrides,
  });
}

function makeCreateParams(overrides: Partial<Parameters<typeof DeliveryMethodEntity.create>[0]> = {}) {
  return {
    id: fixtureDeliveryMethodId.value,
    vo: makeVO(),
    now: NOW,
    ...overrides,
  };
}

describe('DeliveryMethodEntity', () => {
  describe('create', () => {
    it('creates active method', () => {
      const entity = DeliveryMethodEntity.create(makeCreateParams());
      expect(entity.isActive).toBe(true);
      expect(entity.baseCost).toBe(100);
    });
  });

  describe('reconstitute', () => {
    it('rehydrates existing method', () => {
      const entity = DeliveryMethodEntity.reconstitute({
        id: fixtureDeliveryMethodId.value,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.id).toBe(fixtureDeliveryMethodId.value);
    });
  });

  describe('activate/deactivate', () => {
    it('deactivates active method', () => {
      const entity = DeliveryMethodEntity.create(makeCreateParams());
      entity.deactivate(NOW);
      expect(entity.isActive).toBe(false);
    });

    it('activate no-op for already active', () => {
      const entity = DeliveryMethodEntity.create(makeCreateParams());
      const beforeVersion = entity.version;
      entity.activate(NOW);
      expect(entity.version).toBe(beforeVersion);
    });

    it('activates inactive method', () => {
      const entity = DeliveryMethodEntity.create(
        makeCreateParams({ vo: makeVO({ isActive: false }) }),
      );
      entity.activate(NOW);
      expect(entity.isActive).toBe(true);
    });
  });

  describe('updateBaseCost', () => {
    it('updates cost', () => {
      const entity = DeliveryMethodEntity.create(makeCreateParams());
      entity.updateBaseCost(200, NOW);
      expect(entity.baseCost).toBe(200);
    });

    it('throws for negative cost', () => {
      const entity = DeliveryMethodEntity.create(makeCreateParams());
      expect(() => entity.updateBaseCost(-1, NOW)).toThrow(BusinessRuleError);
    });

    it('throws for non-finite cost', () => {
      const entity = DeliveryMethodEntity.create(makeCreateParams());
      expect(() => entity.updateBaseCost(NaN, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('predicates', () => {
    it('isFree', () => {
      const entity = DeliveryMethodEntity.create(
        makeCreateParams({ vo: makeVO({ baseCost: 0 }) }),
      );
      expect(entity.isFree()).toBe(true);
    });

    it('isFast for estimatedDays <= 2', () => {
      const entity = DeliveryMethodEntity.create(
        makeCreateParams({ vo: makeVO({ estimatedDays: 2 }) }),
      );
      expect(entity.isFast()).toBe(true);
    });
  });
});

// ═══════════════ Branch edge cases ═══════════════
describe('DeliveryMethodEntity — branch coverage', () => {
  it('updateBaseCost with 0', () => {
    const entity = DeliveryMethodEntity.create(makeCreateParams());
    entity.updateBaseCost(0, NOW);
    expect(entity.baseCost).toBe(0);
    expect(entity.isFree()).toBe(true);
  });

  it('getters', () => {
    const entity = DeliveryMethodEntity.create(makeCreateParams());
    expect(entity.currency).toBe('BDT');
    expect(entity.estimatedDays).toBe(3);
  });

  it('isFast false for slow', () => {
    const entity = DeliveryMethodEntity.create(
      makeCreateParams({ vo: makeVO({ estimatedDays: 5 }) }),
    );
    expect(entity.isFast()).toBe(false);
  });

  it('vo getter returns VO', () => {
    const entity = DeliveryMethodEntity.create(makeCreateParams());
    expect(entity.vo).toBeDefined();
  });
});
