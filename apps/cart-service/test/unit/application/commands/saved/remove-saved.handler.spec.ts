import { jest } from '@jest/globals';

import { RemoveSavedHandler } from '../../../../../src/module/application/commands/saved/remove-saved.handler.js';
import { RemoveSavedCommand } from '../../../../../src/module/application/commands/saved/remove-saved.command.js';
import type { ISavedForLaterService } from '../../../../../src/module/application/services/interfaces/saved-for-later.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';

function makeService(): jest.Mocked<ISavedForLaterService> {
  return { save: jest.fn(), moveToCart: jest.fn(), remove: jest.fn(), listByUser: jest.fn() };
}

describe('RemoveSavedHandler', () => {
  it('delegates to service.remove', async () => {
    const service = makeService();
    const handler = new RemoveSavedHandler(service);
    service.remove.mockResolvedValue();
    const dto = { savedItemId: UUID, userId: USER };
    await handler.execute(new RemoveSavedCommand(dto));
    expect(service.remove).toHaveBeenCalledWith(dto);
  });
});
