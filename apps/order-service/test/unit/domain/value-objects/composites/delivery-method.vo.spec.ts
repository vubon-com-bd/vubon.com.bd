/**
 * DeliveryMethodVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryMethodVO } from '@domain/composites/delivery-method.vo.js';
import { DeliveryMethodTypeVO } from '@domain/primitives/delivery-method-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { fixtureDeliveryMethodId } from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof DeliveryMethodVO.create>[0]> = {}) {
  return {
    id: fixtureDeliveryMethodId,
    name: 'Standard Delivery',
    type: DeliveryMethodTypeVO.create('flat_rate'),
    baseCost: 100,
    currency: 'BDT',
    estimatedDays: 3,
    isActive: true,
    ...overrides,
  };
}

describe('DeliveryMethodVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = DeliveryMethodVO.create(makeProps());
      expect(vo.name).toBe('Standard Delivery');
      expect(vo.baseCost).toBe(100);
      expect(vo.estimatedDays).toBe(3);
    });

    it('creates with carrier', () => {
      const vo = DeliveryMethodVO.create(makeProps({ carrier: 'Pathao' }));
      expect(vo.hasCarrier()).toBe(true);
    });

    it('throws for empty name', () => {
      expect(() => DeliveryMethodVO.create(makeProps({ name: '' }))).toThrow(ValidationError);
    });

    it('throws for negative baseCost', () => {
      expect(() => DeliveryMethodVO.create(makeProps({ baseCost: -1 }))).toThrow(ValidationError);
    });

    it('throws for negative estimatedDays', () => {
      expect(() => DeliveryMethodVO.create(makeProps({ estimatedDays: -1 }))).toThrow(
        ValidationError,
      );
    });
  });

  describe('isFree', () => {
    it('true for 0 baseCost', () => {
      const vo = DeliveryMethodVO.create(makeProps({ baseCost: 0 }));
      expect(vo.isFree()).toBe(true);
    });

    it('false for > 0 baseCost', () => {
      const vo = DeliveryMethodVO.create(makeProps());
      expect(vo.isFree()).toBe(false);
    });
  });

  describe('isFast', () => {
    it('true for estimatedDays <= 2', () => {
      const vo = DeliveryMethodVO.create(makeProps({ estimatedDays: 2 }));
      expect(vo.isFast()).toBe(true);
    });

    it('false for estimatedDays > 2', () => {
      const vo = DeliveryMethodVO.create(makeProps({ estimatedDays: 3 }));
      expect(vo.isFast()).toBe(false);
    });
  });

  describe('hasCarrier', () => {
    it('false when no carrier', () => {
      const vo = DeliveryMethodVO.create(makeProps());
      expect(vo.hasCarrier()).toBe(false);
    });
  });
});
