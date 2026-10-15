/**
 * CartNotEmptyGuard — Unit Tests
 */
import { describe, it, expect, jest } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { CartNotEmptyGuard } from '../../../../src/module/interfaces/guards/cart-not-empty.guard.js';
import { createMockContext, createAuthUser } from '../../../fixtures/interfaces/http-request.fixture.js';

const CART_ID = '11111111-1111-1111-1111-111111111111';

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

describe('CartNotEmptyGuard', () => {
  it('should allow when no cartId', async () => {
    const guard = new CartNotEmptyGuard(makeRepo(null) as never);
    const ctx = createMockContext({ params: {} });
    expect(await guard.canActivate(ctx)).toBe(true);
  });

  it('should throw when cart missing', async () => {
    const guard = new CartNotEmptyGuard(makeRepo(null) as never);
    const ctx = createMockContext({ params: { id: CART_ID } });
    await expect(guard.canActivate(ctx)).rejects.toThrow(BadRequestException);
  });

  it('should throw when cart empty', async () => {
    const guard = new CartNotEmptyGuard(
      makeRepo({ isEmpty: () => true }) as never,
    );
    const ctx = createMockContext({ params: { id: CART_ID } });
    await expect(guard.canActivate(ctx)).rejects.toThrow(BadRequestException);
  });

  it('should allow when cart has items', async () => {
    const guard = new CartNotEmptyGuard(
      makeRepo({ isEmpty: () => false }) as never,
    );
    const ctx = createMockContext({ params: { id: CART_ID } });
    expect(await guard.canActivate(ctx)).toBe(true);
  });
});
