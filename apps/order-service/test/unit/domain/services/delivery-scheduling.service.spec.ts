/**
 * DeliverySchedulingService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeliverySchedulingService } from '@domain/services/delivery-scheduling.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('DeliverySchedulingService', () => {
  describe('estimate', () => {
    it('computes delivery window', () => {
      const result = DeliverySchedulingService.estimate({
        baseDays: 3,
        shipAt: '2024-01-01T10:00:00.000Z',
      });
      expect(result.from).toBeDefined();
      expect(result.to).toBeDefined();
      expect(result.estimatedDays).toBe(5); // baseDays + 2
    });

    it('accepts holidays', () => {
      const result = DeliverySchedulingService.estimate({
        baseDays: 2,
        shipAt: '2024-01-01T10:00:00.000Z',
        holidays: ['2024-01-03'],
      });
      expect(result.estimatedDays).toBe(4);
    });

    it('accepts weekendSkip', () => {
      const result = DeliverySchedulingService.estimate({
        baseDays: 3,
        shipAt: '2024-01-05T10:00:00.000Z', // Friday
        weekendSkip: true,
      });
      expect(result.estimatedDays).toBe(5);
    });

    it('throws for negative baseDays', () => {
      expect(() =>
        DeliverySchedulingService.estimate({
          baseDays: -1,
          shipAt: '2024-01-01T10:00:00.000Z',
        }),
      ).toThrow(BusinessRuleError);
    });

    it('throws for empty shipAt', () => {
      expect(() =>
        DeliverySchedulingService.estimate({ baseDays: 3, shipAt: '' }),
      ).toThrow(BusinessRuleError);
    });

    it('throws for invalid shipAt date', () => {
      expect(() =>
        DeliverySchedulingService.estimate({
          baseDays: 3,
          shipAt: 'not-a-date',
        }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('overlaps', () => {
    it('returns true for overlapping windows', () => {
      const a = {
        from: '2024-01-01T00:00:00.000Z',
        to: '2024-01-05T00:00:00.000Z',
        estimatedDays: 4,
      };
      const b = {
        from: '2024-01-03T00:00:00.000Z',
        to: '2024-01-07T00:00:00.000Z',
        estimatedDays: 4,
      };
      expect(DeliverySchedulingService.overlaps(a, b)).toBe(true);
    });

    it('returns false for non-overlapping windows', () => {
      const a = {
        from: '2024-01-01T00:00:00.000Z',
        to: '2024-01-03T00:00:00.000Z',
        estimatedDays: 2,
      };
      const b = {
        from: '2024-01-05T00:00:00.000Z',
        to: '2024-01-07T00:00:00.000Z',
        estimatedDays: 2,
      };
      expect(DeliverySchedulingService.overlaps(a, b)).toBe(false);
    });
  });
});
