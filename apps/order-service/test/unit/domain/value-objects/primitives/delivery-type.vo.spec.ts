/**
 * DeliveryTypeVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryTypeVO } from '@domain/primitives/delivery-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('DeliveryTypeVO', () => {
  describe('create', () => {
    it.each(['standard', 'express', 'same_day', 'scheduled', 'pickup', 'digital'])(
      'accepts "%s"',
      (t) => expect(DeliveryTypeVO.create(t).value).toBe(t),
    );
    it('normalizes to lowercase', () => {
      expect(DeliveryTypeVO.create('EXPRESS').value).toBe('express');
    });
    it('trims whitespace', () => {
      expect(DeliveryTypeVO.create('  standard  ').value).toBe('standard');
    });
    it('throws for invalid', () => {
      expect(() => DeliveryTypeVO.create('x')).toThrow(ValidationError);
    });
    it('throws for non-string', () => {
      expect(() => DeliveryTypeVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(DeliveryTypeVO.reconstitute('legacy').value).toBe('legacy');
    });
  });

  describe('isExpress', () => {
    it('true for express and same_day', () => {
      expect(DeliveryTypeVO.create('express').isExpress()).toBe(true);
      expect(DeliveryTypeVO.create('same_day').isExpress()).toBe(true);
    });
    it('false for others', () => {
      expect(DeliveryTypeVO.create('standard').isExpress()).toBe(false);
      expect(DeliveryTypeVO.create('scheduled').isExpress()).toBe(false);
      expect(DeliveryTypeVO.create('pickup').isExpress()).toBe(false);
      expect(DeliveryTypeVO.create('digital').isExpress()).toBe(false);
    });
  });

  describe('isPhysical', () => {
    it('true for physical', () => {
      expect(DeliveryTypeVO.create('standard').isPhysical()).toBe(true);
      expect(DeliveryTypeVO.create('express').isPhysical()).toBe(true);
      expect(DeliveryTypeVO.create('same_day').isPhysical()).toBe(true);
      expect(DeliveryTypeVO.create('scheduled').isPhysical()).toBe(true);
      expect(DeliveryTypeVO.create('pickup').isPhysical()).toBe(true);
    });
    it('false for digital', () => {
      expect(DeliveryTypeVO.create('digital').isPhysical()).toBe(false);
    });
  });
});
