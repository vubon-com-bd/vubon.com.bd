/**
 * VerifiedGuard tests
 */
import { describe, it, expect } from '@jest/globals';
import { ForbiddenException } from '@nestjs/common';
import { VerifiedGuard } from '@interfaces/guards/verified.guard.js';
import { makeExecutionContext, makeCurrentUser } from '@fixtures/interfaces/index.js';

describe('VerifiedGuard', () => {
  const guard = new VerifiedGuard();

  it('should allow when email+phone verified', () => {
    const ctx = makeExecutionContext({
      user: makeCurrentUser({ emailVerified: true, phoneVerified: true }),
    });
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should throw when email not verified', () => {
    const ctx = makeExecutionContext({
      user: makeCurrentUser({ emailVerified: false, phoneVerified: true }),
    });
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('should throw when phone not verified', () => {
    const ctx = makeExecutionContext({
      user: makeCurrentUser({ emailVerified: true, phoneVerified: false }),
    });
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('should throw when no user', () => {
    const ctx = makeExecutionContext({ user: {} });
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });
});
