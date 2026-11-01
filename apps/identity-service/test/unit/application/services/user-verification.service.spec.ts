import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserVerificationService } from '@application/services/impl/user-verification.service.js';
import { makeUserVerificationRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('UserVerificationService', () => {
  let service: UserVerificationService;
  let repo: ReturnType<typeof makeUserVerificationRepositoryMock>;

  beforeEach(() => {
    repo = makeUserVerificationRepositoryMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    service = new UserVerificationService(repo as never);
  });

  it('name', () => expect(service.name).toBe('UserVerificationService'));
  it('findForUser() null', async () => {
    repo.findByUserIdRaw.mockResolvedValue(null);
    expect(await service.findForUser(TEST_IDS.USER_ID)).toBeNull();
  });
  it('verifyEmail() no-op when not found', async () => {
    repo.findByUserIdRaw.mockResolvedValue(null);
    await expect(service.verifyEmail(TEST_IDS.USER_ID)).resolves.not.toThrow();
  });
});
