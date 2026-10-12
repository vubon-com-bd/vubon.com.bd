/**
 * TrackingNumberService — generation + uniqueness + validation
 */
import { describe, it, expect } from '@jest/globals';
import { TrackingNumberService } from '@domain/services/tracking-number.service.js';
import { SHIPMENT } from '@vubon/shared-constants/logistics';

describe('TrackingNumberService', () => {
  describe('generate()', () => {
    it('produces a TrackingNumberVO with SH prefix by default', () => {
      const tn = TrackingNumberService.generate();
      expect(tn.value).toMatch(new RegExp(`^${SHIPMENT.TRACKING_NUMBER_PREFIX}`));
    });
    it('honours custom prefix', () => {
      const tn = TrackingNumberService.generate('XX');
      expect(tn.value.startsWith('XX')).toBe(true);
    });
    it('produces unique values', () => {
      const a = TrackingNumberService.generate().value;
      const b = TrackingNumberService.generate().value;
      expect(a).not.toBe(b);
    });
  });

  describe('isValid()', () => {
    it('accepts a generated number', () => {
      const tn = TrackingNumberService.generate().value;
      expect(TrackingNumberService.isValid(tn)).toBe(true);
    });
    it('rejects empty string', () => {
      expect(TrackingNumberService.isValid('')).toBe(false);
    });
    it('rejects too-short string', () => {
      expect(TrackingNumberService.isValid('SH1')).toBe(false);
    });
  });

  describe('format()', () => {
    it('groups by 4 chars by default', () => {
      const formatted = TrackingNumberService.format('SH12345678901234');
      expect(formatted).toBe('SH12-3456-7890-1234');
    });
    it('respects custom groupBy', () => {
      const formatted = TrackingNumberService.format('SH12345678', 3);
      expect(formatted).toBe('SH1-234-567-8');
    });
  });

  describe('generateUnique()', () => {
    it('returns first candidate when not taken', async () => {
      const tn = await TrackingNumberService.generateUnique(async () => false);
      expect(tn.value.length).toBeGreaterThan(0);
    });
    it('retries when taken, eventually succeeds', async () => {
      let attempts = 0;
      const tn = await TrackingNumberService.generateUnique(async () => {
        attempts++;
        return attempts < 3; // taken on first 2 attempts
      });
      expect(attempts).toBe(3);
      expect(tn.value.length).toBeGreaterThan(0);
    });
    it('throws after max attempts exhausted', async () => {
      await expect(
        TrackingNumberService.generateUnique(async () => true, 3),
      ).rejects.toThrow(/Failed to generate unique tracking number/);
    });
  });
});
