import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserPreferencesService } from '@application/services/impl/user-preferences.service.js';
import { makeUserPreferencesRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('UserPreferencesService', () => {
  let service: UserPreferencesService;
  let repo: ReturnType<typeof makeUserPreferencesRepositoryMock>;

  beforeEach(() => {
    repo = makeUserPreferencesRepositoryMock();
    service = new UserPreferencesService(repo as never);
  });

  it('name', () => expect(service.name).toBe('UserPreferencesService'));
  it('findForUser() null', async () => {
    repo.findByUserIdRaw.mockResolvedValue(null);
    expect(await service.findForUser(TEST_IDS.USER_ID)).toBeNull();
  });
  it('update() merged', async () => {
    repo.findByUserIdRaw.mockResolvedValue(null);
    const r = await service.update(TEST_IDS.USER_ID, { promotions: true } as never);
    expect(r.userId).toBe(TEST_IDS.USER_ID);
  });
});
