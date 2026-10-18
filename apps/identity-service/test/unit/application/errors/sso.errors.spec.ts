import { describe, it, expect } from '@jest/globals';
import { SsoOperationFailedError } from '@application/errors/sso.errors.js';

describe('SsoErrors', () => {
  it('httpStatus 401', () => {
    expect(new SsoOperationFailedError('saml', 'x').httpStatus).toBe(401);
  });
});
