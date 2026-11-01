import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserProfileService } from '@application/services/impl/user-profile.service.js';
import { makeUserProfileRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let repo: ReturnType<typeof makeUserProfileRepositoryMock>;

  beforeEach(() => {
    repo = makeUserProfileRepositoryMock();
    service = new UserProfileService(repo as never);
  });

  it('name', () => expect(service.name).toBe('UserProfileService'));

  it('findForUser() should return null when not found', async () => {
    repo.findByUserIdRaw.mockResolvedValue(null);
    expect(await service.findForUser(TEST_IDS.USER_ID)).toBeNull();
  });

  it('upsert() should return merged DTO', async () => {
    repo.findByUserIdRaw.mockResolvedValue(null);
    const result = await service.upsert(TEST_IDS.USER_ID, { bio: 'hello' } as never);
    expect(result.userId).toBe(TEST_IDS.USER_ID);
  });
});
