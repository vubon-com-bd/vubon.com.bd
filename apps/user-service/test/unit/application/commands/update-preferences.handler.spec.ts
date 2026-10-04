import { UpdatePreferencesHandler } from '@application/commands/preferences/update-preferences.handler';
import { UpdatePreferencesCommand } from '@application/commands/preferences/update-preferences.command';
import { UserPreferencesEntity } from '@domain/entities/user-preferences.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { createUserPreferencesRepositoryMock } from '../../../helpers/user-repository.mock';

describe('UpdatePreferencesHandler', () => {
  let handler: UpdatePreferencesHandler;
  let prefsRepo: ReturnType<typeof createUserPreferencesRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    prefsRepo = createUserPreferencesRepositoryMock();
    handler = new UpdatePreferencesHandler(prefsRepo as never);
  });

  it('should update newsletter preference', async () => {
    const prefs = UserPreferencesEntity.create({
      id: 'user-1',
      userId: 'user-1',
      now,
    });
    prefsRepo.findByUserId.mockResolvedValue(prefs);

    const result = await handler.execute(
      new UpdatePreferencesCommand({ userId: 'user-1', newsletter: true })
    );
    expect(result.userId).toBe('user-1');
    expect(result.newsletter).toBe(true);
    expect(prefsRepo.save).toHaveBeenCalled();
  });

  it('should throw when prefs not found', async () => {
    prefsRepo.findByUserId.mockResolvedValue(null);
    await expect(
      handler.execute(new UpdatePreferencesCommand({ userId: 'missing', newsletter: true }))
    ).rejects.toThrow();
  });
});
