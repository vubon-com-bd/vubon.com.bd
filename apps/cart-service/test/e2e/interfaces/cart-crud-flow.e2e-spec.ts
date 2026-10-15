/**
 * Cart CRUD Flow — E2E Tests
 * @module test/e2e/interfaces
 *
 * Simulates full HTTP request/response cycle through controllers.
 */
import { describe, it, expect, beforeAll, jest } from '@jest/globals';
import { CartController } from '../../../src/module/interfaces/controllers/rest/cart.controller.js';
import {
  createMockCommandBus,
  createMockQueryBus,
} from '../../fixtures/interfaces/command-handler.fixture.js';
import {
  makeCreateCartDto,
  CART_ID,
} from '../../fixtures/interfaces/http-dto.fixture.js';
import { createAuthUser } from '../../fixtures/interfaces/http-request.fixture.js';

describe('Cart CRUD Flow (e2e)', () => {
  let controller: CartController;
  let cmdBus: ReturnType<typeof createMockCommandBus>;
  let qryBus: ReturnType<typeof createMockQueryBus>;

  beforeAll(() => {
    cmdBus = createMockCommandBus();
    qryBus = createMockQueryBus();
    controller = new CartController(cmdBus.bus, qryBus.bus);
  });

  it('should complete create → get → update → delete flow', async () => {
    // ─── 1. Create ───
    const createDto = makeCreateCartDto();
    await controller.create(createDto, createAuthUser());
    expect(cmdBus.executed.length).toBe(1);

    // ─── 2. Get by ID ───
    qryBus.mockExecute.mockImplementationOnce(async () => ({
      id: CART_ID,
      type: 'user',
      status: 'active',
      itemCount: 0,
      subtotal: 0,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: 0,
      currency: 'BDT',
      expiresAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    const got = await controller.getById(CART_ID);
    expect(got.id).toBe(CART_ID);

    // ─── 3. Update ───
    await controller.update(CART_ID, { notes: 'Updated' }, createAuthUser());
    expect(cmdBus.executed.length).toBe(2);

    // ─── 4. Clear ───
    await controller.clear(CART_ID, {} as never, createAuthUser());
    expect(cmdBus.executed.length).toBe(3);

    // ─── 5. Delete ───
    await controller.delete(CART_ID, {} as never, createAuthUser());
    expect(cmdBus.executed.length).toBe(4);
  });
});
