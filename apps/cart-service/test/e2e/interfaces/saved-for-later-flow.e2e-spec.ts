/**
 * Saved For Later Flow — E2E Tests
 */
import { describe, it, expect, beforeAll } from '@jest/globals';
import { SavedForLaterController } from '../../../src/module/interfaces/controllers/rest/saved-for-later.controller.js';
import {
  createMockCommandBus,
  createMockQueryBus,
} from '../../fixtures/interfaces/command-handler.fixture.js';
import { CART_ID, ITEM_ID } from '../../fixtures/interfaces/http-dto.fixture.js';
import { createAuthUser } from '../../fixtures/interfaces/http-request.fixture.js';

describe('Saved For Later Flow (e2e)', () => {
  let controller: SavedForLaterController;
  let cmdBus: ReturnType<typeof createMockCommandBus>;
  let qryBus: ReturnType<typeof createMockQueryBus>;

  beforeAll(() => {
    cmdBus = createMockCommandBus();
    qryBus = createMockQueryBus();
    controller = new SavedForLaterController(cmdBus.bus, qryBus.bus);
  });

  it('should save item for later', async () => {
    await controller.save({ cartId: CART_ID, itemId: ITEM_ID }, createAuthUser());
    expect(cmdBus.executed.length).toBe(1);
  });

  it('should move saved item to cart', async () => {
    await controller.moveToCart('saved-1', { cartId: CART_ID }, createAuthUser());
    expect(cmdBus.executed.length).toBe(2);
  });

  it('should remove saved item', async () => {
    await controller.remove('saved-1', createAuthUser());
    expect(cmdBus.executed.length).toBe(3);
  });

  it('should list saved items', async () => {
    await controller.list(createAuthUser(), 1, 20);
    expect(qryBus.executed.length).toBe(1);
  });
});
