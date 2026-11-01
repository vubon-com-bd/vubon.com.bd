/**
 * AuthControllerMapper tests
 */
import { describe, it, expect } from '@jest/globals';
import { AuthControllerMapper } from '@interfaces/mappers/auth.controller.mapper.js';
import { makeLoginDto, makeRegisterDto } from '@fixtures/interfaces/index.js';

describe('AuthControllerMapper', () => {
  describe('toLoginAppDto()', () => {
    it('should map basic fields', () => {
      const r = AuthControllerMapper.toLoginAppDto(makeLoginDto());
      expect(r.identifier).toBe('test.user@vubon.com.bd');
      expect(r.password).toBe('StrongP@ss123');
      expect(r.rememberMe).toBe(false);
    });
    it('should pass through rememberMe=true', () => {
      const r = AuthControllerMapper.toLoginAppDto(makeLoginDto({ rememberMe: true }));
      expect(r.rememberMe).toBe(true);
    });
    it('should pass deviceId', () => {
      const r = AuthControllerMapper.toLoginAppDto(makeLoginDto({ deviceId: 'fp-xyz' }));
      expect(r.deviceId).toBe('fp-xyz');
    });
    it('should default rememberMe to false when missing', () => {
      const r = AuthControllerMapper.toLoginAppDto({ identifier: 'x@vubon.com.bd', password: 'StrongP@ss123' });
      expect(r.rememberMe).toBe(false);
    });
  });
  describe('toRegisterAppDto()', () => {
    it('should map all fields', () => {
      const r = AuthControllerMapper.toRegisterAppDto(makeRegisterDto());
      expect(r.email).toBe('new.user@vubon.com.bd');
      expect(r.password).toBe('StrongP@ss123');
      expect(r.acceptTerms).toBe(true);
      expect(r.acceptMarketing).toBe(false);
    });
    it('should pass through optional fields', () => {
      const r = AuthControllerMapper.toRegisterAppDto(makeRegisterDto({ firstName: 'John', lastName: 'Doe' }));
      expect(r.firstName).toBe('John');
      expect(r.lastName).toBe('Doe');
    });
  });
  describe('toRefreshAppDto()', () => {
    it('should map refreshToken', () => {
      expect(AuthControllerMapper.toRefreshAppDto({ refreshToken: 'tok-abc' }).refreshToken).toBe('tok-abc');
    });
  });
  describe('toLogoutAppDto()', () => {
    it('should map all logout fields', () => {
      const r = AuthControllerMapper.toLogoutAppDto({ sessionId: '11111111-1111-4111-8111-111111111111', allDevices: true, refreshToken: 'tok' });
      expect(r.sessionId).toBe('11111111-1111-4111-8111-111111111111');
      expect(r.allDevices).toBe(true);
    });
    it('should default allDevices to false', () => {
      expect(AuthControllerMapper.toLogoutAppDto({}).allDevices).toBe(false);
    });
  });
  describe('toForgotPasswordAppDto()', () => {
    it('should map identifier + channel', () => {
      const r = AuthControllerMapper.toForgotPasswordAppDto({ identifier: 'x@vubon.com.bd', channel: 'sms' });
      expect(r.identifier).toBe('x@vubon.com.bd');
      expect(r.channel).toBe('sms');
    });
    it('should default channel to email', () => {
      expect(AuthControllerMapper.toForgotPasswordAppDto({ identifier: 'x@vubon.com.bd' }).channel).toBe('email');
    });
  });
  describe('toResetPasswordAppDto()', () => {
    it('should map reset fields', () => {
      const r = AuthControllerMapper.toResetPasswordAppDto({ token: 'abc', newPassword: 'NewStrongP@ss123', confirmPassword: 'NewStrongP@ss123' });
      expect(r.token).toBe('abc');
    });
  });
  describe('toVerifyEmailAppDto()', () => {
    it('should map verify fields', () => {
      const r = AuthControllerMapper.toVerifyEmailAppDto({ email: 'x@vubon.com.bd', token: 'abc' });
      expect(r.email).toBe('x@vubon.com.bd');
    });
  });
  describe('toResendVerificationAppDto()', () => {
    it('should map resend verification email', () => {
      const r = AuthControllerMapper.toResendVerificationAppDto({ email: 'x@vubon.com.bd' });
      expect(r.email).toBe('x@vubon.com.bd');
    });
  });
  describe('toHttpResponse()', () => {
    it('should pass through app response', () => {
      const app = { success: true, user: { id: 'u1' } };
      expect(AuthControllerMapper.toHttpResponse(app)).toBe(app);
    });
  });
});
