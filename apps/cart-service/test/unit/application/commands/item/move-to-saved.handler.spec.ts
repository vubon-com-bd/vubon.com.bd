import { jest } from '@jest/globals';

/**
 * MoveToSavedHandler — Unit Tests
 * Uses SavedForLaterService
 */
import { MoveToSavedHandler } from '../../../../../src/module/application/commands/item/move-to-saved.handler.js';
import { MoveToSavedCommand } from '../../../../../src/module/application/commands/item/move-to-saved.command.js';
import type { ISavedForLaterService } from '../../../../../src/module/application/services/interfaces/saved-for-later.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const ITEM_UUID = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';

function makeService(): jest.Mocked<ISavedForLaterService> {
  return {
    save: jest.fn(), moveToCart: jest.fn(), remove: jest.fn(), listByUser: jest.fn(),
  };
}

describe('MoveToSavedHandler', () => {
  it('delegates to savedForLater.save', async () => {
    const service = makeService();
    const handler = new MoveToSavedHandler(service);
    service.save.mockResolvedValue({ id: 'saved-1' } as never);
    const cmd = new MoveToSavedCommand({ cartId: UUID, itemId: ITEM_UUID, userId: USER });
    const r = await handler.execute(cmd);
    expect(service.save).toHaveBeenCalledWith({
      cartId: UUID,
      itemId: ITEM_UUID,
      userId: USER,
    });
    expect(r.id).toBe('saved-1');
  });

  it('propagates errors', async () => {
    const service = makeService();
    const handler = new MoveToSavedHandler(service);
    service.save.mockRejectedValue(new Error('item not found'));
    await expect(
      handler.execute(new MoveToSavedCommand({ cartId: UUID, itemId: ITEM_UUID, userId: USER })),
    ).rejects.toThrow('item not found');
  });
});
