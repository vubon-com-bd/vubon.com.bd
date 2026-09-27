import { jest } from '@jest/globals';

import { UserProfileController } from '@interfaces/controllers/rest/user-profile.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProfileQuery } from '@application/queries/profile/get-profile.query';
import { UpdateBioCommand } from '@application/commands/profile/update-bio.command';

describe('UserProfileController', () => {
  let controller: UserProfileController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new UserProfileController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus
    );
  });

  const profileDto = {
    userId: 'user-1',
    visibility: 'public',
    updatedAt: '2026-01-01T00:00:00.000Z',
  };

  it('should get profile', async () => {
    queryBus.execute.mockResolvedValue(profileDto);
    const result = await controller.get('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetProfileQuery));
    expect(result.userId).toBe('user-1');
  });

  it('should update bio', async () => {
    commandBus.execute.mockResolvedValue(profileDto);
    const result = await controller.updateBio('user-1', { bio: 'Hello' });
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(UpdateBioCommand));
    expect(result.userId).toBe('user-1');
  });
});
