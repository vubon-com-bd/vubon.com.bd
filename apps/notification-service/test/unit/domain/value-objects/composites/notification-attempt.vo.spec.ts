import { NotificationAttemptVO } from '@domain/composites/notification-attempt.vo.js';
import { DeliveryAttemptVO } from '@domain/primitives/delivery-attempt.vo.js';
import { DeliveryErrorVO } from '@domain/primitives/delivery-error.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DATES } from '@domain-fixtures/dates.fixture.js';

const successAttempt = () =>
  DeliveryAttemptVO.create({
    attemptNumber: 1,
    attemptedAt: DATES.now,
    succeeded: true,
  });

const failedAttempt = () =>
  DeliveryAttemptVO.create({
    attemptNumber: 1,
    attemptedAt: DATES.now,
    succeeded: false,
    errorMessage: 'timeout',
  });

const error = (retryable = true) =>
  DeliveryErrorVO.create({
    reason: 'timeout',
    message: 'timeout',
    retryable,
  });

describe('NotificationAttemptVO', () => {
  describe('create()', () => {
    it('accepts success without error', () => {
      const vo = NotificationAttemptVO.create({ attempt: successAttempt() });
      expect(vo.succeeded).toBe(true);
    });

    it('accepts failure with error', () => {
      const vo = NotificationAttemptVO.create({
        attempt: failedAttempt(),
        error: error(),
      });
      expect(vo.succeeded).toBe(false);
    });

    it('rejects success + error', () => {
      expect(() =>
        NotificationAttemptVO.create({
          attempt: successAttempt(),
          error: error(),
        }),
      ).toThrow(ValidationError);
    });

    it('rejects failure without error', () => {
      expect(() =>
        NotificationAttemptVO.create({ attempt: failedAttempt() }),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = NotificationAttemptVO.reconstitute({ attempt: successAttempt() });
      expect(vo.succeeded).toBe(true);
    });
  });

  describe('getters', () => {
    it('exposes attempt + error', () => {
      const vo = NotificationAttemptVO.create({
        attempt: failedAttempt(),
        error: error(),
      });
      expect(vo.attempt).toBeDefined();
      expect(vo.error).toBeDefined();
    });

    it('isRetryable when error retryable', () => {
      const vo = NotificationAttemptVO.create({
        attempt: failedAttempt(),
        error: error(true),
      });
      expect(vo.isRetryable).toBe(true);
    });

    it('isRetryable false when error not retryable', () => {
      const vo = NotificationAttemptVO.create({
        attempt: failedAttempt(),
        error: error(false),
      });
      expect(vo.isRetryable).toBe(false);
    });

    it('isRetryable false when no error', () => {
      const vo = NotificationAttemptVO.create({ attempt: successAttempt() });
      expect(vo.isRetryable).toBe(false);
    });
  });
});
