/**
 * GetUserSettingsHandler — Unit Tests
 */
import { GetUserSettingsHandler } from './get-user-settings.handler';
import { GetUserSettingsQuery } from './get-user-settings.query';
import { UserSettingsEntity } from '../../../domain/entities/user-settings.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildSettings = () =>
  UserSettingsEntity.create({
    id: 'user-1' as never,
    userId: 'user-1' as never,
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    language: 'bn',
    timezone: 'Asia/Dhaka',
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findByUserId: jest.fn() });

describe('GetUserSettingsHandler', () => {
  let handler: GetUserSettingsHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetUserSettingsHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetUserSettingsQuery');
  });

  it('should return null when not found', async () => {
    repo.findByUserId.mockResolvedValue(null);
    const query = new GetUserSettingsQuery('user-1' as never);

    const result = await handler.execute(query);
    expect(result).toBeNull();
  });

  it('should return mapped settings DTO', async () => {
    repo.findByUserId.mockResolvedValue(buildSettings());
    const query = new GetUserSettingsQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result?.userId).toBe('user-1');
    expect(result?.emailNotifications).toBe(true);
    expect(result?.pushNotifications).toBe(true);
  });
});
