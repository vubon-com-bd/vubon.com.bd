/**
 * DeviceFingerprintVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeviceFingerprintVO } from '@domain/value-objects/primitives/device-fingerprint.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('DeviceFingerprintVO', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const fp = 'abc12345xyz';
      const vo = DeviceFingerprintVO.create(fp);
      expect(vo.value).toBe(fp);
    });

    it('should trim', () => {
      expect(DeviceFingerprintVO.create('  abc12345  ').value).toBe('abc12345');
    });

    it('should throw on empty', () => {
      expect(() => DeviceFingerprintVO.create('')).toThrow(ValidationError);
    });

    it('should throw on too short', () => {
      expect(() => DeviceFingerprintVO.create('abc')).toThrow(ValidationError);
    });

    it('should throw on too long', () => {
      expect(() => DeviceFingerprintVO.create('a'.repeat(300))).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(DeviceFingerprintVO.reconstitute('x').value).toBe('x');
    });
  });
});
