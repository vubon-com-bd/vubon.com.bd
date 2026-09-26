/**
 * BiometricGuard — Unit Tests
 */
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '@nestjs/common';
import { BiometricGuard } from './biometric.guard';

const buildExecutionContext = (headers?: Record<string, string>): unknown => ({
  switchToHttp: () => ({
    getRequest: () => ({ headers: headers ?? {} }),
  }),
  getHandler: () => ({}),
  getClass: () => ({}),
});

describe('BiometricGuard', () => {
  let guard: BiometricGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new BiometricGuard(reflector);
  });

  it('should return true when @BiometricRequired not set', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const ctx = buildExecutionContext();
    expect(guard.canActivate(ctx as never)).toBe(true);
  });

  it('should throw when required but header missing', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    const ctx = buildExecutionContext({});
    expect(() => guard.canActivate(ctx as never)).toThrow(ForbiddenException);
  });

  it('should throw when header is not "true"', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    const ctx = buildExecutionContext({ 'x-biometric-verified': 'false' });
    expect(() => guard.canActivate(ctx as never)).toThrow(ForbiddenException);
  });

  it('should return true when header is "true"', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    const ctx = buildExecutionContext({ 'x-biometric-verified': 'true' });
    expect(guard.canActivate(ctx as never)).toBe(true);
  });

  it('should include error message', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    const ctx = buildExecutionContext({});
    expect(() => guard.canActivate(ctx as never)).toThrow('Biometric verification required');
  });
});
