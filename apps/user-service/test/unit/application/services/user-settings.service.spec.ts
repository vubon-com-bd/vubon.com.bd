import { jest } from '@jest/globals';

import { UserSettingsService } from '@application/services/impl/user-settings.service';
import { GetSettingsQuery } from '@application/queries/settings/get-settings.query';
import { UpdateSettingsCommand } from '@application/commands/settings/update-settings.command';

describe('Application UserSettingsService', () => {
  let service: UserSettingsService;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    service = new UserSettingsService(commandBus as never, queryBus as never);
  });

  it('findByUserId → GetSettingsQuery', async () => {
    queryBus.execute.mockResolvedValue({ userId: 'user-1' });
    await service.findByUserId('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetSettingsQuery));
  });

  it('update → UpdateSettingsCommand with userId', async () => {
    commandBus.execute.mockResolvedValue({ userId: 'user-1' });
    await service.update('user-1', { theme: 'dark' });
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(UpdateSettingsCommand));
  });

  it('reset → dispatches', async () => {
    commandBus.execute.mockResolvedValue({ userId: 'user-1' });
    await service.reset('user-1');
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
