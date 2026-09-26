/**
 * ListUserActivitiesHandler — Unit Tests
 */
import { ListUserActivitiesHandler } from './list-user-activities.handler';
import { ListUserActivitiesQuery } from './list-user-activities.query';
import { UserActivityEntity } from '../../../domain/entities/user-activity.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildActivity = (id: string) =>
  UserActivityEntity.create({
    id,
    userId: 'user-1' as never,
    type: 'login',
    ipAddress: '192.168.1.1',
    userAgent: 'agent',
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findByUserId: jest.fn() });

describe('ListUserActivitiesHandler', () => {
  let handler: ListUserActivitiesHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new ListUserActivitiesHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListUserActivitiesQuery');
  });

  it('should return mapped activities', async () => {
    repo.findByUserId.mockResolvedValue([buildActivity('a1'), buildActivity('a2')]);
    const query = new ListUserActivitiesQuery('user-1' as never, 50);

    const result = await handler.execute(query);

    expect(result).toHaveLength(2);
    expect(result[0]?.type).toBe('login');
  });

  it('should pass limit to repo', async () => {
    repo.findByUserId.mockResolvedValue([]);
    const query = new ListUserActivitiesQuery('user-1' as never, 25);

    await handler.execute(query);

    expect(repo.findByUserId).toHaveBeenCalledWith('user-1', 25);
  });
});
