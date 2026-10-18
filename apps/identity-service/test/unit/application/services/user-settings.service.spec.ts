import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserSettingsService } from '@application/services/impl/user-settings.service.js';
import { makeUserSettingsRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('UserSettingsService', () => {
  let service: UserSettingsService;
  let repo: ReturnType<typeof makeUserSettingsRepositoryMock>;

  beforeEach(() => {
    repo = makeUserSettingsRepositoryMock();
    service = new UserSettingsService(repo as never);
  });

  it('name', () => expect(service.name).toBe('UserSettingsService'));

  it('findForUser() should return null', async () => {
    repo.findByUserIdRaw.mockResolvedValue(null);
    expect(await service.findForUser(TEST_IDS.USER_ID)).toBeNull();
  });

  it('update() should return merged', async () => {
    repo.findByUserIdRaw.mockResolvedValue(null);
    const result = await service.update(TEST_IDS.USER_ID, { theme: 'dark' } as never);
    expect(result.userId).toBe(TEST_IDS.USER_ID);
  });
});
