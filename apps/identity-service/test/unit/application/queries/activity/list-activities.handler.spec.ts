import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListActivitiesQueryHandler } from '@application/queries/activity/list-activities.handler.js';
import { ListActivitiesQuery } from '@application/queries/activity/list-activities.query.js';
import type { UserActivityServiceInterface } from '@application/services/interfaces/user-activity.service.interface.js';
import type { UserActivityResponseDTO } from '@application/dtos/responses/user-activity-response.dto.js';

describe('ListActivitiesQueryHandler', () => {
  let handler: ListActivitiesQueryHandler;
  let mockService: jest.Mocked<UserActivityServiceInterface>;

  const activity: UserActivityResponseDTO = {
    id: 'act-1', userId: 'u-1', type: 'login', category: 'auth',
    occurredAt: new Date().toISOString(),
  };

  beforeEach(() => {
    mockService = {
      name: 'UserActivityService',
      log: jest.fn(),
      listForUser: jest.fn(),
    } as unknown as jest.Mocked<UserActivityServiceInterface>;
    handler = new ListActivitiesQueryHandler(mockService);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('user.list-activities');
  });

  it('should call service.listForUser with default limit', async () => {
    mockService.listForUser.mockResolvedValue([activity]);

    const result = await handler.execute(new ListActivitiesQuery('u-1'));

    expect(mockService.listForUser).toHaveBeenCalledWith('u-1', 20);
    expect(result).toEqual([activity]);
  });

  it('should use custom limit', async () => {
    mockService.listForUser.mockResolvedValue([]);
    await handler.execute(new ListActivitiesQuery('u-1', 50));
    expect(mockService.listForUser).toHaveBeenCalledWith('u-1', 50);
  });
});
