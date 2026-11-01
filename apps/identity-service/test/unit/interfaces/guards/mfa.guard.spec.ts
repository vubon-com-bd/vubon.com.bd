/**
 * MfaGuard tests
 */
import { describe, it, expect } from '@jest/globals';
import { ForbiddenException } from '@nestjs/common';
import { MfaGuard } from '@interfaces/guards/mfa.guard.js';
import { makeExecutionContext, makeCurrentUser } from '@fixtures/interfaces/index.js';

describe('MfaGuard', () => {
  const guard = new MfaGuard();

  it('should allow when mfaVerified=true', () => {
    const ctx = makeExecutionContext({
      user: makeCurrentUser({ mfaVerified: true }),
    });
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should throw when no user', () => {
    const ctx = makeExecutionContext({ user: {} });
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('should throw when mfaVerified=false', () => {
    const ctx = makeExecutionContext({
      user: makeCurrentUser({ mfaVerified: false }),
    });
    expect(() => guard.canActivate(ctx)).toThrow(/MFA verification required/);
  });

  it('should throw when mfaVerified missing', () => {
    const ctx = makeExecutionContext({
      user: makeCurrentUser({ mfaVerified: undefined }),
    });
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });
});
