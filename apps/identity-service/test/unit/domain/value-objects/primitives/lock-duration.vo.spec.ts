/**
 * LockDurationVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { LockDurationVO } from '@domain/value-objects/primitives/lock-duration.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('LockDurationVO', () => {
  describe('fromSeconds()', () => {
    it('should create valid', () => {
      const vo = LockDurationVO.fromSeconds(900);
      expect(vo.seconds).toBe(900);
      expect(vo.minutes).toBe(15);
    });

    it('should throw on too short', () => {
      expect(() => LockDurationVO.fromSeconds(30)).toThrow(ValidationError);
    });

    it('should throw on non-positive', () => {
      expect(() => LockDurationVO.fromSeconds(0)).toThrow(ValidationError);
      expect(() => LockDurationVO.fromSeconds(-1)).toThrow(ValidationError);
    });

    it('should throw on too long', () => {
      expect(() => LockDurationVO.fromSeconds(31 * 24 * 3600)).toThrow(ValidationError);
    });
  });

  describe('fromMinutes()', () => {
    it('should convert to seconds', () => {
      expect(LockDurationVO.fromMinutes(15).seconds).toBe(900);
    });
  });

  describe('fromHours()', () => {
    it('should convert to seconds', () => {
      expect(LockDurationVO.fromHours(1).seconds).toBe(3600);
      expect(LockDurationVO.fromHours(2).hours).toBe(2);
    });
  });

  describe('until()', () => {
    it('should return future date', () => {
      const vo = LockDurationVO.fromSeconds(900);
      const now = Date.now();
      const until = vo.until(now);
      expect(until.getTime()).toBeGreaterThan(now);
      expect(until.getTime() - now).toBe(900_000);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(LockDurationVO.reconstitute({ seconds: 1 }).seconds).toBe(1);
    });
  });
});
