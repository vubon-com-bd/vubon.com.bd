/**
 * Interface Swagger docs — Unit Tests
 * @module auth-service/interfaces/swagger
 *
 * Swagger helpers are `applyDecorators` compositions. These tests
 * verify each helper returns a valid decorator function.
 */
import 'reflect-metadata';
import { AuthSwagger } from './auth.swagger';
import { UserSwagger } from './user.swagger';
import { MfaSwagger } from './mfa.swagger';
import { SessionSwagger } from './session.swagger';

describe('Interface Swagger Docs', () => {
  describe('AuthSwagger', () => {
    it('should have Login decorator', () => {
      expect(typeof AuthSwagger.Login).toBe('function');
      expect(AuthSwagger.Login()).toBeDefined();
    });

    it('should have Register decorator', () => {
      expect(typeof AuthSwagger.Register).toBe('function');
    });

    it('should have Refresh decorator', () => {
      expect(typeof AuthSwagger.Refresh).toBe('function');
    });

    it('should have Logout decorator', () => {
      expect(typeof AuthSwagger.Logout).toBe('function');
    });

    it('should have ForgotPassword decorator', () => {
      expect(typeof AuthSwagger.ForgotPassword).toBe('function');
    });

    it('should have ResetPassword decorator', () => {
      expect(typeof AuthSwagger.ResetPassword).toBe('function');
    });

    it('should have VerifyEmail decorator', () => {
      expect(typeof AuthSwagger.VerifyEmail).toBe('function');
    });
  });

  describe('UserSwagger', () => {
    it('should have Create, Update, Delete, Get, List decorators', () => {
      expect(typeof UserSwagger.Create).toBe('function');
      expect(typeof UserSwagger.Update).toBe('function');
      expect(typeof UserSwagger.Delete).toBe('function');
      expect(typeof UserSwagger.Get).toBe('function');
      expect(typeof UserSwagger.List).toBe('function');
    });

    it('Create decorator should apply without error', () => {
      expect(() => UserSwagger.Create()).not.toThrow();
    });
  });

  describe('MfaSwagger', () => {
    it('should have Enable, Disable, Verify, Status decorators', () => {
      expect(typeof MfaSwagger.Enable).toBe('function');
      expect(typeof MfaSwagger.Disable).toBe('function');
      expect(typeof MfaSwagger.Verify).toBe('function');
      expect(typeof MfaSwagger.Status).toBe('function');
    });
  });

  describe('SessionSwagger', () => {
    it('should have Get, List, Revoke decorators', () => {
      expect(typeof SessionSwagger.Get).toBe('function');
      expect(typeof SessionSwagger.List).toBe('function');
      expect(typeof SessionSwagger.Revoke).toBe('function');
    });
  });
});
