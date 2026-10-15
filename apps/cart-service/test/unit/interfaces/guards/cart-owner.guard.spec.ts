/**
 * CartOwnerGuard — Unit Tests
 */
import { describe, it, expect, jest } from '@jest/globals';
import { ForbiddenException } from '@nestjs/common';
import { CartOwnerGuard } from '../../../../src/module/interfaces/guards/cart-owner.guard.js';
import { createMockContext, createAuthUser } from '../../../fixtures/interfaces/http-request.fixture.js';

const CART_ID = '11111111-1111-1111-1111-111111111111';
const USER_ID = 'user-11111111-1111-1111-1111-111111111111';

const makeRepo = (cart: unknown) => ({
  findById: jest.fn(async () => cart),
  findByIdVO: jest.fn(async () => cart),
  findAll: jest.fn(async () => []),
  exists: jest.fn(async () => !!cart),
  save: jest.fn(),
  delete: jest.fn(),
  softDelete: jest.fn(),
  restore: jest.fn(),
});

describe('CartOwnerGuard', () => {
  it('should allow when no cartId in params', async () => {
    const guard = new CartOwnerGuard(makeRepo(null) as never);
    const ctx = createMockContext({ params: {}, user: createAuthUser() });
    const ok = await guard.canActivate(ctx);
    expect(ok).toBe(true);
  });

  it('should throw Forbidden when not authenticated', async () => {
    const guard = new CartOwnerGuard(makeRepo(null) as never);
    const ctx = createMockContext({ params: { id: CART_ID } });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should allow admin regardless', async () => {
    const guard = new CartOwnerGuard(makeRepo({ userId: { value: 'other' } }) as never);
    const ctx = createMockContext({
      params: { id: CART_ID },
      user: createAuthUser({ userId: USER_ID, roles: ['admin'] }),
    });
    const ok = await guard.canActivate(ctx);
    expect(ok).toBe(true);
  });

  it('should allow owner', async () => {
    const guard = new CartOwnerGuard(
      makeRepo({ userId: { value: USER_ID } }) as never,
    );
    const ctx = createMockContext({
      params: { id: CART_ID },
      user: createAuthUser({ userId: USER_ID }),
    });
    const ok = await guard.canActivate(ctx);
    expect(ok).toBe(true);
  });

  it('should throw Forbidden when not owner', async () => {
    const guard = new CartOwnerGuard(
      makeRepo({ userId: { value: 'other-user' } }) as never,
    );
    const ctx = createMockContext({
      params: { id: CART_ID },
      user: createAuthUser({ userId: USER_ID }),
    });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });
});
