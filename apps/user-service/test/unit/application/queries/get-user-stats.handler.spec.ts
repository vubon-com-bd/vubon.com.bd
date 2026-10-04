import { GetUserStatsHandler } from '@application/queries/activity/get-user-stats.handler';
import { GetUserStatsQuery } from '@application/queries/activity/get-user-stats.query';
import { UserActivityEntity } from '@domain/entities/user-activity.entity';
import { ActivityIdVO } from '@domain/value-objects/primitives/activity-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '@domain/value-objects/primitives/activity-type.vo';
import { createUserActivityRepositoryMock } from '../../../helpers/user-repository.mock';

describe('GetUserStatsHandler', () => {
  let handler: GetUserStatsHandler;
  let activityRepo: ReturnType<typeof createUserActivityRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    activityRepo = createUserActivityRepositoryMock();
    handler = new GetUserStatsHandler(activityRepo);
  });

  it('should return stats with zero activities', async () => {
    activityRepo.countByUserId.mockResolvedValue(0);
    activityRepo.latestByUserId.mockResolvedValue([]);

    const result = await handler.execute(new GetUserStatsQuery('user-1'));
    expect(result.userId).toBe('user-1');
    expect(result.totalActivities).toBe(0);
    expect(result.lastActivityAt).toBeUndefined();
  });

  it('should return latest activity timestamp', async () => {
    const act = UserActivityEntity.record({
      activityId: ActivityIdVO.create('a-1'),
      userId: UserIdVO.create('user-1'),
      type: ActivityTypeVO.create('login'),
      now,
    });
    activityRepo.countByUserId.mockResolvedValue(5);
    activityRepo.latestByUserId.mockResolvedValue([act]);

    const result = await handler.execute(new GetUserStatsQuery('user-1'));
    expect(result.totalActivities).toBe(5);
    expect(result.lastActivityAt).toBeDefined();
  });
});
