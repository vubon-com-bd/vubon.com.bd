/**
 * OrderTaxVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/primitives
 */
import { describe, it, expect } from '@jest/globals';
import { OrderTaxVO } from '@domain/primitives/order-tax.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderTaxVO', () => {
  describe('create', () => {
    it('creates with amount + currency', () => {
      const vo = OrderTaxVO.create(15, 'BDT');
      expect(vo.amount).toBe(15);
      expect(vo.currency).toBe('BDT');
    });

    it('creates with optional rate', () => {
      const vo = OrderTaxVO.create(15, 'BDT', 0.15);
      expect(vo.rate).toBe(0.15);
    });

    it('throws for negative amount', () => {
      expect(() => OrderTaxVO.create(-5, 'BDT')).toThrow(ValidationError);
    });

    it('throws for rate < 0', () => {
      expect(() => OrderTaxVO.create(15, 'BDT', -0.1)).toThrow(ValidationError);
    });

    it('throws for rate > 1', () => {
      expect(() => OrderTaxVO.create(15, 'BDT', 1.5)).toThrow(ValidationError);
    });

    it('throws for invalid currency', () => {
      expect(() => OrderTaxVO.create(15, 'XYZ')).toThrow(ValidationError);
    });
  });

  describe('none factory', () => {
    it('creates zero tax', () => {
      const vo = OrderTaxVO.none('BDT');
      expect(vo.amount).toBe(0);
      expect(vo.hasTax()).toBe(false);
    });
  });

  describe('hasTax', () => {
    it('true for > 0', () => {
      expect(OrderTaxVO.create(10, 'BDT').hasTax()).toBe(true);
    });

    it('false for 0', () => {
      expect(OrderTaxVO.none('BDT').hasTax()).toBe(false);
    });
  });
});
