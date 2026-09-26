/**
 * GetUserProfileHandler — Unit Tests
 */
import { GetUserProfileHandler } from './get-user-profile.handler';
import { GetUserProfileQuery } from './get-user-profile.query';
import { UserProfileEntity } from '../../../domain/entities/user-profile.entity';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildProfile = () =>
  UserProfileEntity.create({
    id: 'user-1' as never,
    userId: 'user-1' as never,
    displayName: UserNameVO.of('John Doe'),
    locale: 'bn-BD',
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findByUserId: jest.fn() });

describe('GetUserProfileHandler', () => {
  let handler: GetUserProfileHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetUserProfileHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetUserProfileQuery');
  });

  it('should return null when not found', async () => {
    repo.findByUserId.mockResolvedValue(null);
    const query = new GetUserProfileQuery('user-1' as never);

    const result = await handler.execute(query);
    expect(result).toBeNull();
  });

  it('should return mapped profile', async () => {
    repo.findByUserId.mockResolvedValue(buildProfile());
    const query = new GetUserProfileQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result?.userId).toBe('user-1');
    expect(result?.displayName).toBe('John Doe');
    expect(result?.locale).toBe('bn-BD');
  });
});
