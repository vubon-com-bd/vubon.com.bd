/**
 * ListAuthTokensHandler — Unit Tests
 */
import { ListAuthTokensHandler } from './list-auth-tokens.handler';
import { ListAuthTokensQuery } from './list-auth-tokens.query';
import { AuthTokenEntity } from '../../../domain/entities/auth-token.entity';
import { TokenValueVO } from '../../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../../domain/value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../../../domain/value-objects/primitives/token-expiry.vo';

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

const mockRepo = () => ({ findActiveBySubject: jest.fn() });

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
