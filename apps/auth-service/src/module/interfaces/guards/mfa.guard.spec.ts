/**
 * MfaGuard — Unit Tests
 * @module auth-service/interfaces/guards
 */
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '@nestjs/common';
import { MfaGuard } from './mfa.guard';

const buildExecutionContext = (user?: { mfaVerified?: boolean }): unknown => ({
  switchToHttp: () => ({
    getRequest: () => ({ user }),
  }),
  getHandler: () => ({}),
  getClass: () => ({}),
});

describe('MfaGuard', () => {
  let guard: MfaGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new MfaGuard(reflector);
  });

  it('should be instantiable', () => {
    expect(guard).toBeInstanceOf(MfaGuard);
  });

  describe('canActivate()', () => {
    it('should return true when @MfaRequired is not set', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
      const ctx = buildExecutionContext({ mfaVerified: false });
      expect(guard.canActivate(ctx as never)).toBe(true);
    });

    it('should throw ForbiddenException when MFA required but not verified', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
      const ctx = buildExecutionContext({ mfaVerified: false });
      expect(() => guard.canActivate(ctx as never)).toThrow(ForbiddenException);
    });

    it('should throw when no user in request', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
      const ctx = buildExecutionContext(undefined);
      expect(() => guard.canActivate(ctx as never)).toThrow(ForbiddenException);
    });

    it('should return true when MFA required AND verified', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
      const ctx = buildExecutionContext({ mfaVerified: true });
      expect(guard.canActivate(ctx as never)).toBe(true);
    });

    it('should include error message', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
      const ctx = buildExecutionContext({ mfaVerified: false });
      expect(() => guard.canActivate(ctx as never)).toThrow('MFA verification required');
    });
  });
});
