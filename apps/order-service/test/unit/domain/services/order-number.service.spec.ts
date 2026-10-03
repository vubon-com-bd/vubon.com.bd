import { OrderNumberService } from '../../../../src/module/domain/services/order-number.service.js';
import { OrderNumberVO } from '../../../../src/module/domain/value-objects/primitives/order-number.vo.js';

describe('OrderNumberService', () => {
  describe('generate()', () => {
    it('generates ORD-YYYY-NNNNNN format', () => {
      const vo = OrderNumberService.generate(1, 2026);
      expect(vo.value).toBe('ORD-2026-000001');
    });

    it('pads sequence to 6 digits', () => {
      expect(OrderNumberService.generate(1, 2026).value).toBe('ORD-2026-000001');
      expect(OrderNumberService.generate(123, 2026).value).toBe('ORD-2026-000123');
      expect(OrderNumberService.generate(999999, 2026).value).toBe('ORD-2026-999999');
    });

    it('uses current year when not provided', () => {
      const vo = OrderNumberService.generate(5);
      expect(vo.year).toBe(new Date().getFullYear());
    });

    it('throws on invalid sequence (0 / negative)', () => {
      expect(() => OrderNumberService.generate(0)).toThrow();
      expect(() => OrderNumberService.generate(-5)).toThrow();
    });

    it('throws on non-integer sequence', () => {
      expect(() => OrderNumberService.generate(1.5)).toThrow();
    });

    it('throws when sequence exceeds max (7 digits)', () => {
      expect(() => OrderNumberService.generate(1000000)).toThrow();
    });
  });

  describe('isValidFormat()', () => {
    it('accepts ORD-YYYY-NNNNNN', () => {
      expect(OrderNumberService.isValidFormat('ORD-2026-000001')).toBe(true);
      expect(OrderNumberService.isValidFormat('ORD-2030-999999')).toBe(true);
    });

    it('rejects invalid formats', () => {
      expect(OrderNumberService.isValidFormat('ORD-2026-1')).toBe(false);
      expect(OrderNumberService.isValidFormat('ord-2026-000001')).toBe(false);
      expect(OrderNumberService.isValidFormat('ABC-2026-000001')).toBe(false);
      expect(OrderNumberService.isValidFormat('')).toBe(false);
    });
  });

  describe('extractYear() / extractSequence()', () => {
    it('extracts year', () => {
      const vo = OrderNumberVO.create('ORD-2026-000123');
      expect(OrderNumberService.extractYear(vo)).toBe(2026);
    });

    it('extracts sequence', () => {
      const vo = OrderNumberVO.create('ORD-2026-000123');
      expect(OrderNumberService.extractSequence(vo)).toBe(123);
    });
  });

  describe('isSameYear()', () => {
    it('true for same year', () => {
      const a = OrderNumberVO.create('ORD-2026-000001');
      const b = OrderNumberVO.create('ORD-2026-000999');
      expect(OrderNumberService.isSameYear(a, b)).toBe(true);
    });

    it('false for different years', () => {
      const a = OrderNumberVO.create('ORD-2026-000001');
      const b = OrderNumberVO.create('ORD-2027-000001');
      expect(OrderNumberService.isSameYear(a, b)).toBe(false);
    });
  });

  describe('nextSequence()', () => {
    it('increments', () => {
      expect(OrderNumberService.nextSequence(0)).toBe(1);
      expect(OrderNumberService.nextSequence(5)).toBe(6);
      expect(OrderNumberService.nextSequence(999)).toBe(1000);
    });
  });
});
