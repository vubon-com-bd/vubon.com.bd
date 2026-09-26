/**
 * VerifiedGuard — Unit Tests
 */
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '@nestjs/common';
import { VerifiedGuard } from './verified.guard';

type User = {
  emailVerified?: boolean;
  phoneVerified?: boolean;
};

const buildExecutionContext = (user?: User): unknown => ({
  switchToHttp: () => ({
    getRequest: () => ({ user }),
  }),
  getHandler: () => ({}),
  getClass: () => ({}),
});

describe('VerifiedGuard', () => {
  let guard: VerifiedGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new VerifiedGuard(reflector);
  });

  it('should return true when channel not set', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const ctx = buildExecutionContext({ emailVerified: false });
    expect(guard.canActivate(ctx as never)).toBe(true);
  });

  it('should throw if no user in request', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue('email');
    const ctx = buildExecutionContext(undefined);
    expect(() => guard.canActivate(ctx as never)).toThrow(ForbiddenException);
  });

  describe('channel = email', () => {
    it('should return true when email verified', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue('email');
      const ctx = buildExecutionContext({ emailVerified: true });
      expect(guard.canActivate(ctx as never)).toBe(true);
    });

    it('should throw when email not verified', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue('email');
      const ctx = buildExecutionContext({ emailVerified: false });
      expect(() => guard.canActivate(ctx as never)).toThrow('Email verification required');
    });
  });

  describe('channel = phone', () => {
    it('should return true when phone verified', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue('phone');
      const ctx = buildExecutionContext({ phoneVerified: true });
      expect(guard.canActivate(ctx as never)).toBe(true);
    });

    it('should throw when phone not verified', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue('phone');
      const ctx = buildExecutionContext({ phoneVerified: false });
      expect(() => guard.canActivate(ctx as never)).toThrow('Phone verification required');
    });
  });

  describe('channel = any', () => {
    it('should pass if email verified', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue('any');
      const ctx = buildExecutionContext({ emailVerified: true, phoneVerified: false });
      expect(guard.canActivate(ctx as never)).toBe(true);
    });

    it('should pass if phone verified', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue('any');
      const ctx = buildExecutionContext({ emailVerified: false, phoneVerified: true });
      expect(guard.canActivate(ctx as never)).toBe(true);
    });

    it('should throw if neither verified', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue('any');
      const ctx = buildExecutionContext({ emailVerified: false, phoneVerified: false });
      expect(() => guard.canActivate(ctx as never)).toThrow('Email or phone verification required');
    });
  });
});
