/**
 * BiometricGuard tests
 */
import { describe, it, expect } from '@jest/globals';
import { ForbiddenException } from '@nestjs/common';
import { BiometricGuard } from '@interfaces/guards/biometric.guard.js';
import { makeExecutionContext, makeCurrentUser } from '@fixtures/interfaces/index.js';

describe('BiometricGuard', () => {
  const guard = new BiometricGuard();

  it('should allow when biometricVerified=true', () => {
    const ctx = makeExecutionContext({
      user: makeCurrentUser({ biometricVerified: true }),
    });
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should throw when no user', () => {
    const ctx = makeExecutionContext({ user: {} });
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('should throw when biometricVerified=false', () => {
    const ctx = makeExecutionContext({
      user: makeCurrentUser({ biometricVerified: false }),
    });
    expect(() => guard.canActivate(ctx)).toThrow(/Biometric verification/);
  });
});
