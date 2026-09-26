/**
 * GetAuthMfaSettingsHandler — Unit Tests
 */
import { GetAuthMfaSettingsHandler } from './get-auth-mfa-settings.handler';
import { GetAuthMfaSettingsQuery } from './get-auth-mfa-settings.query';
import { AuthMfaEntity } from '../../../domain/entities/auth-mfa.entity';
import { MfaTypeVO } from '../../../domain/value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../../../domain/value-objects/primitives/mfa-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildMfa = (status: 'disabled' | 'enabled') =>
  AuthMfaEntity.create({
    id: 'mfa-1',
    userId: 'user-1' as never,
    type: MfaTypeVO.of('totp'),
    status: MfaStatusVO.of(status),
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findByUserId: jest.fn() });

describe('GetAuthMfaSettingsHandler', () => {
  let handler: GetAuthMfaSettingsHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetAuthMfaSettingsHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetAuthMfaSettingsQuery');
  });

  it('should return disabled when no MFA configured', async () => {
    repo.findByUserId.mockResolvedValue(null);
    const query = new GetAuthMfaSettingsQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result.enabled).toBe(false);
    expect(result.type).toBe('none');
  });

  it('should return status when MFA exists', async () => {
    repo.findByUserId.mockResolvedValue(buildMfa('enabled'));
    const query = new GetAuthMfaSettingsQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result.enabled).toBe(true);
    expect(result.type).toBe('totp');
  });
});
