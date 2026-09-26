/**
 * GetAuthAccountLockStatusHandler — Unit Tests
 */
import { GetAuthAccountLockStatusHandler } from './get-auth-account-lock-status.handler';
import { GetAuthAccountLockStatusQuery } from './get-auth-account-lock-status.query';
import { AuthAccountLockEntity } from '../../../domain/entities/auth-account-lock.entity';
import { AccountLockReasonVO } from '../../../domain/value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../../../domain/value-objects/primitives/account-lock-duration.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildLock = () =>
  AuthAccountLockEntity.create({
    id: 'lock-1',
    userId: 'user-1' as never,
    reason: AccountLockReasonVO.of('too_many_attempts'),
    lockedAt: NOW_MS,
    duration: AccountLockDurationVO.ofHours(1),
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findActiveByUser: jest.fn() });

describe('GetAuthAccountLockStatusHandler', () => {
  let handler: GetAuthAccountLockStatusHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetAuthAccountLockStatusHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetAuthAccountLockStatusQuery');
  });

  it('should return null when no active lock', async () => {
    repo.findActiveByUser.mockResolvedValue(null);
    const query = new GetAuthAccountLockStatusQuery('user-1' as never);

    const result = await handler.execute(query);
    expect(result).toBeNull();
  });

  it('should return lock status when active', async () => {
    repo.findActiveByUser.mockResolvedValue(buildLock());
    const query = new GetAuthAccountLockStatusQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result).not.toBeNull();
    expect(result?.id).toBe('lock-1');
    expect(result?.reason).toBe('too_many_attempts');
  });
});
