import { GetPreferencesHandler } from '@application/queries/preferences/get-preferences.handler';
import { GetPreferencesQuery } from '@application/queries/preferences/get-preferences.query';
import { UserPreferencesEntity } from '@domain/entities/user-preferences.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { PreferenceKeyVO } from '@domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '@domain/value-objects/primitives/preference-value.vo';
import { createUserPreferencesRepositoryMock } from '../../../helpers/user-repository.mock';

describe('GetPreferencesHandler', () => {
  let handler: GetPreferencesHandler;
  let prefsRepo: ReturnType<typeof createUserPreferencesRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    prefsRepo = createUserPreferencesRepositoryMock();
    handler = new GetPreferencesHandler(prefsRepo);
  });

  it('should return preferences with defaults', async () => {
    const prefs = UserPreferencesEntity.create({
      id: 'user-1',
      userId: 'user-1',
      now,
    });
    prefsRepo.findByUserId.mockResolvedValue(prefs);

    const result = await handler.execute(new GetPreferencesQuery('user-1'));
    expect(result.userId).toBe('user-1');
    expect(result.newsletter).toBe(false);
  });

  it('should reflect a set preference', async () => {
    const prefs = UserPreferencesEntity.create({
      id: 'user-1',
      userId: 'user-1',
      now,
    });
    prefs.set(PreferenceKeyVO.create('newsletter'), PreferenceValueVO.fromBoolean(true));
    prefsRepo.findByUserId.mockResolvedValue(prefs);

    const result = await handler.execute(new GetPreferencesQuery('user-1'));
    expect(result.newsletter).toBe(true);
  });

  it('should throw when not found', async () => {
    prefsRepo.findByUserId.mockResolvedValue(null);
    await expect(handler.execute(new GetPreferencesQuery('missing'))).rejects.toThrow();
  });
});
