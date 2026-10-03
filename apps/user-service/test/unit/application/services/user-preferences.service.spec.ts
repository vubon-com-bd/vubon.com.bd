import { jest } from '@jest/globals';

import { UserPreferencesService } from '@application/services/impl/user-preferences.service';
import { GetPreferencesQuery } from '@application/queries/preferences/get-preferences.query';
import { UpdatePreferencesCommand } from '@application/commands/preferences/update-preferences.command';

describe('Application UserPreferencesService', () => {
  let service: UserPreferencesService;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    service = new UserPreferencesService(commandBus as never, queryBus as never);
  });

  it('findByUserId → GetPreferencesQuery', async () => {
    queryBus.execute.mockResolvedValue({ userId: 'user-1' });
    await service.findByUserId('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetPreferencesQuery));
  });

  it('update → dispatches with userId', async () => {
    commandBus.execute.mockResolvedValue({ userId: 'user-1' });
    await service.update('user-1', { newsletter: true });
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(UpdatePreferencesCommand));
  });

  it('reset → dispatches', async () => {
    commandBus.execute.mockResolvedValue({ userId: 'user-1' });
    await service.reset('user-1');
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
