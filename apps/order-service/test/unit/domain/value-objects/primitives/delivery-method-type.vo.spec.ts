/**
 * DeliveryMethodTypeVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryMethodTypeVO } from '@domain/primitives/delivery-method-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('DeliveryMethodTypeVO', () => {
  describe('create', () => {
    it.each(['flat_rate', 'weight_based', 'distance_based', 'free', 'pickup'])(
      'accepts "%s"',
      (t) => expect(DeliveryMethodTypeVO.create(t).value).toBe(t),
    );
    it('normalizes case', () => {
      expect(DeliveryMethodTypeVO.create('FLAT_RATE').value).toBe('flat_rate');
    });
    it('throws for invalid', () => {
      expect(() => DeliveryMethodTypeVO.create('x')).toThrow(ValidationError);
    });
    it('throws for non-string', () => {
      expect(() => DeliveryMethodTypeVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(DeliveryMethodTypeVO.reconstitute('legacy').value).toBe('legacy');
    });
  });

  describe('isFree', () => {
    it('true for free/pickup', () => {
      expect(DeliveryMethodTypeVO.create('free').isFree()).toBe(true);
      expect(DeliveryMethodTypeVO.create('pickup').isFree()).toBe(true);
    });
    it('false for paid types', () => {
      expect(DeliveryMethodTypeVO.create('flat_rate').isFree()).toBe(false);
      expect(DeliveryMethodTypeVO.create('weight_based').isFree()).toBe(false);
      expect(DeliveryMethodTypeVO.create('distance_based').isFree()).toBe(false);
    });
  });
});
