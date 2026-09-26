/**
 * MfaControllerMapper — Unit Tests
 */
import { MfaControllerMapper } from './mfa.controller.mapper';

describe('MfaControllerMapper', () => {
  let mapper: MfaControllerMapper;

  beforeEach(() => {
    mapper = new MfaControllerMapper();
  });

  it('should map enabled MFA', () => {
    const dto = mapper.toResponse({
      enabled: true,
      type: 'totp',
      enrolledAt: '2024-01-01T00:00:00.000Z',
    } as never);
    expect(dto.enabled).toBe(true);
    expect(dto.type).toBe('totp');
  });

  it('should copy backupMethods array', () => {
    const backup = ['sms', 'email'];
    const dto = mapper.toResponse({
      enabled: true,
      type: 'totp',
      backupMethods: backup,
    } as never);
    expect(dto.backupMethods).toEqual(backup);
    expect(dto.backupMethods).not.toBe(backup);
  });

  it('should handle missing backupMethods', () => {
    const dto = mapper.toResponse({
      enabled: false,
      type: 'none',
    } as never);
    expect(dto.backupMethods).toBeUndefined();
  });

  it('should preserve verifiedAt', () => {
    const dto = mapper.toResponse({
      enabled: true,
      type: 'totp',
      verifiedAt: '2024-01-01T00:00:00.000Z',
    } as never);
    expect(dto.verifiedAt).toBe('2024-01-01T00:00:00.000Z');
  });
});
