import { ResetPreferencesHandler } from '@application/commands/preferences/reset-preferences.handler';
import { ResetPreferencesCommand } from '@application/commands/preferences/reset-preferences.command';
import { UserPreferencesEntity } from '@domain/entities/user-preferences.entity';
import { PreferenceKeyVO } from '@domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '@domain/value-objects/primitives/preference-value.vo';
import { createUserPreferencesRepositoryMock } from '../../../helpers/user-repository.mock';

describe('ResetPreferencesHandler', () => {
  let handler: ResetPreferencesHandler;
  let prefsRepo: ReturnType<typeof createUserPreferencesRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    prefsRepo = createUserPreferencesRepositoryMock();
    handler = new ResetPreferencesHandler(prefsRepo as never);
  });

  it('should reset all preferences to defaults', async () => {
    const prefs = UserPreferencesEntity.create({
      id: 'user-1',
      userId: 'user-1',
      now,
    });
    prefs.set(PreferenceKeyVO.create('newsletter'), PreferenceValueVO.fromBoolean(true));
    prefsRepo.findByUserId.mockResolvedValue(prefs);

    const result = await handler.execute(new ResetPreferencesCommand('user-1'));
    expect(result.userId).toBe('user-1');
    expect(result.newsletter).toBe(false);
  });

  it('should throw when prefs not found', async () => {
    prefsRepo.findByUserId.mockResolvedValue(null);
    await expect(handler.execute(new ResetPreferencesCommand('missing'))).rejects.toThrow();
  });
});
