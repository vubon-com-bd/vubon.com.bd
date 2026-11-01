/**
 * AuthHttpValidator tests
 */
import { describe, it, expect } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { AuthHttpValidator } from '@interfaces/validators/auth.validator.js';

describe('AuthHttpValidator', () => {
  describe('validateLogin()', () => {
    it('should pass valid login', () => {
      expect(() => AuthHttpValidator.validateLogin({ identifier: 'user@vubon.com.bd', password: 'StrongP@ss123' })).not.toThrow();
    });
    it('should reject empty identifier', () => {
      expect(() => AuthHttpValidator.validateLogin({ identifier: '', password: 'StrongP@ss123' })).toThrow(BadRequestException);
    });
    it('should reject empty password', () => {
      expect(() => AuthHttpValidator.validateLogin({ identifier: 'user@vubon.com.bd', password: '' })).toThrow(BadRequestException);
    });
    it('should include details on failure', () => {
      try {
        AuthHttpValidator.validateLogin({ identifier: '', password: '' });
      } catch (err) {
        const res = (err as BadRequestException).getResponse() as { details: { field: string; message: string }[] };
        expect(res.details.length).toBeGreaterThan(0);
      }
    });
  });
  describe('validateRegister()', () => {
    it('should pass valid register', () => {
      expect(() => AuthHttpValidator.validateRegister({ email: 'new@vubon.com.bd', password: 'StrongP@ss123', confirmPassword: 'StrongP@ss123', acceptTerms: true })).not.toThrow();
    });
    it('should reject password mismatch', () => {
      expect(() => AuthHttpValidator.validateRegister({ email: 'new@vubon.com.bd', password: 'StrongP@ss123', confirmPassword: 'Different@123', acceptTerms: true })).toThrow(BadRequestException);
    });
    it('should reject missing acceptTerms', () => {
      expect(() => AuthHttpValidator.validateRegister({ email: 'new@vubon.com.bd', password: 'StrongP@ss123', confirmPassword: 'StrongP@ss123', acceptTerms: false })).toThrow(BadRequestException);
    });
  });
  describe('validateResetPassword()', () => {
    it('should pass valid reset', () => {
      expect(() => AuthHttpValidator.validateResetPassword({ token: 'abc123', newPassword: 'NewStrongP@ss123', confirmPassword: 'NewStrongP@ss123' })).not.toThrow();
    });
    it('should reject empty token', () => {
      expect(() => AuthHttpValidator.validateResetPassword({ token: '', newPassword: 'NewStrongP@ss123', confirmPassword: 'NewStrongP@ss123' })).toThrow(BadRequestException);
    });
  });
  describe('validateForgotPassword()', () => {
    it('should pass valid forgot-password', () => {
      expect(() => AuthHttpValidator.validateForgotPassword({ identifier: 'user@vubon.com.bd' })).not.toThrow();
    });
    it('should reject empty identifier', () => {
      expect(() => AuthHttpValidator.validateForgotPassword({ identifier: '' })).toThrow(BadRequestException);
    });
  });
  describe('validateRefreshToken()', () => {
    it('should pass valid refresh', () => {
      expect(() => AuthHttpValidator.validateRefreshToken({ refreshToken: 'abc-very-long-token' })).not.toThrow();
    });
    it('should reject empty refresh', () => {
      expect(() => AuthHttpValidator.validateRefreshToken({ refreshToken: '' })).toThrow(BadRequestException);
    });
  });
  describe('validateLogout()', () => {
    it('should pass valid logout', () => {
      expect(() => AuthHttpValidator.validateLogout({})).not.toThrow();
    });
    it('should pass logout with sessionId', () => {
      expect(() => AuthHttpValidator.validateLogout({ sessionId: '11111111-1111-4111-8111-111111111111' })).not.toThrow();
    });
  });
  describe('validateVerifyEmail()', () => {
    it('should pass valid verify', () => {
      expect(() => AuthHttpValidator.validateVerifyEmail({ email: 'user@vubon.com.bd', token: 'abc123' })).not.toThrow();
    });
    it('should reject empty token', () => {
      expect(() => AuthHttpValidator.validateVerifyEmail({ email: 'user@vubon.com.bd', token: '' })).toThrow(BadRequestException);
    });
  });
});
