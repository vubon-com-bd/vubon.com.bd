import { describe, it, expect } from '@jest/globals';
import { MfaOperationFailedError } from '@application/errors/mfa.errors.js';

describe('MfaErrors', () => {
  it('httpStatus 401', () => {
    expect(new MfaOperationFailedError('verify', 'bad code').httpStatus).toBe(401);
  });
});
