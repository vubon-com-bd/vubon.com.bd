import { UpdateSettingsHandler } from '@application/commands/settings/update-settings.handler';
import { UpdateSettingsCommand } from '@application/commands/settings/update-settings.command';
import { UserSettingsEntity } from '@domain/entities/user-settings.entity';
import { SettingKeyVO } from '@domain/value-objects/primitives/setting-key.vo';
import { SettingValueVO } from '@domain/value-objects/primitives/setting-value.vo';
import { createUserSettingsRepositoryMock } from '../../../helpers/user-repository.mock';

describe('UpdateSettingsHandler', () => {
  let handler: UpdateSettingsHandler;
  let settingsRepo: ReturnType<typeof createUserSettingsRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    settingsRepo = createUserSettingsRepositoryMock();
    handler = new UpdateSettingsHandler(settingsRepo as never);
  });

  it('should update theme to dark', async () => {
    const s = UserSettingsEntity.create({ id: 'user-1', userId: 'user-1', now });
    settingsRepo.findByUserId.mockResolvedValue(s);

    const result = await handler.execute(
      new UpdateSettingsCommand({ userId: 'user-1', theme: 'dark' })
    );
    expect(result.theme).toBe('dark');
    expect(settingsRepo.save).toHaveBeenCalled();
  });

  it('should set twoFactor flag', async () => {
    const s = UserSettingsEntity.create({ id: 'user-1', userId: 'user-1', now });
    settingsRepo.findByUserId.mockResolvedValue(s);

    const result = await handler.execute(
      new UpdateSettingsCommand({ userId: 'user-1', twoFactor: true })
    );
    expect(result.twoFactor).toBe(true);
  });

  it('should throw when settings not found', async () => {
    settingsRepo.findByUserId.mockResolvedValue(null);
    await expect(
      handler.execute(new UpdateSettingsCommand({ userId: 'missing', theme: 'dark' }))
    ).rejects.toThrow();
  });
});
