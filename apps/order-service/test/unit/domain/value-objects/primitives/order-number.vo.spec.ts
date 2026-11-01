/**
 * OrderNumberVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/primitives
 */
import { describe, it, expect } from '@jest/globals';
import { OrderNumberVO } from '@domain/primitives/order-number.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderNumberVO', () => {
  describe('create', () => {
    it('creates VO from valid order number', () => {
      const vo = OrderNumberVO.create('ORD-2024-000123');
      expect(vo.value).toBe('ORD-2024-000123');
    });

    it('uppercases the input', () => {
      const vo = OrderNumberVO.create('ord-2024-000123');
      expect(vo.value).toBe('ORD-2024-000123');
    });

    it('throws ValidationError for empty string', () => {
      expect(() => OrderNumberVO.create('')).toThrow(ValidationError);
    });

    it('throws ValidationError for wrong prefix', () => {
      expect(() => OrderNumberVO.create('ABC-2024-000123')).toThrow(ValidationError);
    });

    it('throws ValidationError for wrong year length', () => {
      expect(() => OrderNumberVO.create('ORD-24-000123')).toThrow(ValidationError);
    });

    it('throws ValidationError for wrong sequence length', () => {
      expect(() => OrderNumberVO.create('ORD-2024-123')).toThrow(ValidationError);
    });
  });

  describe('fromParts', () => {
    it('builds order number from year + sequence', () => {
      const vo = OrderNumberVO.fromParts(2024, 123);
      expect(vo.value).toBe('ORD-2024-000123');
    });

    it('pads sequence with leading zeros', () => {
      const vo = OrderNumberVO.fromParts(2024, 1);
      expect(vo.value).toBe('ORD-2024-000001');
    });

    it('handles large sequence number', () => {
      const vo = OrderNumberVO.fromParts(2024, 999999);
      expect(vo.value).toBe('ORD-2024-999999');
    });
  });

  describe('parse helpers', () => {
    it('extracts year from value', () => {
      const vo = OrderNumberVO.create('ORD-2024-000123');
      expect(vo.year).toBe(2024);
    });

    it('extracts sequence from value', () => {
      const vo = OrderNumberVO.create('ORD-2024-000123');
      expect(vo.sequence).toBe(123);
    });
  });

  describe('equality', () => {
    it('equals same value', () => {
      const a = OrderNumberVO.create('ORD-2024-000123');
      const b = OrderNumberVO.create('ORD-2024-000123');
      expect(a.equals(b)).toBe(true);
    });

    it('does not equal different value', () => {
      const a = OrderNumberVO.create('ORD-2024-000123');
      const b = OrderNumberVO.create('ORD-2024-000124');
      expect(a.equals(b)).toBe(false);
    });
  });
});

// ─── Additional branch coverage ─────────────
describe('OrderNumberVO — branch edge cases', () => {
  it('reconstitute preserves any string', () => {
    const vo = OrderNumberVO.reconstitute('custom-number');
    expect(vo.value).toBe('custom-number');
  });

  it('toString returns value', () => {
    const vo = OrderNumberVO.create('ORD-2024-000123');
    expect(vo.toString()).toBe('ORD-2024-000123');
  });

  it('toJSON returns value', () => {
    const vo = OrderNumberVO.create('ORD-2024-000123');
    expect(vo.toJSON()).toBe('ORD-2024-000123');
  });

  it('year getter for year=2024', () => {
    expect(OrderNumberVO.create('ORD-2024-000123').year).toBe(2024);
  });

  it('sequence getter for sequence=123', () => {
    expect(OrderNumberVO.create('ORD-2024-000123').sequence).toBe(123);
  });

  it('fromParts with year=2000', () => {
    expect(OrderNumberVO.fromParts(2000, 1).value).toBe('ORD-2000-000001');
  });
});
