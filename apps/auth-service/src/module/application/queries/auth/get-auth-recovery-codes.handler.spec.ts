/**
 * GetAuthRecoveryCodesHandler — Unit Tests
 */
import { GetAuthRecoveryCodesHandler } from './get-auth-recovery-codes.handler';
import { GetAuthRecoveryCodesQuery } from './get-auth-recovery-codes.query';
import { AuthRecoveryCodeEntity } from '../../../domain/entities/auth-recovery-code.entity';
import { RecoveryCodeVO } from '../../../domain/value-objects/primitives/recovery-code.vo';
import { RecoveryCodeStatusVO } from '../../../domain/value-objects/primitives/recovery-code-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildCode = (id: string) =>
  AuthRecoveryCodeEntity.create({
    id,
    userId: 'user-1' as never,
    code: RecoveryCodeVO.of('ABCD-1234'),
    status: RecoveryCodeStatusVO.active(),
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findByUserId: jest.fn() });

describe('GetAuthRecoveryCodesHandler', () => {
  let handler: GetAuthRecoveryCodesHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetAuthRecoveryCodesHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetAuthRecoveryCodesQuery');
  });

  it('should return masked codes', async () => {
    repo.findByUserId.mockResolvedValue([buildCode('rc-1')]);
    const query = new GetAuthRecoveryCodesQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result).toHaveLength(1);
    expect(result[0]?.masked).toBe('****-1234');
    expect(result[0]?.masked).not.toBe('ABCD-1234');
  });

  it('should return empty when no codes', async () => {
    repo.findByUserId.mockResolvedValue([]);
    const query = new GetAuthRecoveryCodesQuery('user-1' as never);

    const result = await handler.execute(query);
    expect(result).toEqual([]);
  });
});
