import { jest } from '@jest/globals';

import { UserProfileService } from '@application/services/impl/user-profile.service';
import { GetProfileQuery } from '@application/queries/profile/get-profile.query';
import { UpdateBioCommand } from '@application/commands/profile/update-bio.command';

describe('Application UserProfileService', () => {
  let service: UserProfileService;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    service = new UserProfileService(commandBus as never, queryBus as never);
  });

  it('findByUserId → GetProfileQuery', async () => {
    queryBus.execute.mockResolvedValue({ userId: 'user-1' });
    await service.findByUserId('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetProfileQuery));
  });

  it('updateBio → UpdateBioCommand', async () => {
    commandBus.execute.mockResolvedValue({ userId: 'user-1' });
    await service.updateBio('user-1', 'Hello');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(UpdateBioCommand));
  });

  it('updateAvatar → dispatches', async () => {
    commandBus.execute.mockResolvedValue({ userId: 'user-1' });
    await service.updateAvatar('user-1', 'https://x.com/a.png');
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('updateVisibility → dispatches', async () => {
    commandBus.execute.mockResolvedValue({ userId: 'user-1' });
    await service.updateVisibility('user-1', 'public');
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
