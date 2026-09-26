/**
 * ListAuthLoginAttemptsHandler — Unit Tests
 */
import { ListAuthLoginAttemptsHandler } from './list-auth-login-attempts.handler';
import { ListAuthLoginAttemptsQuery } from './list-auth-login-attempts.query';
import { AuthLoginAttemptEntity } from '../../../domain/entities/auth-login-attempt.entity';
import { LoginAttemptIpVO } from '../../../domain/value-objects/primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../../../domain/value-objects/primitives/login-attempt-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildAttempt = () =>
  AuthLoginAttemptEntity.create({
    id: 'att-1',
    userId: 'user-1' as never,
    ip: LoginAttemptIpVO.of('192.168.1.1'),
    userAgent: 'agent',
    status: LoginAttemptStatusVO.success(),
    attemptedAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findRecentByUser: jest.fn() });

describe('ListAuthLoginAttemptsHandler', () => {
  let handler: ListAuthLoginAttemptsHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new ListAuthLoginAttemptsHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListAuthLoginAttemptsQuery');
  });

  it('should return masked attempt DTOs', async () => {
    repo.findRecentByUser.mockResolvedValue([buildAttempt()]);
    const query = new ListAuthLoginAttemptsQuery('user-1' as never, 20);

    const result = await handler.execute(query);

    expect(result).toHaveLength(1);
    expect(result[0]?.ipMasked).toContain('***');
    expect(result[0]?.ipMasked).not.toBe('192.168.1.1');
  });

  it('should return empty when no attempts', async () => {
    repo.findRecentByUser.mockResolvedValue([]);
    const query = new ListAuthLoginAttemptsQuery('user-1' as never);

    const result = await handler.execute(query);
    expect(result).toEqual([]);
  });
});
