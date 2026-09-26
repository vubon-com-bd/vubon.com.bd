/**
 * DeviceGuard — Unit Tests
 */
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '@nestjs/common';
import { DeviceGuard } from './device.guard';

const buildExecutionContext = (user?: { deviceTrusted?: boolean }): unknown => ({
  switchToHttp: () => ({
    getRequest: () => ({ user }),
  }),
  getHandler: () => ({}),
  getClass: () => ({}),
});

describe('DeviceGuard', () => {
  let guard: DeviceGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new DeviceGuard(reflector);
  });

  it('should return true when @DeviceTrusted not set', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const ctx = buildExecutionContext({ deviceTrusted: false });
    expect(guard.canActivate(ctx as never)).toBe(true);
  });

  it('should throw when required but no user', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    const ctx = buildExecutionContext(undefined);
    expect(() => guard.canActivate(ctx as never)).toThrow(ForbiddenException);
  });

  it('should throw when device not trusted', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    const ctx = buildExecutionContext({ deviceTrusted: false });
    expect(() => guard.canActivate(ctx as never)).toThrow('Trusted device required');
  });

  it('should return true when device trusted', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    const ctx = buildExecutionContext({ deviceTrusted: true });
    expect(guard.canActivate(ctx as never)).toBe(true);
  });
});
