import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetProfilePublicHandler } from '@application/queries/profile/get-profile-public.handler.js';
import { GetProfilePublicQuery } from '@application/queries/profile/get-profile-public.query.js';
import type { UserProfileServiceInterface } from '@application/services/interfaces/user-profile.service.interface.js';

describe('GetProfilePublicHandler', () => {
  let handler: GetProfilePublicHandler;
  let mockService: jest.Mocked<UserProfileServiceInterface>;

  beforeEach(() => {
    mockService = {
      name: 'UserProfileService',
      findForUser: jest.fn(),
      upsert: jest.fn(),
    } as unknown as jest.Mocked<UserProfileServiceInterface>;
    handler = new GetProfilePublicHandler(mockService);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('user.get-profile-public');
  });

  it('should call service.findForUser', async () => {
    mockService.findForUser.mockResolvedValue(null);
    const result = await handler.execute(new GetProfilePublicQuery('u-1'));
    expect(mockService.findForUser).toHaveBeenCalledWith('u-1');
    expect(result).toBeNull();
  });

  it('should accept viewerId', async () => {
    mockService.findForUser.mockResolvedValue(null);
    const query = new GetProfilePublicQuery('u-1', 'viewer-1');
    expect(query.viewerId).toBe('viewer-1');
  });
});
