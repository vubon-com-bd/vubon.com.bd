/**
 * ListAuthSessionsHandler — Unit Tests
 */
import { ListAuthSessionsHandler } from './list-auth-sessions.handler';
import { ListAuthSessionsQuery } from './list-auth-sessions.query';
import { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';
import { SessionTokenVO } from '../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../domain/value-objects/primitives/session-expiry.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildSession = (id: string) =>
  AuthSessionEntity.create({
    id,
    userId: 'user-1' as never,
    token: SessionTokenVO.of('a'.repeat(32)),
    expiry: SessionExpiryVO.fromEpoch(NOW_MS + 3_600_000),
    ipAddress: '1.1.1.1',
    userAgent: 'agent',
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findActiveByUser: jest.fn() });

describe('ListAuthSessionsHandler', () => {
  let handler: ListAuthSessionsHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new ListAuthSessionsHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListAuthSessionsQuery');
  });

  it('should return list of session DTOs', async () => {
    repo.findActiveByUser.mockResolvedValue([buildSession('s1'), buildSession('s2')]);
    const query = new ListAuthSessionsQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result).toHaveLength(2);
    expect(result[0]?.sessionId).toBe('s1');
  });

  it('should return empty array when no sessions', async () => {
    repo.findActiveByUser.mockResolvedValue([]);
    const query = new ListAuthSessionsQuery('user-1' as never);

    const result = await handler.execute(query);
    expect(result).toEqual([]);
  });
});
