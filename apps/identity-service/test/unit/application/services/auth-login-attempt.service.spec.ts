import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthLoginAttemptService } from '@application/services/impl/auth-login-attempt.service.js';
import { makeLoginAttemptRepositoryMock, TEST_EMAIL } from '@fixtures/index.js';

describe('AuthLoginAttemptService', () => {
  let service: AuthLoginAttemptService;
  let repo: ReturnType<typeof makeLoginAttemptRepositoryMock>;

  beforeEach(() => {
    repo = makeLoginAttemptRepositoryMock();
    service = new AuthLoginAttemptService(repo as never);
  });

  it('name', () => expect(service.name).toBe('AuthLoginAttemptService'));

  it('record() should return attempt DTO', async () => {
    const result = await service.record({
      identifier: TEST_EMAIL, status: 'success',
    });
    expect(result.identifier).toBe(TEST_EMAIL);
    expect(result.status).toBe('success');
  });

  it('listRecent() should return empty', async () => {
    repo.findRecent.mockResolvedValue([]);
    expect(await service.listRecent(TEST_EMAIL, 300)).toEqual([]);
  });

  it('countRecent() should delegate', async () => {
    repo.countRecent.mockResolvedValue(3);
    expect(await service.countRecent(TEST_EMAIL, 300)).toBe(3);
  });
});
