/**
 * GetUserPreferencesHandler — Unit Tests
 */
import { GetUserPreferencesHandler } from './get-user-preferences.handler';
import { GetUserPreferencesQuery } from './get-user-preferences.query';
import { UserPreferencesEntity } from '../../../domain/entities/user-preferences.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildPrefs = () =>
  UserPreferencesEntity.create({
    id: 'user-1' as never,
    userId: 'user-1' as never,
    theme: 'dark',
    currency: 'BDT',
    dateFormat: 'DD/MM/YYYY',
    reduceMotion: false,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findByUserId: jest.fn() });

describe('GetUserPreferencesHandler', () => {
  let handler: GetUserPreferencesHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetUserPreferencesHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetUserPreferencesQuery');
  });

  it('should return null when not found', async () => {
    repo.findByUserId.mockResolvedValue(null);
    const query = new GetUserPreferencesQuery('user-1' as never);

    const result = await handler.execute(query);
    expect(result).toBeNull();
  });

  it('should return mapped preferences DTO', async () => {
    repo.findByUserId.mockResolvedValue(buildPrefs());
    const query = new GetUserPreferencesQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result?.userId).toBe('user-1');
    expect(result?.theme).toBe('dark');
    expect(result?.currency).toBe('BDT');
  });
});
