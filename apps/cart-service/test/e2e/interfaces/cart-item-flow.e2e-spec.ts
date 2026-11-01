/**
 * CartItem Flow — E2E Tests
 */
import { describe, it, expect, beforeAll } from '@jest/globals';
import { CartItemController } from '../../../src/module/interfaces/controllers/rest/cart-item.controller.js';
import {
  createMockCommandBus,
  createMockQueryBus,
} from '../../fixtures/interfaces/command-handler.fixture.js';
import {
  makeAddItemDto,
  makeUpdateItemDto,
  makeSelectItemsDto,
  CART_ID,
  ITEM_ID,
} from '../../fixtures/interfaces/http-dto.fixture.js';
import { createAuthUser } from '../../fixtures/interfaces/http-request.fixture.js';

describe('CartItem Flow (e2e)', () => {
  let controller: CartItemController;
  let cmdBus: ReturnType<typeof createMockCommandBus>;
  let qryBus: ReturnType<typeof createMockQueryBus>;

  beforeAll(() => {
    cmdBus = createMockCommandBus();
    qryBus = createMockQueryBus();
    controller = new CartItemController(cmdBus.bus, qryBus.bus);
  });

  it('should complete add → update → quantity → select → remove flow', async () => {
    // 1. Add
    await controller.add(CART_ID, makeAddItemDto(), createAuthUser());
    expect(cmdBus.executed.length).toBe(1);

    // 2. Update
    await controller.update(CART_ID, ITEM_ID, makeUpdateItemDto(), createAuthUser());
    expect(cmdBus.executed.length).toBe(2);

    // 3. Update quantity
    await controller.updateQuantity(CART_ID, ITEM_ID, { quantity: 5 }, createAuthUser());
    expect(cmdBus.executed.length).toBe(3);

    // 4. Select
    await controller.select(CART_ID, makeSelectItemsDto(), createAuthUser());
    expect(cmdBus.executed.length).toBe(4);

    // 5. Remove
    await controller.remove(CART_ID, ITEM_ID, {}, createAuthUser());
    expect(cmdBus.executed.length).toBe(5);
  });
});
