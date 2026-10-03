/**
 * OwnProfileGuard Unit Test
 */
import { ForbiddenException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { OwnProfileGuard } from '@interfaces/guards/own-profile.guard';

describe('OwnProfileGuard', () => {
  let guard: OwnProfileGuard;

  beforeEach(() => {
    guard = new OwnProfileGuard();
  });

  const buildContext = (user: unknown, params: Record<string, string> = {}): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ user, params }),
      }),
    }) as unknown as ExecutionContext;

  it('should allow access when user matches param id', () => {
    const ctx = buildContext({ userId: 'user-1' }, { id: 'user-1' });
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should allow access when user matches userId param', () => {
    const ctx = buildContext({ userId: 'user-1' }, { userId: 'user-1' });
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should throw ForbiddenException when different user', () => {
    const ctx = buildContext({ userId: 'user-1' }, { id: 'user-2' });
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('should throw when no authenticated user', () => {
    const ctx = buildContext(null, { id: 'user-1' });
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('should throw when no target id in params', () => {
    const ctx = buildContext({ userId: 'user-1' }, {});
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('should allow admin to access other user profile', () => {
    const ctx = buildContext({ userId: 'admin-1', roles: ['admin'] }, { id: 'user-2' });
    expect(guard.canActivate(ctx)).toBe(true);
  });
});
