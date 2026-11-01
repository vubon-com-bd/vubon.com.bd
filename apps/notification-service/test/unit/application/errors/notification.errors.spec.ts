import {
  NotificationNotFoundApplicationError,
  NotificationValidationError,
  NotificationSendError,
  NotificationCancelError,
  NotificationResendError,
  NotificationIdempotencyConflictError,
  NotificationQueryError,
} from '@application/errors/notification.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Notification application errors', () => {
  it('all extend ApplicationError', () => {
    expect(new NotificationNotFoundApplicationError('a')).toBeInstanceOf(ApplicationError);
    expect(new NotificationValidationError('x')).toBeInstanceOf(ApplicationError);
    expect(new NotificationSendError('s')).toBeInstanceOf(ApplicationError);
    expect(new NotificationCancelError('n', 'r')).toBeInstanceOf(ApplicationError);
    expect(new NotificationResendError('n', 'r')).toBeInstanceOf(ApplicationError);
    expect(new NotificationIdempotencyConflictError('k', 'e')).toBeInstanceOf(ApplicationError);
    expect(new NotificationQueryError('q')).toBeInstanceOf(ApplicationError);
  });

  it('NotFound 404', () => {
    const e = new NotificationNotFoundApplicationError('abc');
    expect(e.httpStatus).toBe(404);
    expect(e.message).toContain('abc');
  });

  it('Validation 422 with field', () => {
    const e = new NotificationValidationError('bad', 'field1');
    expect(e.httpStatus).toBe(422);
    expect(e.field).toBe('field1');
  });

  it('Send 400', () => {
    expect(new NotificationSendError('fail').httpStatus).toBe(400);
  });

  it('Cancel 400 + message', () => {
    const e = new NotificationCancelError('n1', 'reason');
    expect(e.httpStatus).toBe(400);
    expect(e.message).toContain('n1');
  });

  it('Resend 400', () => {
    expect(new NotificationResendError('n1', 'r').httpStatus).toBe(400);
  });

  it('Idempotency 409 + existing', () => {
    const e = new NotificationIdempotencyConflictError('key', 'existing');
    expect(e.httpStatus).toBe(409);
    expect(e.message).toContain('key');
    expect(e.message).toContain('existing');
  });

  it('Idempotency 409 without existing', () => {
    const e = new NotificationIdempotencyConflictError('key');
    expect(e.httpStatus).toBe(409);
    expect(e.message).not.toContain('→');
  });

  it('Query 400', () => {
    expect(new NotificationQueryError('q').httpStatus).toBe(400);
  });

  it('toJSON returns shape', () => {
    const json = new NotificationSendError('fail').toJSON();
    expect(json.name).toBe('NotificationSendError');
    expect(json.httpStatus).toBe(400);
  });
});
