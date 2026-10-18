import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserActivityService } from '@application/services/impl/user-activity.service.js';
import { makeUserActivityRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('UserActivityService', () => {
  let service: UserActivityService;
  let repo: ReturnType<typeof makeUserActivityRepositoryMock>;

  beforeEach(() => {
    repo = makeUserActivityRepositoryMock();
    service = new UserActivityService(repo as never);
  });

  it('name', () => expect(service.name).toBe('UserActivityService'));
  it('log() returns DTO', async () => {
    const r = await service.log({ userId: TEST_IDS.USER_ID, type: 'login' });
    expect(r.type).toBe('login');
  });
  it('listForUser() empty', async () => {
    repo.findByUserId.mockResolvedValue([]);
    expect(await service.listForUser(TEST_IDS.USER_ID)).toEqual([]);
  });
});
