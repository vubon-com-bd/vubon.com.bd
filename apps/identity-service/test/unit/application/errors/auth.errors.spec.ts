import { describe, it, expect } from '@jest/globals';
import { LoginFailedError, RegistrationFailedError } from '@application/errors/auth.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

describe('AuthErrors', () => {
  describe('LoginFailedError', () => {
    it('should be instanceof ApplicationError', () => {
      expect(new LoginFailedError()).toBeInstanceOf(ApplicationError);
    });
    it('httpStatus = 401', () => {
      expect(new LoginFailedError().httpStatus).toBe(401);
    });
    it('message includes reason', () => {
      expect(new LoginFailedError('bad_creds').message).toContain('bad_creds');
    });
  });

  describe('RegistrationFailedError', () => {
    it('httpStatus = 422', () => {
      expect(new RegistrationFailedError('dup email').httpStatus).toBe(422);
    });
  });
});
