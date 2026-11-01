import { describe, it, expect } from '@jest/globals';
import { PermissionDeniedError } from '@application/errors/permission.errors.js';

describe('PermissionErrors', () => {
  it('httpStatus 403', () => {
    expect(new PermissionDeniedError('auth:login').httpStatus).toBe(403);
  });
  it('message includes permission', () => {
    expect(new PermissionDeniedError('admin:all').message).toContain('admin:all');
  });
  it('context includes userId when given', () => {
    const err = new PermissionDeniedError('x', 'u1');
    expect(err.context?.userId).toBe('u1');
  });
});
