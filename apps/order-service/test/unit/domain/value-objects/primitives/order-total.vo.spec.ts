/**
 * OrderTotalVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/primitives
 */
import { describe, it, expect } from '@jest/globals';
import { OrderTotalVO } from '@domain/primitives/order-total.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderTotalVO', () => {
  describe('create', () => {
    it('creates VO with amount + currency', () => {
      const vo = OrderTotalVO.create(1500.5, 'BDT');
      expect(vo.amount).toBe(1500.5);
      expect(vo.currency).toBe('BDT');
    });

    it('rounds to 2 decimals', () => {
      const vo = OrderTotalVO.create(100.999, 'BDT');
      expect(vo.amount).toBe(101);
    });

    it('accepts zero', () => {
      const vo = OrderTotalVO.create(0, 'BDT');
      expect(vo.amount).toBe(0);
    });

    it('throws for negative amount', () => {
      expect(() => OrderTotalVO.create(-1, 'BDT')).toThrow(ValidationError);
      expect(() => OrderTotalVO.create(-1, 'BDT')).toThrow('cannot be negative');
    });

    it('throws for non-finite amount', () => {
      expect(() => OrderTotalVO.create(NaN, 'BDT')).toThrow(ValidationError);
      expect(() => OrderTotalVO.create(Infinity, 'BDT')).toThrow(ValidationError);
    });

    it('throws for invalid currency', () => {
      expect(() => OrderTotalVO.create(100, 'XXX')).toThrow(ValidationError);
    });

    it('throws for amount above max limit', () => {
      expect(() => OrderTotalVO.create(10000001, 'BDT')).toThrow(ValidationError);
    });
  });

  describe('zero factory', () => {
    it('creates zero value', () => {
      const vo = OrderTotalVO.zero('BDT');
      expect(vo.amount).toBe(0);
      expect(vo.currency).toBe('BDT');
    });
  });

  describe('arithmetic', () => {
    it('adds two same-currency VOs', () => {
      const a = OrderTotalVO.create(100, 'BDT');
      const b = OrderTotalVO.create(50, 'BDT');
      expect(a.add(b).amount).toBe(150);
    });

    it('subtracts two same-currency VOs', () => {
      const a = OrderTotalVO.create(100, 'BDT');
      const b = OrderTotalVO.create(30, 'BDT');
      expect(a.subtract(b).amount).toBe(70);
    });

    it('throws on currency mismatch (add)', () => {
      const a = OrderTotalVO.create(100, 'BDT');
      const b = OrderTotalVO.create(50, 'USD');
      expect(() => a.add(b)).toThrow(ValidationError);
    });

    it('throws on currency mismatch (subtract)', () => {
      const a = OrderTotalVO.create(100, 'BDT');
      const b = OrderTotalVO.create(50, 'USD');
      expect(() => a.subtract(b)).toThrow(ValidationError);
    });

    it('subtract resulting in negative throws', () => {
      const a = OrderTotalVO.create(50, 'BDT');
      const b = OrderTotalVO.create(100, 'BDT');
      expect(() => a.subtract(b)).toThrow(ValidationError);
    });
  });

  describe('predicates', () => {
    it('isZero true for zero', () => {
      expect(OrderTotalVO.zero('BDT').isZero()).toBe(true);
      expect(OrderTotalVO.create(1, 'BDT').isZero()).toBe(false);
    });

    it('isPositive true for > 0', () => {
      expect(OrderTotalVO.create(1, 'BDT').isPositive()).toBe(true);
      expect(OrderTotalVO.zero('BDT').isPositive()).toBe(false);
    });
  });

  describe('equality', () => {
    it('equals same amount + currency', () => {
      const a = OrderTotalVO.create(100, 'BDT');
      const b = OrderTotalVO.create(100, 'BDT');
      expect(a.equals(b)).toBe(true);
    });

    it('does not equal different amount', () => {
      const a = OrderTotalVO.create(100, 'BDT');
      const b = OrderTotalVO.create(101, 'BDT');
      expect(a.equals(b)).toBe(false);
    });

    it('does not equal different currency', () => {
      const a = OrderTotalVO.create(100, 'BDT');
      const b = OrderTotalVO.create(100, 'USD');
      expect(a.equals(b)).toBe(false);
    });
  });
});

// ─── Additional branch coverage ─────────────
describe('OrderTotalVO — branch edge cases', () => {
  it('reconstitute preserves object', () => {
    const vo = OrderTotalVO.reconstitute({ amount: 999, currency: 'BDT' });
    expect(vo.amount).toBe(999);
  });

  it('equals method', () => {
    const a = OrderTotalVO.create(100, 'BDT');
    const b = OrderTotalVO.create(100, 'BDT');
    expect(a.equals(b)).toBe(true);
  });

  it('not equals different amount', () => {
    expect(
      OrderTotalVO.create(100, 'BDT').equals(OrderTotalVO.create(50, 'BDT')),
    ).toBe(false);
  });

  it('toString', () => {
    expect(typeof OrderTotalVO.create(100, 'BDT').toString()).toBe('string');
  });
});
