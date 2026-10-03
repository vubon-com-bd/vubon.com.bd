import { jest } from '@jest/globals';

import { UserPreferencesController } from '@interfaces/controllers/rest/user-preferences.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPreferencesQuery } from '@application/queries/preferences/get-preferences.query';

describe('UserPreferencesController', () => {
  let controller: UserPreferencesController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new UserPreferencesController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus
    );
  });

  it('should get preferences', async () => {
    queryBus.execute.mockResolvedValue({ userId: 'user-1', newsletter: false });
    await controller.get('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetPreferencesQuery));
  });

  it('should update preferences', async () => {
    commandBus.execute.mockResolvedValue({ userId: 'user-1', newsletter: true });
    await controller.update('user-1', { newsletter: true });
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
