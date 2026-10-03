import { jest } from '@jest/globals';

import { PublicProfileController } from '@interfaces/controllers/rest/public-profile.controller';
import type { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from '@application/queries/user/get-user.query';
import { GetPublicProfileQuery } from '@application/queries/profile/get-public-profile.query';

describe('PublicProfileController', () => {
  let controller: PublicProfileController;
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    queryBus = { execute: jest.fn() };
    controller = new PublicProfileController(queryBus as unknown as QueryBus);
  });

  it('should get public user (no auth)', async () => {
    queryBus.execute.mockResolvedValue({
      id: 'user-1',
      email: 'user@example.com',
      status: 'active',
      type: 'individual',
      roles: [],
      emailVerified: true,
      phoneVerified: false,
      isMfaEnabled: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
    const result = await controller.getPublicUser('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetUserQuery));
    expect(result.id).toBe('user-1');
  });

  it('should get public profile', async () => {
    queryBus.execute.mockResolvedValue({
      userId: 'user-1',
      visibility: 'public',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
    const result = await controller.getPublicProfile('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetPublicProfileQuery));
    expect(result.userId).toBe('user-1');
  });
});
