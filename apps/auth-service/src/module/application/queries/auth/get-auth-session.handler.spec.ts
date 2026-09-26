/**
 * GetAuthSessionHandler — Unit Tests
 * @module auth-service/application/queries/auth
 */
import { GetAuthSessionHandler } from './get-auth-session.handler';
import { GetAuthSessionQuery } from './get-auth-session.query';
import { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';
import { SessionTokenVO } from '../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../domain/value-objects/primitives/session-expiry.vo';
import { SessionNotFoundAppError } from '../../errors/session.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildSession = () =>
  AuthSessionEntity.create({
    id: 'sess-1',
    userId: 'user-1' as never,
    token: SessionTokenVO.of('a'.repeat(32)),
    expiry: SessionExpiryVO.fromEpoch(NOW_MS + 3_600_000),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0',
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findById: jest.fn() });

describe('GetAuthSessionHandler', () => {
  let handler: GetAuthSessionHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetAuthSessionHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetAuthSessionQuery');
  });

  it('should throw when session not found', async () => {
    repo.findById.mockResolvedValue(null);
    const query = new GetAuthSessionQuery('missing');

    await expect(handler.execute(query)).rejects.toThrow(SessionNotFoundAppError);
  });

  it('should return mapped DTO on success', async () => {
    repo.findById.mockResolvedValue(buildSession());
    const query = new GetAuthSessionQuery('sess-1');

    const result = await handler.execute(query);

    expect(result.sessionId).toBe('sess-1');
    expect(result.userId).toBe('user-1');
    expect(result.ipAddress).toBe('192.168.1.1');
    expect(typeof result.isActive).toBe('boolean');
  });
});
