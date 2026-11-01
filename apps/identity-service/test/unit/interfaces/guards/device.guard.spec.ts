/**
 * DeviceGuard tests
 */
import { describe, it, expect } from '@jest/globals';
import { ForbiddenException } from '@nestjs/common';
import { DeviceGuard } from '@interfaces/guards/device.guard.js';
import { makeExecutionContext, makeCurrentUser } from '@fixtures/interfaces/index.js';

describe('DeviceGuard', () => {
  const guard = new DeviceGuard();

  it('should allow when deviceTrusted=true', () => {
    const ctx = makeExecutionContext({
      user: makeCurrentUser({ deviceTrusted: true }),
    });
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should throw when no user', () => {
    const ctx = makeExecutionContext({ user: {} });
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('should throw when deviceTrusted=false', () => {
    const ctx = makeExecutionContext({
      user: makeCurrentUser({ deviceTrusted: false }),
    });
    expect(() => guard.canActivate(ctx)).toThrow(/Trusted device required/);
  });
});
