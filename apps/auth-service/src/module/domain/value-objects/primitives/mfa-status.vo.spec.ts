/**
 * MfaStatusVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { MfaStatusVO } from './mfa-status.vo';
import { MfaInvalidError } from '../../errors/mfa.errors';

describe('MfaStatusVO', () => {
  describe('of()', () => {
    it('should accept all valid statuses', () => {
      ['disabled', 'pending', 'enabled', 'suspended'].forEach((s) => {
        const vo = MfaStatusVO.of(s);
        expect(vo.value).toBe(s);
      });
    });

    it('should reject invalid status', () => {
      expect(() => MfaStatusVO.of('unknown')).toThrow(MfaInvalidError);
      expect(() => MfaStatusVO.of('')).toThrow(MfaInvalidError);
    });
  });

  describe('static factories', () => {
    it('should create disabled', () => {
      const vo = MfaStatusVO.disabled();
      expect(vo.value).toBe('disabled');
    });

    it('should create enabled', () => {
      const vo = MfaStatusVO.enabled();
      expect(vo.value).toBe('enabled');
    });
  });

  describe('isActive()', () => {
    it('should return true only for enabled', () => {
      expect(MfaStatusVO.of('enabled').isActive()).toBe(true);
      ['disabled', 'pending', 'suspended'].forEach((s) => {
        expect(MfaStatusVO.of(s).isActive()).toBe(false);
      });
    });
  });

  describe('requiresVerification()', () => {
    it('should return true for enabled', () => {
      expect(MfaStatusVO.of('enabled').requiresVerification()).toBe(true);
    });

    it('should return true for pending', () => {
      expect(MfaStatusVO.of('pending').requiresVerification()).toBe(true);
    });

    it('should return false for disabled', () => {
      expect(MfaStatusVO.of('disabled').requiresVerification()).toBe(false);
    });

    it('should return false for suspended', () => {
      expect(MfaStatusVO.of('suspended').requiresVerification()).toBe(false);
    });
  });
});
