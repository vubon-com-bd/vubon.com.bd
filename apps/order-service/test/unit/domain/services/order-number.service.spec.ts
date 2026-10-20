/**
 * OrderNumberService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderNumberService } from '@domain/services/order-number.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('OrderNumberService', () => {
  describe('generate', () => {
    it('generates valid order number', () => {
      expect(OrderNumberService.generate({ year: 2024, sequence: 123 })).toBe(
        'ORD-2024-000123',
      );
    });

    it('pads sequence to 6 digits', () => {
      expect(OrderNumberService.generate({ year: 2024, sequence: 1 })).toBe(
        'ORD-2024-000001',
      );
    });

    it('handles max sequence', () => {
      expect(OrderNumberService.generate({ year: 2024, sequence: 999999 })).toBe(
        'ORD-2024-999999',
      );
    });

    it('throws for invalid year < 2000', () => {
      expect(() => OrderNumberService.generate({ year: 1999, sequence: 1 })).toThrow(
        BusinessRuleError,
      );
    });

    it('throws for invalid year > 9999', () => {
      expect(() => OrderNumberService.generate({ year: 10000, sequence: 1 })).toThrow(
        BusinessRuleError,
      );
    });

    it('throws for non-integer year', () => {
      expect(() => OrderNumberService.generate({ year: 2024.5, sequence: 1 })).toThrow(
        BusinessRuleError,
      );
    });

    it('throws for zero sequence', () => {
      expect(() => OrderNumberService.generate({ year: 2024, sequence: 0 })).toThrow(
        BusinessRuleError,
      );
    });

    it('throws for negative sequence', () => {
      expect(() => OrderNumberService.generate({ year: 2024, sequence: -1 })).toThrow(
        BusinessRuleError,
      );
    });

    it('throws for sequence overflow', () => {
      expect(() => OrderNumberService.generate({ year: 2024, sequence: 1000000 })).toThrow(
        BusinessRuleError,
      );
    });
  });

  describe('parse', () => {
    it('extracts year and sequence', () => {
      const result = OrderNumberService.parse('ORD-2024-000123');
      expect(result.year).toBe(2024);
      expect(result.sequence).toBe(123);
    });

    it('throws for invalid prefix', () => {
      expect(() => OrderNumberService.parse('ABC-2024-000123')).toThrow(BusinessRuleError);
    });

    it('throws for wrong part count', () => {
      expect(() => OrderNumberService.parse('ORD-2024')).toThrow(BusinessRuleError);
    });

    it('throws for non-string', () => {
      expect(() => OrderNumberService.parse(123 as unknown as string)).toThrow(
        BusinessRuleError,
      );
    });
  });

  describe('nextSequence', () => {
    it('returns 1 for null', () => {
      expect(OrderNumberService.nextSequence(null)).toBe(1);
    });

    it('increments current sequence', () => {
      expect(OrderNumberService.nextSequence('ORD-2024-000123')).toBe(124);
    });
  });
});
