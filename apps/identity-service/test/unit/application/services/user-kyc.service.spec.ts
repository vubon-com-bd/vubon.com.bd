import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserKycService } from '@application/services/impl/user-kyc.service.js';
import { makeUserKycRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('UserKycService', () => {
  let service: UserKycService;
  let repo: ReturnType<typeof makeUserKycRepositoryMock>;

  beforeEach(() => {
    repo = makeUserKycRepositoryMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    service = new UserKycService(repo as never);
  });

  it('name', () => expect(service.name).toBe('UserKycService'));
  it('findForUser() null', async () => {
    repo.findByUserIdRaw.mockResolvedValue(null);
    expect(await service.findForUser(TEST_IDS.USER_ID)).toBeNull();
  });
  it('submit() returns pending', async () => {
    const result = await service.submit(TEST_IDS.USER_ID, { documents: [] } as never);
    expect(result.status).toBe('pending');
  });
});
