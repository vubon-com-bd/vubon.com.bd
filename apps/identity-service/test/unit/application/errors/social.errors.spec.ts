import { describe, it, expect } from '@jest/globals';
import { SocialOperationFailedError } from '@application/errors/social.errors.js';

describe('SocialErrors', () => {
  it('httpStatus 401', () => {
    expect(new SocialOperationFailedError('google', 'fail').httpStatus).toBe(401);
  });
  it('message includes provider', () => {
    expect(new SocialOperationFailedError('facebook', 'x').message).toContain('facebook');
  });
});
