import { describe, it, expect } from '@jest/globals';
import { MfaValidator } from '@application/validators/mfa.validator.js';

describe('MfaValidator', () => {
  describe('validateVerify()', () => {
    it('accepts valid verify', () => {
      const r = MfaValidator.validateVerify({
        challengeId: '11111111-1111-4111-8111-111111111111',
        code: '123456', method: 'totp',
      });
      expect(r.code).toBe('123456');
    });
    it('throws on non-numeric code', () => {
      expect(() => MfaValidator.validateVerify({
        challengeId: '11111111-1111-4111-8111-111111111111', code: 'abc', method: 'totp',
      })).toThrow();
    });
    it('throws on invalid challengeId', () => {
      expect(() => MfaValidator.validateVerify({
        challengeId: 'not-uuid', code: '123456', method: 'totp',
      })).toThrow();
    });
    it('throws on missing challengeId', () => {
      expect(() => MfaValidator.validateVerify({ code: '123456', method: 'totp' })).toThrow();
    });
  });

  describe('validateVerifySafe()', () => {
    it('success=false on invalid', () => {
      expect(MfaValidator.validateVerifySafe({}).success).toBe(false);
    });
    it('success=true on valid', () => {
      expect(MfaValidator.validateVerifySafe({
        challengeId: '11111111-1111-4111-8111-111111111111', code: '123456', method: 'totp',
      }).success).toBe(true);
    });
  });

  describe('validateEnable()', () => {
    it('accepts valid enable', () => {
      const r = MfaValidator.validateEnable({ method: 'totp', code: '123456' });
      expect(r.method).toBe('totp');
    });
    it('throws on invalid method', () => {
      expect(() => MfaValidator.validateEnable({ method: 'invalid_method', code: '123456' })).toThrow();
    });
    it('throws on missing code', () => {
      expect(() => MfaValidator.validateEnable({ method: 'totp' })).toThrow();
    });
    it('throws on empty object', () => {
      expect(() => MfaValidator.validateEnable({})).toThrow();
    });
  });

  describe('validateEnableSafe()', () => {
    it('success=false on invalid', () => {
      expect(MfaValidator.validateEnableSafe({}).success).toBe(false);
    });
    it('success=true on valid', () => {
      expect(MfaValidator.validateEnableSafe({ method: 'totp', code: '123456' }).success).toBe(true);
    });
  });
});
