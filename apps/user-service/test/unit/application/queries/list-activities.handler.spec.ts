import { ListActivitiesHandler } from '@application/queries/activity/list-activities.handler';
import { ListActivitiesQuery } from '@application/queries/activity/list-activities.query';
import { UserActivityEntity } from '@domain/entities/user-activity.entity';
import { ActivityIdVO } from '@domain/value-objects/primitives/activity-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '@domain/value-objects/primitives/activity-type.vo';
import { createUserActivityRepositoryMock } from '../../../helpers/user-repository.mock';

describe('ListActivitiesHandler', () => {
  let handler: ListActivitiesHandler;
  let activityRepo: ReturnType<typeof createUserActivityRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    activityRepo = createUserActivityRepositoryMock();
    handler = new ListActivitiesHandler(activityRepo);
  });

  it('should return empty paginated result', async () => {
    activityRepo.findPaginated.mockResolvedValue({ items: [], total: 0 });
    const result = await handler.execute(new ListActivitiesQuery('user-1'));
    expect(result.items.length).toBe(0);
    expect(result.page).toBe(1);
  });

  it('should return paginated items', async () => {
    const act = UserActivityEntity.record({
      activityId: ActivityIdVO.create('a-1'),
      userId: UserIdVO.create('user-1'),
      type: ActivityTypeVO.create('login'),
      now,
    });
    activityRepo.findPaginated.mockResolvedValue({ items: [act], total: 1 });

    const result = await handler.execute(new ListActivitiesQuery('user-1', 1, 20));
    expect(result.items.length).toBe(1);
    expect(result.total).toBe(1);
  });
});
