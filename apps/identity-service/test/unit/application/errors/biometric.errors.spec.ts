import { describe, it, expect } from '@jest/globals';
import { BiometricOperationFailedError } from '@application/errors/biometric.errors.js';

describe('BiometricErrors', () => {
  it('httpStatus 401', () => {
    expect(new BiometricOperationFailedError('verify', 'x').httpStatus).toBe(401);
  });
});
