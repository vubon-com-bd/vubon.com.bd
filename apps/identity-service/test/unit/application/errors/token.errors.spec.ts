import { describe, it, expect } from '@jest/globals';
import { TokenOperationFailedError } from '@application/errors/token.errors.js';

describe('TokenErrors', () => {
  it('httpStatus 401', () => {
    expect(new TokenOperationFailedError('issue', 'x').httpStatus).toBe(401);
  });
});
