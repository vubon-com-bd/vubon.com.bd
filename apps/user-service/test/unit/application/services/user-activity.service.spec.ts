import { jest } from '@jest/globals';

import { UserActivityService } from '@application/services/impl/user-activity.service';
import { ListActivitiesQuery } from '@application/queries/activity/list-activities.query';
import { GetUserStatsQuery } from '@application/queries/activity/get-user-stats.query';

describe('Application UserActivityService', () => {
  let service: UserActivityService;
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    queryBus = { execute: jest.fn() };
    service = new UserActivityService(queryBus as never);
  });

  it('list → ListActivitiesQuery', async () => {
    queryBus.execute.mockResolvedValue({ items: [], total: 0 });
    await service.list('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListActivitiesQuery));
  });

  it('getStats → GetUserStatsQuery', async () => {
    queryBus.execute.mockResolvedValue({ userId: 'user-1', totalActivities: 0 });
    await service.getStats('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetUserStatsQuery));
  });
});
