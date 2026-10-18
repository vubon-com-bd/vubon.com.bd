/**
 * MfaSecretVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { MfaSecretVO } from '@domain/value-objects/primitives/mfa-secret.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_SECRET = 'JBSWY3DPEHPK3PXP';

describe('MfaSecretVO', () => {
  describe('create()', () => {
    it('should create valid base32 secret', () => {
      const vo = MfaSecretVO.create(VALID_SECRET);
      expect(vo.value).toBe(VALID_SECRET);
    });

    it('should normalize case + remove spaces', () => {
      expect(MfaSecretVO.create(' jbswy3dpehpk3pxp ').value).toBe(VALID_SECRET);
    });

    it('should throw on empty', () => {
      expect(() => MfaSecretVO.create('')).toThrow(ValidationError);
    });

    it('should throw on too short', () => {
      expect(() => MfaSecretVO.create('ABC')).toThrow(ValidationError);
    });

    it('should throw on too long', () => {
      expect(() => MfaSecretVO.create('A'.repeat(200))).toThrow(ValidationError);
    });

    it('should throw on invalid base32 chars', () => {
      expect(() => MfaSecretVO.create('INVALID!@#$%^&*()')).toThrow(ValidationError);
    });
  });

  describe('masked', () => {
    it('should mask middle', () => {
      const vo = MfaSecretVO.create(VALID_SECRET);
      const masked = vo.masked;
      expect(masked).toContain('...');
      expect(masked).not.toBe(VALID_SECRET);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(MfaSecretVO.reconstitute('anything').value).toBe('anything');
    });
  });
});
