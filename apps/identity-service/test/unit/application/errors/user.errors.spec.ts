import { describe, it, expect } from '@jest/globals';
import { UserNotFoundError, UserOperationFailedError } from '@application/errors/user.errors.js';

describe('UserErrors', () => {
  it('UserNotFoundError httpStatus 404', () => {
    expect(new UserNotFoundError('user-1').httpStatus).toBe(404);
  });
  it('UserNotFoundError message contains id', () => {
    expect(new UserNotFoundError('user-xyz').message).toContain('user-xyz');
  });
  it('UserOperationFailedError httpStatus 500', () => {
    expect(new UserOperationFailedError('create', 'db').httpStatus).toBe(500);
  });
  it('UserOperationFailedError message format', () => {
    expect(new UserOperationFailedError('update', 'timeout').message).toContain('timeout');
  });
});
