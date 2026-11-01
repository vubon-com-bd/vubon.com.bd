import { describe, it, expect } from '@jest/globals';
import { SessionOperationFailedError } from '@application/errors/session.errors.js';

describe('SessionErrors', () => {
  it('httpStatus 500', () => {
    expect(new SessionOperationFailedError('create', 'x').httpStatus).toBe(500);
  });
  it('message format', () => {
    expect(new SessionOperationFailedError('revoke', 'reason-x').message).toContain('reason-x');
  });
});
