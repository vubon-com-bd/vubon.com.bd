import { jest } from '@jest/globals';

import { SaveForLaterHandler } from '../../../../../src/module/application/commands/saved/save-for-later.handler.js';
import { SaveForLaterCommand } from '../../../../../src/module/application/commands/saved/save-for-later.command.js';
import type { ISavedForLaterService } from '../../../../../src/module/application/services/interfaces/saved-for-later.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const ITEM = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';

function makeService(): jest.Mocked<ISavedForLaterService> {
  return { save: jest.fn(), moveToCart: jest.fn(), remove: jest.fn(), listByUser: jest.fn() };
}

describe('SaveForLaterHandler', () => {
  it('delegates to service.save', async () => {
    const service = makeService();
    const handler = new SaveForLaterHandler(service);
    service.save.mockResolvedValue({ id: 'saved-1' } as never);
    const dto = { cartId: UUID, itemId: ITEM, userId: USER };
    const r = await handler.execute(new SaveForLaterCommand(dto));
    expect(service.save).toHaveBeenCalledWith(dto);
    expect(r.id).toBe('saved-1');
  });
});
