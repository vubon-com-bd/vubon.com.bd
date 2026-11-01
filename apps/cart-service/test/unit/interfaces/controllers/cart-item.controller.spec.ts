/**
 * CartItemController — Unit Tests
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { CartItemController } from '../../../../src/module/interfaces/controllers/rest/cart-item.controller.js';
import {
  createMockCommandBus,
  createMockQueryBus,
} from '../../../fixtures/interfaces/command-handler.fixture.js';
import {
  makeAddItemDto,
  makeUpdateItemDto,
  makeSelectItemsDto,
  makeListCartsQuery,
  CART_ID,
  ITEM_ID,
} from '../../../fixtures/interfaces/http-dto.fixture.js';
import { createAuthUser } from '../../../fixtures/interfaces/http-request.fixture.js';

describe('CartItemController', () => {
  let controller: CartItemController;
  let cmdBus: ReturnType<typeof createMockCommandBus>;
  let qryBus: ReturnType<typeof createMockQueryBus>;

  beforeEach(() => {
    cmdBus = createMockCommandBus();
    qryBus = createMockQueryBus({});
    controller = new CartItemController(cmdBus.bus, qryBus.bus);
  });

  it('should dispatch AddItemCommand', async () => {
    await controller.add(
      CART_ID,
      makeAddItemDto(),
      createAuthUser(),
    );
    expect(cmdBus.executed.length).toBe(1);
  });

  it('should dispatch UpdateItemCommand', async () => {
    await controller.update(CART_ID, ITEM_ID, makeUpdateItemDto(), createAuthUser());
    expect(cmdBus.executed.length).toBe(1);
  });

  it('should dispatch UpdateQuantityCommand', async () => {
    await controller.updateQuantity(CART_ID, ITEM_ID, { quantity: 5 }, createAuthUser());
    expect(cmdBus.executed.length).toBe(1);
  });

  it('should dispatch SelectItemCommand', async () => {
    await controller.select(CART_ID, makeSelectItemsDto(), createAuthUser());
    expect(cmdBus.executed.length).toBe(1);
  });

  it('should dispatch ListItemsQuery', async () => {
    await controller.list(CART_ID, makeListCartsQuery() as never);
    expect(qryBus.executed.length).toBe(1);
  });

  it('should dispatch GetItemQuery', async () => {
    await controller.getById(ITEM_ID);
    expect(qryBus.executed.length).toBe(1);
  });
});
