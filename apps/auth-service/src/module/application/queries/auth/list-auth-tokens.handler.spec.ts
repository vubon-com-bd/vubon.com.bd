/**
 * ListAuthTokensHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { ListAuthTokensHandler } from './list-auth-tokens.handler.js';
import { ListAuthTokensQuery } from './list-auth-tokens.query.js';
import { AuthTokenEntity } from '../../../domain/entities/auth-token.entity.js';
import { TokenValueVO } from '../../../domain/value-objects/primitives/token-value.vo.js';
import { TokenTypeVO } from '../../../domain/value-objects/primitives/token-type.vo.js';
import { TokenExpiryVO } from '../../../domain/value-objects/primitives/token-expiry.vo.js';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildToken = () =>
  AuthTokenEntity.create({
    id: 'tok-1',
    subjectId: 'user-1',
    value: TokenValueVO.of('a'.repeat(64)),
    type: TokenTypeVO.of('access'),
    expiry: TokenExpiryVO.fromEpoch(NOW_MS + 900_000),
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findActiveBySubject: jest.fn() as jest.Mock });

describe('ListAuthTokensHandler', () => {
  let handler: ListAuthTokensHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new ListAuthTokensHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListAuthTokensQuery');
  });

  it('should return mapped tokens', async () => {
    repo.findActiveBySubject.mockResolvedValue([buildToken()]);
    const query = new ListAuthTokensQuery('user-1');

    const result = await handler.execute(query);

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('tok-1');
    expect(result[0]?.subjectId).toBe('user-1');
  });

  it('should use default "access" type', async () => {
    repo.findActiveBySubject.mockResolvedValue([]);
    const query = new ListAuthTokensQuery('user-1');

    await handler.execute(query);

    expect(repo.findActiveBySubject).toHaveBeenCalledWith('user-1', 'access', expect.any(Number));
  });
});
