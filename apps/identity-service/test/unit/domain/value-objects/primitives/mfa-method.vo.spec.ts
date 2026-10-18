/**
 * MfaMethodVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { MfaMethodVO } from '@domain/value-objects/primitives/mfa-method.vo.js';
import { InvalidMfaMethodError } from '@domain/errors/mfa.errors.js';

describe('MfaMethodVO', () => {
  describe('create()', () => {
    it('should create all valid methods', () => {
      for (const m of ['totp', 'sms', 'email', 'push', 'webauthn', 'backup_code']) {
        expect(MfaMethodVO.create(m).value).toBe(m);
      }
    });

    it('should normalize case', () => {
      expect(MfaMethodVO.create(' TOTP ').value).toBe('totp');
    });

    it('should throw on empty', () => {
      expect(() => MfaMethodVO.create('')).toThrow(InvalidMfaMethodError);
    });

    it('should throw on invalid', () => {
      expect(() => MfaMethodVO.create('xxx')).toThrow(InvalidMfaMethodError);
    });
  });

  describe('static factories', () => {
    it('totp/sms/email/push/webauthn/backupCode', () => {
      expect(MfaMethodVO.totp().value).toBe('totp');
      expect(MfaMethodVO.sms().value).toBe('sms');
      expect(MfaMethodVO.email().value).toBe('email');
      expect(MfaMethodVO.push().value).toBe('push');
      expect(MfaMethodVO.webauthn().value).toBe('webauthn');
      expect(MfaMethodVO.backupCode().value).toBe('backup_code');
    });
  });

  describe('predicates', () => {
    it('isTotp()', () => {
      expect(MfaMethodVO.totp().isTotp()).toBe(true);
      expect(MfaMethodVO.sms().isTotp()).toBe(false);
    });

    it('isSms()', () => {
      expect(MfaMethodVO.sms().isSms()).toBe(true);
      expect(MfaMethodVO.totp().isSms()).toBe(false);
    });

    it('isEmail()', () => {
      expect(MfaMethodVO.email().isEmail()).toBe(true);
      expect(MfaMethodVO.totp().isEmail()).toBe(false);
    });

    it('isPush()', () => {
      expect(MfaMethodVO.push().isPush()).toBe(true);
    });

    it('isWebauthn()', () => {
      expect(MfaMethodVO.webauthn().isWebauthn()).toBe(true);
    });

    it('isBackupCode()', () => {
      expect(MfaMethodVO.backupCode().isBackupCode()).toBe(true);
    });

    it('isPrimary()', () => {
      expect(MfaMethodVO.totp().isPrimary()).toBe(true);
      expect(MfaMethodVO.webauthn().isPrimary()).toBe(true);
      expect(MfaMethodVO.sms().isPrimary()).toBe(false);
      expect(MfaMethodVO.email().isPrimary()).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(MfaMethodVO.reconstitute('anything').value).toBe('anything');
    });
  });
});
