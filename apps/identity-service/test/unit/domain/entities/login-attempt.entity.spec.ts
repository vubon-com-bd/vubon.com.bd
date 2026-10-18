/**
 * LoginAttemptEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { LoginAttemptEntity } from '@domain/entities/login-attempt.entity.js';
import {
  TEST_IDS,
  TEST_EMAIL,
  TEST_IP,
  makeLoginAttemptEntity,
  successAttempt,
  failedAttempt,
  lockedAttempt,
  createNewLoginAttempt,
} from '@fixtures/index';

describe('LoginAttemptEntity', () => {
  describe('create()', () => {
    it('should create with default authId', () => {
      const a = createNewLoginAttempt();
      expect(a.identifier.value.normalized).toBe(TEST_EMAIL.toLowerCase());
      expect(a.status.value).toBe('failed');
      expect(a.authId?.value).toBe(TEST_IDS.AUTH_ID);
    });

    it('should create without authId when null passed', () => {
      const a = createNewLoginAttempt({ authId: null });
      expect(a.authId).toBeUndefined();
    });
  });

  describe('isSuccess() / isFailure()', () => {
    it('successAttempt', () => {
      const a = successAttempt();
      expect(a.isSuccess()).toBe(true);
      expect(a.isFailure()).toBe(false);
    });

    it('failedAttempt', () => {
      const a = failedAttempt();
      expect(a.isSuccess()).toBe(false);
      expect(a.isFailure()).toBe(true);
    });

    it('lockedAttempt', () => {
      const a = lockedAttempt();
      expect(a.isSuccess()).toBe(false);
      expect(a.isFailure()).toBe(true);
      expect(a.status.isLocked()).toBe(true);
    });
  });

  describe('getters', () => {
    it('should expose ipAddress + identifier + userAgent', () => {
      const a = makeLoginAttemptEntity({ status: 'success' });
      expect(a.ipAddress?.value).toBe(TEST_IP);
      expect(a.identifier.isEmail()).toBe(true);
      expect(a.userAgent).toBeDefined();
      expect(a.attemptedAt).toBeDefined();
    });

    it('should expose authId by default', () => {
      const a = makeLoginAttemptEntity({});
      expect(a.authId?.value).toBe(TEST_IDS.AUTH_ID);
    });

    it('should allow missing authId when null passed', () => {
      const a = makeLoginAttemptEntity({ authId: null });
      expect(a.authId).toBeUndefined();
    });

    it('should expose failureReason', () => {
      const a = makeLoginAttemptEntity({ status: 'failed', failureReason: 'invalid_password' });
      expect(a.failureReason).toBe('invalid_password');
    });
  });
});
