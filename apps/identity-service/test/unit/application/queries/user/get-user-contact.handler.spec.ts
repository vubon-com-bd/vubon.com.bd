import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetUserContactHandler } from '@application/queries/user/get-user-contact.handler.js';
import { GetUserContactQuery } from '@application/queries/user/get-user-contact.query.js';
import { makeUserContactRepositoryMock, TEST_IDS } from '@fixtures/index.js';
import { ContactNotFoundError } from '@domain/errors/profile.errors.js';

describe('GetUserContactHandler', () => {
  let handler: GetUserContactHandler;
  let repo: ReturnType<typeof makeUserContactRepositoryMock>;

  beforeEach(() => {
    repo = makeUserContactRepositoryMock();
    handler = new GetUserContactHandler(repo as never);
  });

  it('queryType = user.get-contact', () => {
    expect(handler.queryType).toBe('user.get-contact');
  });

  it('should throw when not found', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(handler.execute(new GetUserContactQuery(TEST_IDS.CONTACT_ID)))
      .rejects.toThrow(ContactNotFoundError);
  });
});
