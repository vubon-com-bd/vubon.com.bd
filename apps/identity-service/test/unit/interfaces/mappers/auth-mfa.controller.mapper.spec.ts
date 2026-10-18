import { describe, it, expect } from '@jest/globals';
import { AuthMfaControllerMapper } from '@interfaces/mappers/auth-mfa.controller.mapper.js';

describe('AuthMfaControllerMapper', () => {
  describe('toSetupHttpResponse()', () => {
    it('should map setup response', () => {
      const r = AuthMfaControllerMapper.toSetupHttpResponse({ secret: 'ABC123', qrCodeUrl: 'data:image/png', otpauthUrl: 'otpauth://', backupCodes: ['ABCD1234', 'EFGH5678'] });
      expect(r.success).toBe(true);
      expect(r.method).toBe('totp');
      expect(r.secret).toBe('ABC123');
      expect(r.backupCodes.length).toBe(2);
    });
  });
  describe('toVerifyHttpResponse()', () => {
    it('should map verify response with defaults', () => {
      const r = AuthMfaControllerMapper.toVerifyHttpResponse({ verified: true });
      expect(r.success).toBe(true);
      expect(r.method).toBe('totp');
      expect(r.remainingBackupCodes).toBe(0);
    });
    it('should pass provided method + remaining', () => {
      const r = AuthMfaControllerMapper.toVerifyHttpResponse({ verified: true, method: 'sms', remainingBackupCodes: 8 });
      expect(r.method).toBe('sms');
      expect(r.remainingBackupCodes).toBe(8);
    });
  });
  describe('toDisableHttpResponse()', () => {
    it('should produce disabled response', () => {
      const r = AuthMfaControllerMapper.toDisableHttpResponse();
      expect(r.success).toBe(true);
      expect(r.enabled).toBe(false);
    });
  });
  describe('toChallengeHttpResponse()', () => {
    it('should map challenge response', () => {
      const r = AuthMfaControllerMapper.toChallengeHttpResponse({ challengeId: 'c1', mfaMethods: ['totp'], expiresAt: '2026-01-01T00:05:00Z' });
      expect(r.success).toBe(true);
      expect(r.mfaMethods).toEqual(['totp']);
    });
  });
  describe('request dto helpers', () => {
    it('toEnableAppDto', () => {
      expect(AuthMfaControllerMapper.toEnableAppDto({ method: 'totp', code: '123456' })).toEqual({ method: 'totp', code: '123456' });
    });
    it('toDisableAppDto', () => {
      expect(AuthMfaControllerMapper.toDisableAppDto({ password: 'Pass123!', code: '123456' })).toEqual({ password: 'Pass123!', code: '123456' });
    });
    it('toSetupAppDto', () => {
      expect(AuthMfaControllerMapper.toSetupAppDto({ method: 'webauthn' })).toEqual({ method: 'webauthn' });
    });
  });
});
