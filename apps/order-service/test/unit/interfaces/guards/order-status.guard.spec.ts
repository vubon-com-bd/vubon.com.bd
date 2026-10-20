/**
 * OrderStatusGuard Tests
 * @module order-service/test/unit/interfaces/guards
 */
import { jest } from '@jest/globals';
import { ForbiddenException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  OrderStatusGuard,
  ORDER_STATUS_META_KEY,
} from '@interfaces/guards/order-status.guard.js';

function buildContext(req: { params?: Record<string, string> }): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => req }),
    getHandler: () => jest.fn(),
    getClass: () => jest.fn(),
  } as unknown as ExecutionContext;
}

describe('OrderStatusGuard', () => {
  const mockRepo = { findById: jest.fn() } as never;
  let guard: OrderStatusGuard;
  let reflector: Reflector;

  beforeEach(() => {
    jest.clearAllMocks();
    reflector = new Reflector();
    guard = new OrderStatusGuard(mockRepo, reflector);
  });

  it('should allow if no metadata set', async () => {
    expect(await guard.canActivate(buildContext({ params: { orderId: 'o-1' } }))).toBe(true);
  });

  it('should allow if no orderId', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['pending']);
    expect(await guard.canActivate(buildContext({ params: {} }))).toBe(true);
  });

  it('should throw if order not found', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['pending']);
    (mockRepo as unknown as { findById: jest.Mock }).findById.mockResolvedValue(null);
    await expect(
      guard.canActivate(buildContext({ params: { orderId: 'o-1' } })),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should throw if status not allowed', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['delivered']);
    (mockRepo as unknown as { findById: jest.Mock }).findById.mockResolvedValue({
      status: { value: 'pending' },
    });
    await expect(
      guard.canActivate(buildContext({ params: { orderId: 'o-1' } })),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should allow if status matches', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['pending']);
    (mockRepo as unknown as { findById: jest.Mock }).findById.mockResolvedValue({
      status: { value: 'pending' },
    });
    expect(await guard.canActivate(buildContext({ params: { orderId: 'o-1' } }))).toBe(true);
  });

  it('should export ORDER_STATUS_META_KEY', () => {
    expect(ORDER_STATUS_META_KEY).toBe('order_status_allowed');
  });
});
