/**
 * GuestCartGuard — Unit Tests
 */
import { describe, it, expect, jest } from '@jest/globals';
import { ForbiddenException } from '@nestjs/common';
import { GuestCartGuard } from '../../../../src/module/interfaces/guards/guest-cart.guard.js';
import { createMockContext, createAuthUser } from '../../../fixtures/interfaces/http-request.fixture.js';

const makeRepo = (guest: unknown) => ({
  findByToken: jest.fn(async () => guest),
});

describe('GuestCartGuard', () => {
  it('should allow authenticated users', async () => {
    const guard = new GuestCartGuard(makeRepo(null) as never);
    const ctx = createMockContext({ user: createAuthUser() });
    expect(await guard.canActivate(ctx)).toBe(true);
  });

  it('should throw when no token', async () => {
    const guard = new GuestCartGuard(makeRepo(null) as never);
    const ctx = createMockContext({ headers: {} });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should throw when token invalid', async () => {
    const guard = new GuestCartGuard(makeRepo(null) as never);
    const ctx = createMockContext({ headers: { 'x-guest-token': 'invalid' } });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should allow valid guest token', async () => {
    const guard = new GuestCartGuard(
      makeRepo({ isActive: () => true, status: { value: 'active' } }) as never,
    );
    const ctx = createMockContext({ headers: { 'x-guest-token': 'valid-token' } });
    expect(await guard.canActivate(ctx)).toBe(true);
  });

  it('should throw when guest cart inactive', async () => {
    const guard = new GuestCartGuard(
      makeRepo({ isActive: () => false, status: { value: 'expired' } }) as never,
    );
    const ctx = createMockContext({ headers: { 'x-guest-token': 'valid' } });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });
});
