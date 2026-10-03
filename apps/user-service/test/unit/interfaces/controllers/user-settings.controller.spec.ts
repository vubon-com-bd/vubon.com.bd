import { jest } from '@jest/globals';

import { UserSettingsController } from '@interfaces/controllers/rest/user-settings.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetSettingsQuery } from '@application/queries/settings/get-settings.query';

describe('UserSettingsController', () => {
  let controller: UserSettingsController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new UserSettingsController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus
    );
  });

  it('should get settings', async () => {
    const dto = { userId: 'user-1', theme: 'dark' };
    queryBus.execute.mockResolvedValue(dto);
    const result = await controller.get('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetSettingsQuery));
    expect(result).toBe(dto);
  });

  it('should update settings', async () => {
    commandBus.execute.mockResolvedValue({ userId: 'user-1', theme: 'light' });
    await controller.update('user-1', { theme: 'light' });
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
