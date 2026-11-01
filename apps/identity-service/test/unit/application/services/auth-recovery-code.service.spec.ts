import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthRecoveryCodeService } from '@application/services/impl/auth-recovery-code.service.js';
import { makeRecoveryCodeRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('AuthRecoveryCodeService', () => {
  let service: AuthRecoveryCodeService;
  let repo: ReturnType<typeof makeRecoveryCodeRepositoryMock>;

  beforeEach(() => {
    repo = makeRecoveryCodeRepositoryMock();
    service = new AuthRecoveryCodeService(repo as never);
  });

  it('name', () => expect(service.name).toBe('AuthRecoveryCodeService'));

  it('generate() should return codes', async () => {
    const result = await service.generate(TEST_IDS.AUTH_ID);
    expect(result.success).toBe(true);
    expect(result.codes.length).toBeGreaterThan(0);
  });

  it('generate(count) should respect count', async () => {
    const result = await service.generate(TEST_IDS.AUTH_ID, 5);
    expect(result.codes.length).toBe(5);
  });

  it('countRemaining() should delegate', async () => {
    repo.countActiveByAuthId.mockResolvedValue(7);
    const count = await service.countRemaining(TEST_IDS.AUTH_ID);
    expect(count).toBe(7);
  });

  it('revokeAll() should delegate', async () => {
    repo.revokeAllByAuthId.mockResolvedValue(5);
    expect(await service.revokeAll(TEST_IDS.AUTH_ID)).toBe(5);
  });
});
