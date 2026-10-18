import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListAuthTokensHandler } from '@application/queries/auth/list-auth-tokens.handler.js';
import { ListAuthTokensQuery } from '@application/queries/auth/list-auth-tokens.query.js';
import { makeTokenRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('ListAuthTokensHandler', () => {
  let handler: ListAuthTokensHandler;
  let repo: ReturnType<typeof makeTokenRepositoryMock>;

  beforeEach(() => {
    repo = makeTokenRepositoryMock();
    handler = new ListAuthTokensHandler(repo as never);
  });

  it('queryType = auth.list-tokens', () => {
    expect(handler.queryType).toBe('auth.list-tokens');
  });

  it('should return empty when no tokens', async () => {
    repo.findByUserId.mockResolvedValue([]);
    const result = await handler.execute(new ListAuthTokensQuery(TEST_IDS.USER_ID));
    expect(result).toEqual([]);
  });
});
