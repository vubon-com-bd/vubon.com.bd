import { ResetSettingsHandler } from '@application/commands/settings/reset-settings.handler';
import { ResetSettingsCommand } from '@application/commands/settings/reset-settings.command';
import { UserSettingsEntity } from '@domain/entities/user-settings.entity';
import { SettingKeyVO } from '@domain/value-objects/primitives/setting-key.vo';
import { SettingValueVO } from '@domain/value-objects/primitives/setting-value.vo';
import { createUserSettingsRepositoryMock } from '../../../helpers/user-repository.mock';

describe('ResetSettingsHandler', () => {
  let handler: ResetSettingsHandler;
  let settingsRepo: ReturnType<typeof createUserSettingsRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    settingsRepo = createUserSettingsRepositoryMock();
    handler = new ResetSettingsHandler(settingsRepo as never);
  });

  it('should reset settings to defaults', async () => {
    const s = UserSettingsEntity.create({ id: 'user-1', userId: 'user-1', now });
    s.set(SettingKeyVO.create('theme'), SettingValueVO.create('dark'));
    settingsRepo.findByUserId.mockResolvedValue(s);

    const result = await handler.execute(new ResetSettingsCommand('user-1'));
    expect(result.theme).toBe('system');
    expect(result.language).toBe('bn');
  });

  it('should throw when settings not found', async () => {
    settingsRepo.findByUserId.mockResolvedValue(null);
    await expect(handler.execute(new ResetSettingsCommand('missing'))).rejects.toThrow();
  });
});
