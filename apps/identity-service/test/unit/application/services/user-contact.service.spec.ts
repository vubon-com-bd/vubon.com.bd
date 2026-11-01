import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserContactService } from '@application/services/impl/user-contact.service.js';
import { makeUserContactRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('UserContactService', () => {
  let service: UserContactService;
  let repo: ReturnType<typeof makeUserContactRepositoryMock>;

  beforeEach(() => {
    repo = makeUserContactRepositoryMock();
    service = new UserContactService(repo as never);
  });

  it('name', () => expect(service.name).toBe('UserContactService'));
  it('listForUser() empty', async () => {
    repo.findByUserIdRaw.mockResolvedValue([]);
    expect(await service.listForUser(TEST_IDS.USER_ID)).toEqual([]);
  });
  it('remove() delegates', async () => {
    repo.delete.mockResolvedValue(undefined);
    await service.remove(TEST_IDS.CONTACT_ID);
    expect(repo.delete).toHaveBeenCalledWith(TEST_IDS.CONTACT_ID);
  });
});
