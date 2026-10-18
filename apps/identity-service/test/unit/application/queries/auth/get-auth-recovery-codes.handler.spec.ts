import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetAuthRecoveryCodesHandler } from '@application/queries/auth/get-auth-recovery-codes.handler.js';
import { GetAuthRecoveryCodesQuery } from '@application/queries/auth/get-auth-recovery-codes.query.js';
import { makeRecoveryCodeRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('GetAuthRecoveryCodesHandler', () => {
  let handler: GetAuthRecoveryCodesHandler;
  let repo: ReturnType<typeof makeRecoveryCodeRepositoryMock>;

  beforeEach(() => {
    repo = makeRecoveryCodeRepositoryMock();
    handler = new GetAuthRecoveryCodesHandler(repo as never);
  });

  it('queryType = auth.get-recovery-codes', () => {
    expect(handler.queryType).toBe('auth.get-recovery-codes');
  });

  it('should count used + remaining', async () => {
    const codes = [
      { isUsed: () => false }, { isUsed: () => false }, { isUsed: () => true },
    ];
    repo.findByAuthId.mockResolvedValue(codes as never);
    const result = await handler.execute(new GetAuthRecoveryCodesQuery(TEST_IDS.AUTH_ID));
    expect(result.total).toBe(3);
    expect(result.remaining).toBe(2);
    expect(result.used).toBe(1);
  });

  it('should return zeros when no codes', async () => {
    repo.findByAuthId.mockResolvedValue([]);
    const result = await handler.execute(new GetAuthRecoveryCodesQuery(TEST_IDS.AUTH_ID));
    expect(result).toEqual({ total: 0, remaining: 0, used: 0 });
  });
});
