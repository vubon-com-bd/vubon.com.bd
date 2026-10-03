import { jest } from '@jest/globals';

import { UserActivityController } from '@interfaces/controllers/rest/user-activity.controller';
import type { QueryBus } from '@nestjs/cqrs';
import { ListActivitiesQuery } from '@application/queries/activity/list-activities.query';
import { GetUserStatsQuery } from '@application/queries/activity/get-user-stats.query';

describe('UserActivityController', () => {
  let controller: UserActivityController;
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    queryBus = { execute: jest.fn() };
    controller = new UserActivityController(queryBus as unknown as QueryBus);
  });

  it('should list activities', async () => {
    queryBus.execute.mockResolvedValue({ items: [], total: 0 });
    await controller.list('user-1', {});
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListActivitiesQuery));
  });

  it('should get user stats', async () => {
    queryBus.execute.mockResolvedValue({ userId: 'user-1', totalActivities: 0 });
    await controller.stats('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetUserStatsQuery));
  });
});
