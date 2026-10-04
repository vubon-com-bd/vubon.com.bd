/**
 * GetSettingsHandler Unit Test
 */
import { GetSettingsHandler } from '@application/queries/settings/get-settings.handler';
import { GetSettingsQuery } from '@application/queries/settings/get-settings.query';
import { UserSettingsEntity } from '@domain/entities/user-settings.entity';
import { SettingKeyVO } from '@domain/value-objects/primitives/setting-key.vo';
import { SettingValueVO } from '@domain/value-objects/primitives/setting-value.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { createUserSettingsRepositoryMock } from '../../../helpers/user-repository.mock';

describe('GetSettingsHandler', () => {
  let handler: GetSettingsHandler;
  let settingsRepo: ReturnType<typeof createUserSettingsRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    settingsRepo = createUserSettingsRepositoryMock();
    handler = new GetSettingsHandler(settingsRepo);
  });

  it('should return settings with defaults', async () => {
    const s = UserSettingsEntity.create({ id: 'user-1', userId: 'user-1', now });
    settingsRepo.findByUserId.mockResolvedValue(s);

    const result = await handler.execute(new GetSettingsQuery('user-1'));
    expect(result.userId).toBe('user-1');
    expect(result.theme).toBe('system');
    expect(result.language).toBe('bn');
  });

  it('should return overridden value when set', async () => {
    const s = UserSettingsEntity.create({ id: 'user-1', userId: 'user-1', now });
    s.set(SettingKeyVO.create('theme'), SettingValueVO.create('dark'));
    settingsRepo.findByUserId.mockResolvedValue(s);

    const result = await handler.execute(new GetSettingsQuery('user-1'));
    expect(result.theme).toBe('dark');
  });

  it('should throw when settings not found', async () => {
    settingsRepo.findByUserId.mockResolvedValue(null);
    await expect(handler.execute(new GetSettingsQuery('missing'))).rejects.toThrow();
  });
});
